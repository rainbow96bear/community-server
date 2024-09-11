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
    const code = req.body.code;
    try {
      const access_token = await kakaoService.getToken(code as string);
      const userInfo = await kakaoService.getUserInfo(access_token);
      const user = await kakaoService.findOrCreateUser(userInfo, this.platform);

      req.session.userInfo = user;
      res.cookie("sessionID", req.sessionID, { httpOnly: true });

      res.status(200).json({
        userInfo: user,
      });
    } catch (error) {
      console.error("Error during Kakao authentication:", error);
      res.status(500).json({ message: "Error during Kakao authentication" });
    }
  };
}
export const kakaoController = new KakaoController();
