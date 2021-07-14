export interface AuthUrlData {
  access_token?: string
  token_type?: string
  scope?: string
}

export interface State {
  authUrlData: AuthUrlData,
}
