const sessionOptions = {
  secret: process.env.SESSION_SECRET || "DevSessionSecret",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true },
};

export default sessionOptions;
