// import rateLimit from "express-rate-limit";

// // Rate limiting
// const limiter = rateLimit({
//   max: 10000,
//   windowMs: 60 * 60 * 1000,
//   message: "Too many requests from this IP, please try again in an hour!",
// });
// app.use("/api", limiter);

import rateLimit from "express-rate-limit";

// Configure the rate limiting middleware
const rateLimiter = rateLimit({
  max: 10000,
  windowMs: 60 * 60 * 1000, // 1 hour
  message: "Too many requests from this IP, please try again in an hour!",
});

export default rateLimiter;
