const twitchAuthUrl = 'https://id.twitch.tv/oauth2/authorize'

const redirectUri = 'http://localhost:8080/config.html'

const client_id = 'rit807jb5l8m8xpodq19vkgksgsfbm'

const OAuthLink = `${twitchAuthUrl}?client_id=${client_id}&redirect_uri=${redirectUri}&scope=bits:read moderation:read&force_verify=true&`

function getOAuthLink(type: string) {

  return `${OAuthLink}response_type=${type}`
}

function getAccesTokenFromHash() {

  return document.location.hash ?
    Object.fromEntries(
      decodeURIComponent(document.location.hash)
        .slice(1)
        .split('&')
        .map(param => param.split('='))
    ) : null

}

function getOAuthAuthorizationUrl() {

  return getOAuthLink('code')

}

function getOAuthImplictUrl() {

  return getOAuthLink('token')

}

export {
  getOAuthImplictUrl,
  getOAuthAuthorizationUrl,
  getAccesTokenFromHash,
}