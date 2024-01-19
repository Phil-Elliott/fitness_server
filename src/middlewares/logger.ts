import morgan from "morgan";

const loggerMiddleware = morgan(
  process.env.NODE_ENV === "development" ? "dev" : "combined"
);

export default loggerMiddleware;
