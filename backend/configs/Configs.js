export const PAGE_LIMIT = 10;
export const JWT_options = { expiresIn: "7d" };
export const maxEdits = 1;
export const corsOptions = {
  origin: ["http://localhost:3000", process.env.CLIENT_HOST],
  optionsSuccessStatus: 200,
};
