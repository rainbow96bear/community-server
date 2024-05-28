export interface KakaoTokenResponse {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  refresh_token_expires_in: number;
}

export interface KakaoUserInfo {
  sub: string;
  nickname: string;
  picture?: string;
}

export interface User {
  platform: string;
  id: string;
  nickname: string;
  profile_image?: string;
  wallet?: string;
}
