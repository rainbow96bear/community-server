import axios from "axios";
import Users from "@_models/Users";
import { KakaoTokenResponse, KakaoUserInfo, UserInfo } from "@_types/index";

class KakaoService {
  private api_key: string;
  private secret: string;
  private redirectUri: string;

  constructor() {
    this.api_key = process.env.KAKAO_RESTFUL_API_KEY!;
    this.secret = process.env.KAKAO_CLIENT_SECRET!;
    this.redirectUri = process.env.KAKAO_REDIRECT_URI!;
  }
  /**
   * @description code와 client_secret으로 access token 얻기
   * @returns access token
   */
  getToken = async (code: string): Promise<string> => {
    const params = new URLSearchParams({
      grant_type: "authorization_code",
      client_id: this.api_key,
      client_secret: this.secret,
      redirect_uri: this.redirectUri,
      code,
    });

    try {
      const response = (
        await axios.post<KakaoTokenResponse>(
          "https://kauth.kakao.com/oauth/token",
          params,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
      ).data;
      return response.access_token;
    } catch (error) {
      console.error("Error fetching Kakao token:", error);
      throw error;
    }
  };

  /**
   * @description access token으로 사용자 정보 얻기
   * @returns KakaoUserInfo
   */
  getUserInfo = async (accessToken: string): Promise<KakaoUserInfo> => {
    try {
      const response = await axios.get(
        "https://kapi.kakao.com/v1/oidc/userinfo",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching user info:", error);
      throw error;
    }
  };

  /**
   * @description 사용자 정보가 저장되어있지 않으면 DB에 저장
   * @returns DB에 저장되어있는 사용자 정보
   */
  findOrCreateUser = async (
    userInfo: KakaoUserInfo,
    platform: string
  ): Promise<UserInfo> => {
    const { sub, nickname, picture } = userInfo;

    let user = await Users.findOne({ where: { platform, user_id: sub } });

    if (!user) {
      user = await Users.create({
        platform,
        user_id: sub,
        nickname,
        profile_image: picture,
      });
    }

    // 'User' 타입의 객체로 반환
    return {
      id: user.dataValues.id,
      nickname: user.dataValues.nickname,
      profile_image: user.dataValues.profile_image,
    };
  };
}

export const kakaoService = new KakaoService();
