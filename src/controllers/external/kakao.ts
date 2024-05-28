import { Request, Response } from "express";
import { kakaoService } from "@_services/kakao";

class KakaoController {
  private platform: string;
  constructor() {
    this.platform = "kakao";
  }
  /**
   * @description req.body의 code로 kakao 사용자 정보 얻기
   */
  getUserInfo = async (req: Request, res: Response) => {
    const { code } = req.body;
    try {
      const tokenResponse = await kakaoService.getToken(code as string);
      const { access_token } = tokenResponse;

      const userInfo = await kakaoService.getUserInfo(access_token);
      const user = await kakaoService.findOrCreateUser(userInfo, this.platform);

      req.session.user = user;
      const data = {
        id: user.platform + user.id,
        nickname: user.nickname,
        profileImg: user.profile_image,
      };
      res.cookie("sessionID", req.sessionID, { httpOnly: true });
      res.send(data);
    } catch (error) {
      console.error("Error during Kakao authentication:", error);
      res.status(500).json({ message: "Error during Kakao authentication" });
    }
  };
}
export const kakaoController = new KakaoController();
