import axios from "axios";
import { Router } from "express";
const router = Router();

// oauth
router.get("/auth/kakao/login", (req, res) => {
  const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_RESTFUL_API_KEY}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&response_type=code`;
  res.redirect(kakaoAuthURL);
});

router.get("/auth/kakao/callback", async (req, res) => {
  console.log("originURL", req.ip);
  const { code } = req.query;
  try {
    const response = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      new URLSearchParams({
        grant_type: "authorization_code",
        client_id: process.env.KAKAO_RESTFUL_API_KEY!,
        client_secret: process.env.KAKAO_CLIENT_SECRET!,
        redirect_uri: process.env.KAKAO_REDIRECT_URI!,
        code: code as string,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token } = response.data;
    // 클라이언트로 액세스 토큰 전달
    // res.json({ access_token });
    res.redirect("http://localhost:3000");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error during Kakao authentication" });
  }
});
export default router;
