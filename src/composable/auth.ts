import store from '@/store'

const twitchAuthUrl = 'https://id.twitch.tv/oauth2/authorize'

const redirectUri = process.env.VUE_APP_REDIRECT_URI

const client_id = process.env.VUE_APP_CLIENT_ID


const OAuthLink = `${twitchAuthUrl}?client_id=${client_id}&redirect_uri=${redirectUri}&scope=bits:read moderation:read&force_verify=true&`

function getOAuthLink(type: string) {

  return `${OAuthLink}response_type=${type}`
}

function useAccesTokenFromHash() {

  const hashInfo = document.location.hash ?
    Object.fromEntries(
      decodeURIComponent(document.location.hash)
        .slice(1)
        .split('&')
        .map(param => param.split('='))
    ) : null

  if (hashInfo) {
    store.commit('auth/SET_AUTH_DATA', hashInfo)
    localStorage.setItem('authInfo', JSON.stringify(hashInfo))
  }

  return hashInfo

}

function getOAuthAuthorizationUrl() {

  return getOAuthLink('code')

}

function getOAuthImplictUrl() {

  return getOAuthLink('token')

}

function logOut() {

  localStorage.removeItem('authInfo')
  location.reload()

}

export {
  getOAuthImplictUrl,
  getOAuthAuthorizationUrl,
  useAccesTokenFromHash,
  logOut,
}