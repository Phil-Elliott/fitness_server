import express, { Express } from "express";
import helmet from "helmet";
import xss from "xss-clean";
import hpp from "hpp";
import cors from "cors";

const securityMiddleware = (app: Express) => {
  // Set security HTTP headers
  app.use(helmet());

  // Data sanitization against XSS
  app.use(xss());

  // Prevent parameter pollution
  app.use(
    hpp({
      whitelist: [],
    })
  );

  // Enable CORS (configure as needed)
  const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
  };

  app.use(cors(corsOptions));
};

export default securityMiddleware;
