import dotenv from "dotenv";
import path from "path";
import { createServer, Server } from "http";

dotenv.config({ path: path.resolve(__dirname, "../config.env") });

import app from "./app";

const PORT: number = parseInt(process.env.PORT || "3000", 10);

const server: Server = createServer(app);

server.listen(PORT, (error?: NodeJS.ErrnoException) => {
  if (error) {
    console.error(`[server]: Error starting server: ${error.message}`);
    return;
  }
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM RECEIVED. Shutting down gracefully");
  server.close(() => {
    console.log("Process terminated!");
  });
});

process.on("unhandledRejection", (reason, promise) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(reason, "Unhandled Rejection at Promise", promise);
  server.close(() => {
    process.exit(1);
  });
});
