type responseType = 'token' | 'code'

type GetOAuthLink = (type: responseType) => string
type UseAccesTokenFromHash = () => string
type GetOAuthAuthorizationUrl = () => string
type GetOAuthImplictUrl = () => string
type LogOut = () => void

export {
  GetOAuthLink,
  UseAccesTokenFromHash,
  GetOAuthAuthorizationUrl,
  GetOAuthImplictUrl,
  LogOut,
}