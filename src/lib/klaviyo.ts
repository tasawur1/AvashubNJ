const KLAVIYO_LIST_ID = 'QYbPhK';

function klaviyoHeaders(apiKey: string) {
  return {
    'Authorization': `Klaviyo-API-Key ${apiKey}`,
    'revision': '2024-02-15',
    'Content-Type': 'application/json',
  };
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

    const res = await fetch('https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/', {
      method: 'POST',
      headers: klaviyoHeaders(apiKey),
      body: JSON.stringify({
        data: {
          type: 'profile-subscription-bulk-create-job',
          attributes: {
            profiles: {
              data: [{
                type: 'profile',
                attributes: {
                  email,
                  first_name: firstName || '',
                  last_name: lastName || '',
                  subscriptions: {
                    email: { marketing: { consent: 'SUBSCRIBED' } },
                  },
                },
              }],
            },
            historical_import: false,
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
  } catch (err) {
    console.error('[KLAVIYO] Failed to add contact:', email, err);
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
