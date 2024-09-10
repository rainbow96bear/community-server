// category
export interface Category {
  category: string;
  subcategory: string;
}

// kakao
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

// post
export interface Post {
  category: string;
  subcategory: string;
  title: string;
  content: string;
}

export interface PostList {
  id: string;
  category: string;
  subcategory: string;
  title: string;
  userId?: string;
  nickname?: string;
}
export interface PostsByCategory {
  [category: string]: PostList[];
}
// userInfo
export interface UserInfo {
  id: string;
  nickname: string;
  profile_image?: string;
  wallet?: string;
}

// database
export interface DatabaseConfig {
  username: string;
  password: string | undefined;
  database: string;
  host: string;
  port: string | number;
}

export interface Config {
  development: DatabaseConfig;
  docker_compose: DatabaseConfig;
  production: DatabaseConfig;
}
