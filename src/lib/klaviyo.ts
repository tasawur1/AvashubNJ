const KLAVIYO_LIST_ID = 'QYbPhK';
const KLAVIYO_TIMEOUT_MS = 10_000;

function klaviyoHeaders(apiKey: string) {
  return {
    'Authorization': `Klaviyo-API-Key ${apiKey}`,
    'revision': '2024-10-15',
    'Content-Type': 'application/json',
  };
}

function klaviyoSignal(): AbortSignal {
  return AbortSignal.timeout(KLAVIYO_TIMEOUT_MS);
}

function normalizePhone(phone: string): string | undefined {
  if (!phone?.trim()) return undefined;
  const cleaned = phone.replace(/[^\d+]/g, '');
  if (cleaned.startsWith('+')) return cleaned.length > 7 ? cleaned : undefined;
  if (cleaned.startsWith('00')) return '+' + cleaned.slice(2);
  if (cleaned.length >= 10) return '+' + cleaned;
  return undefined;
}

export async function addToKlaviyoList(
  email: string,
  firstName?: string,
  lastName?: string,
  listId?: string
): Promise<void> {
  try {
    const apiKey = process.env.KLAVIYO_PRIVATE_API_KEY;
    if (!apiKey) {
      console.error('[KLAVIYO] KLAVIYO_PRIVATE_API_KEY not configured — skipping for:', email);
      return;
    }

    const resolvedListId = listId ?? process.env.KLAVIYO_LIST_ID ?? KLAVIYO_LIST_ID;

    // Step 1: Subscribe the profile (email + consent only — name fields not supported here)
    const res = await fetch('https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/', {
      method: 'POST',
      headers: klaviyoHeaders(apiKey),
      signal: klaviyoSignal(),
      body: JSON.stringify({
        data: {
          type: 'profile-subscription-bulk-create-job',
          attributes: {
            profiles: {
              data: [{
                type: 'profile',
                attributes: {
                  email,
                  subscriptions: {
                    email: { marketing: { consent: 'SUBSCRIBED' } },
                  },
                },
              }],
            },
          },
          relationships: {
            list: { data: { type: 'list', id: resolvedListId } },
          },
        },
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('[KLAVIYO] Failed to add contact:', email, res.status, text);
      return;
    }

    console.log('[KLAVIYO] Contact added:', email);

    // Step 2: Upsert name on the profile (non-fatal if this fails)
    if (firstName || lastName) {
      try {
        const nameAttributes: Record<string, string> = { email };
        if (firstName) nameAttributes.first_name = firstName;
        if (lastName) nameAttributes.last_name = lastName;

        const profileRes = await fetch('https://a.klaviyo.com/api/profiles/', {
          method: 'POST',
          headers: klaviyoHeaders(apiKey),
          signal: klaviyoSignal(),
          body: JSON.stringify({
            data: {
              type: 'profile',
              attributes: nameAttributes,
            },
          }),
        });

        if (!profileRes.ok) {
          const errorText = await profileRes.text();

          if (profileRes.status === 409) {
            try {
              const errorJson = JSON.parse(errorText);
              const existingId = errorJson?.errors?.[0]?.meta?.duplicate_profile_id;

              if (existingId) {
                // GET existing profile to avoid overwriting names already on file
                let profileFirstName = '';
                let profileLastName = '';
                try {
                  const getRes = await fetch(
                    `https://a.klaviyo.com/api/profiles/${existingId}/?fields[profile]=first_name,last_name`,
                    { method: 'GET', headers: klaviyoHeaders(apiKey), signal: klaviyoSignal() }
                  );
                  if (getRes.ok) {
                    const profileData = await getRes.json();
                    profileFirstName = profileData?.data?.attributes?.first_name ?? '';
                    profileLastName = profileData?.data?.attributes?.last_name ?? '';
                  }
                } catch (getErr) {
                  console.warn('[KLAVIYO] Could not GET profile before name PATCH:', getErr);
                }

                if (profileFirstName || profileLastName) {
                  console.log('[KLAVIYO] Profile name already set — skipping name PATCH:', email);
                  return;
                }

                const patchBody = JSON.stringify({
                  data: { type: 'profile', id: existingId, attributes: nameAttributes },
                });

                const patchRes = await fetch(
                  `https://a.klaviyo.com/api/profiles/${existingId}/`,
                  {
                    method: 'PATCH',
                    headers: klaviyoHeaders(apiKey),
                    signal: klaviyoSignal(),
                    body: patchBody,
                  }
                );

                if (patchRes.ok) {
                  console.log('[KLAVIYO] Profile name updated via PATCH:', email);
                } else {
                  console.error('[KLAVIYO] Profile name PATCH failed:', email, patchRes.status, await patchRes.text());
                }
                return;
              }
            } catch (parseErr) {
              console.error('[KLAVIYO] Failed to parse 409 error body:', parseErr);
            }
          }

          console.warn('[KLAVIYO] Failed to update profile name for:', email, profileRes.status, errorText);
        } else {
          console.log('[KLAVIYO] Profile name updated:', email);
        }
      } catch (nameErr) {
        console.warn('[KLAVIYO] Failed to update profile name for:', email, nameErr);
      }
    }
  } catch (err) {
    console.error('[KLAVIYO] Failed to add contact:', email, err);
  }
}

export async function upsertKlaviyoProfile(
  email: string,
  firstName?: string,
  lastName?: string,
  phone?: string,
  properties?: Record<string, string>
): Promise<void> {
  try {
    const apiKey = process.env.KLAVIYO_PRIVATE_API_KEY;
    if (!apiKey) {
      console.error('[KLAVIYO] KLAVIYO_PRIVATE_API_KEY not configured — skipping profile upsert for:', email);
      return;
    }

    const normalizedPhone = phone ? normalizePhone(phone) : undefined;

    const body = JSON.stringify({
      data: {
        type: 'profile',
        attributes: {
          email,
          ...(firstName && { first_name: firstName }),
          ...(lastName && { last_name: lastName }),
          ...(normalizedPhone && { phone_number: normalizedPhone }),
          ...(properties && { properties }),
        },
      },
    });

    console.log('[KLAVIYO] Profile upsert payload:', body);

    const res = await fetch('https://a.klaviyo.com/api/profiles/', {
      method: 'POST',
      headers: klaviyoHeaders(apiKey),
      signal: klaviyoSignal(),
      body,
    });

    console.log('[KLAVIYO] Profile upsert response:', res.status);
    if (!res.ok) {
      const errorText = await res.text();

      if (res.status === 409) {
        try {
          const errorJson = JSON.parse(errorText);
          const existingId = errorJson?.errors?.[0]?.meta?.duplicate_profile_id;

          if (existingId) {
            // GET existing profile to check if names are already set
            let profileFirstName = '';
            let profileLastName = '';
            try {
              const getRes = await fetch(
                `https://a.klaviyo.com/api/profiles/${existingId}/?fields[profile]=first_name,last_name`,
                { method: 'GET', headers: klaviyoHeaders(apiKey), signal: klaviyoSignal() }
              );
              if (getRes.ok) {
                const profileData = await getRes.json();
                profileFirstName = profileData?.data?.attributes?.first_name ?? '';
                profileLastName = profileData?.data?.attributes?.last_name ?? '';
              }
            } catch (getErr) {
              console.warn('[KLAVIYO] Could not GET profile before PATCH:', getErr);
            }

            const namesAlreadySet = !!profileFirstName || !!profileLastName;

            // If names exist, only patch custom properties; otherwise patch everything
            const patchAttributes = namesAlreadySet
              ? { ...(properties && { properties }) }
              : {
                  email,
                  ...(firstName && { first_name: firstName }),
                  ...(lastName && { last_name: lastName }),
                  ...(normalizedPhone && { phone_number: normalizedPhone }),
                  ...(properties && { properties }),
                };

            const patchBody = JSON.stringify({
              data: { type: 'profile', id: existingId, attributes: patchAttributes },
            });

            const patchRes = await fetch(
              `https://a.klaviyo.com/api/profiles/${existingId}/`,
              {
                method: 'PATCH',
                headers: klaviyoHeaders(apiKey),
                signal: klaviyoSignal(),
                body: patchBody,
              }
            );

            if (patchRes.ok) {
              console.log('[KLAVIYO] Profile updated via PATCH:', email, namesAlreadySet ? '(properties only — names preserved)' : '(full update)');
            } else {
              console.error('[KLAVIYO] Profile PATCH failed:', email, patchRes.status, await patchRes.text());
            }
            return;
          }
        } catch (parseErr) {
          console.error('[KLAVIYO] Failed to parse 409 error body:', parseErr);
        }
      }

      console.error('[KLAVIYO] Profile upsert error body:', errorText);
      return;
    }
  } catch (err) {
    console.error('[KLAVIYO] Profile upsert failed:', email, err);
  }
}

export async function trackKlaviyoEvent(
  email: string,
  eventName: string,
  properties: Record<string, string>
): Promise<void> {
  try {
    const apiKey = process.env.KLAVIYO_PRIVATE_API_KEY;
    if (!apiKey) {
      console.error('[KLAVIYO] KLAVIYO_PRIVATE_API_KEY not configured — skipping event for:', email);
      return;
    }

    const res = await fetch('https://a.klaviyo.com/api/events/', {
      method: 'POST',
      headers: klaviyoHeaders(apiKey),
      signal: klaviyoSignal(),
      body: JSON.stringify({
        data: {
          type: 'event',
          attributes: {
            metric: { data: { type: 'metric', attributes: { name: eventName } } },
            profile: { data: { type: 'profile', attributes: { email } } },
            properties,
          },
        },
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('[KLAVIYO] Intake event failed:', email, res.status, text);
      return;
    }

    console.log('[KLAVIYO] Intake event tracked:', email);
  } catch (err) {
    console.error('[KLAVIYO] Intake event failed:', email, err);
  }
}
