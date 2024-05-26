const corsOptions = {
  origin: "http://localhost:" + process.env.CUMMINUTY_PORT, // 특정 도메인 및 포트를 허용
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // 허용할 HTTP 메소드
};

export default corsOptions;
