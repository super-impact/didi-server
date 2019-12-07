import { google } from 'googleapis';

const { GOOGLE_CLIENT_ID, GOOGLE_SECRET, GOOGLE_REDIRECT } = process.env;

const googleConfig = {
  clientId: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_SECRET,
  redirect: GOOGLE_REDIRECT,
};

const defaultScope = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
];

export const googleOAuth2Client = new google.auth.OAuth2(
  googleConfig.clientId,
  googleConfig.clientSecret,
  googleConfig.redirect,
);

export function generateAuthURL() {
  return googleOAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: defaultScope,
  });
}

export async function getUserProfileFromCode(code: string) {
  const authData = await googleOAuth2Client.getToken(code);

  const { tokens } = authData;

  googleOAuth2Client.setCredentials(tokens);

  const oauth2 = google.oauth2({
    auth: googleOAuth2Client,
    version: 'v2',
  });

  return oauth2.userinfo.get();
}
