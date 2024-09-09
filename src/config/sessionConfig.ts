import dotenv from "dotenv";

dotenv.config();

const sessionOptions = {
  secret: "test",
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, secure: false },
  name: "session-cookie",
};

export default sessionOptions;
