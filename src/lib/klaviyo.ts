const KLAVIYO_LIST_ID = 'QYbPhK';
const KLAVIYO_TIMEOUT_MS = 10_000;

function klaviyoHeaders(apiKey: string) {
  return {
    'Authorization': `Klaviyo-API-Key ${apiKey}`,
    'revision': '2024-02-15',
    'Content-Type': 'application/json',
  };
}

function klaviyoSignal(): AbortSignal {
  return AbortSignal.timeout(KLAVIYO_TIMEOUT_MS);
}

export async function addToKlaviyoList(
  email: string,
  firstName?: string,
  lastName?: string
): Promise<void> {
  try {
    const apiKey = process.env.KLAVIYO_PRIVATE_API_KEY;
    if (!apiKey) {
      console.error('[KLAVIYO] KLAVIYO_PRIVATE_API_KEY not configured — skipping for:', email);
      return;
    }

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
            list: { data: { type: 'list', id: KLAVIYO_LIST_ID } },
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
          const text = await profileRes.text();
          console.warn('[KLAVIYO] Failed to update profile name for:', email, profileRes.status, text);
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
  phone?: string
): Promise<void> {
  try {
    const apiKey = process.env.KLAVIYO_PRIVATE_API_KEY;
    if (!apiKey) {
      console.error('[KLAVIYO] KLAVIYO_PRIVATE_API_KEY not configured — skipping profile upsert for:', email);
      return;
    }

    const res = await fetch('https://a.klaviyo.com/api/profiles/', {
      method: 'POST',
      headers: klaviyoHeaders(apiKey),
      signal: klaviyoSignal(),
      body: JSON.stringify({
        data: {
          type: 'profile',
          attributes: {
            email,
            ...(firstName && { first_name: firstName }),
            ...(lastName && { last_name: lastName }),
            ...(phone && { phone_number: phone }),
          },
        },
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('[KLAVIYO] Profile upsert failed:', email, res.status, text);
      return;
    }

    console.log('[KLAVIYO] Profile upserted:', email);
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
