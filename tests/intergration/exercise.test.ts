import request from "supertest";
import app from "../../src/app";
import { expect, test, vi, describe, it } from "vitest";

describe("Exercise Routes", () => {
  describe("GET /api/v1/exercise", () => {
    it("should return all exercises", async () => {
      // Setup data in your test database if needed

      const response = await request(app).get("/api/v1/exercise");

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array);

      // Clean up database after test
    });

    // Additional tests for error cases, empty data, etc.
  });

  // Repeat for POST, PATCH, DELETE, etc.
});
