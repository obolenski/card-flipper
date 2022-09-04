import { GoogleOAuth2 } from 'https://deno.land/x/google@0.0.6/oauth2.ts'
import { GoogleClientID, GoogleClientSecret } from '../utils/env.ts'
import * as axiod from 'https://deno.land/x/axiod@0.20.0-0/mod.ts'
import { AppUser } from '../utils/types.ts'

const scopes = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
]

const getGoogleApiClient = (redirectUrl: string) => {
  if (!GoogleClientID || !GoogleClientSecret) {
    throw new Error('Google credentials not found in env vars')
  }

  return new GoogleOAuth2({
    client_id: GoogleClientID,
    client_secret: GoogleClientSecret,
    redirect_uri: redirectUrl,
    scopes: scopes,
  })
}

export const getGoogleUrl = (redirectUrl: string) => {
  const oauth2Client = getGoogleApiClient(redirectUrl)
  return oauth2Client.buildAuthLink()
}

export const getTokensFromCode = async (code: string, redirectUrl: string) => {
  const oauth2Client = getGoogleApiClient(redirectUrl)
  try {
    return await oauth2Client.getTokens(code)
  } catch (e) {
    console.error(e)
  }
}

export const getAccessTokenFromRefreshToken = async (
  refreshToken: string,
  redirectUrl: string
) => {
  const oauth2Client = getGoogleApiClient(redirectUrl)
  try {
    const accessToken = await oauth2Client.getAccessToken(refreshToken)
    return accessToken.access_token
  } catch (e) {
    console.error(e)
  }
}

export const getUserData = async (
  accessToken: string
): Promise<AppUser | null> => {
  const config = {
    method: 'get',
    url: `https://www.googleapis.com/oauth2/v2/userinfo?fields=name,email,picture`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
  }

  const userData = await axiod
    .default(config)
    .then((res) => res.data)
    .catch((e) =>
      console.log('Error getting user data form Google: ' + JSON.stringify(e))
    )

  if (!userData) return null

  const user: AppUser = {
    name: userData.name,
    email: userData.email,
    avatarUrl: userData.picture,
    accessToken: accessToken,
  }

  return user
}

export const revokeAccessToken = async (accessToken: string) => {
  const config = {
    method: 'POST',
    url: `https://oauth2.googleapis.com/revoke?token=${accessToken}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }
  await axiod.default(config)
}
