import dotenv from "dotenv";

dotenv.config();

const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, secure: false },
  name: "session-cookie",
};

export default sessionOptions;
