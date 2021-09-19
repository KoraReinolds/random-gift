import router from '@/router'
import { store } from '@/store'
import {
  GetOAuthLink,
  UseAccesTokenFromHash,
  GetOAuthAuthorizationUrl,
  GetOAuthImplictUrl,
  LogOut,
} from './types'

const twitchAuthUrl = 'https://id.twitch.tv/oauth2/authorize'

const redirectUri = process.env.VUE_APP_REDIRECT_URI

const client_id = process.env.VUE_APP_CLIENT_ID

const OAuthLink = `${twitchAuthUrl}?client_id=${client_id}&redirect_uri=${redirectUri}&scope=bits:read moderation:read&force_verify=true&`


const getOAuthLink: GetOAuthLink = (type) => `${OAuthLink}response_type=${type}`

const useAccesTokenFromHash: UseAccesTokenFromHash = () => {

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

const getOAuthAuthorizationUrl: GetOAuthAuthorizationUrl = () => getOAuthLink('code')

const getOAuthImplictUrl: GetOAuthImplictUrl = () => getOAuthLink('token')

const logOut: LogOut = () => {

  router.push({ name: 'Main' })
  localStorage.removeItem('authInfo')
  setTimeout(() => location.reload())
  

}


export {
  getOAuthLink,
  useAccesTokenFromHash,
  getOAuthAuthorizationUrl,
  getOAuthImplictUrl,
  logOut,
}