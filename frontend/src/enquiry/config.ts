const configuredPrivacyNoticeUrl =
  import.meta.env.VITE_ENQUIRY_PRIVACY_NOTICE_URL?.trim();

function readPrivacyNoticeUrl(value: string | undefined) {
  if (!value) {
    return undefined;
  }

  try {
    const url = new URL(value);
    const isLocalDevelopmentUrl =
      import.meta.env.DEV &&
      url.protocol === 'http:' &&
      ['localhost', '127.0.0.1'].includes(url.hostname);

    if (
      (url.protocol !== 'https:' && !isLocalDevelopmentUrl) ||
      url.username ||
      url.password
    ) {
      return undefined;
    }

    return url.href;
  } catch {
    return undefined;
  }
}

export const enquiryPrivacyNoticeUrl = readPrivacyNoticeUrl(
  configuredPrivacyNoticeUrl,
);

export const enquiryCollectionEnabled =
  import.meta.env.VITE_ENQUIRY_COLLECTION_ENABLED === 'true' &&
  enquiryPrivacyNoticeUrl !== undefined;
