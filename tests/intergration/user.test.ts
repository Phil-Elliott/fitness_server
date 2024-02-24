import request from "supertest";
import app from "../../src/app";
import { expect, describe, it, beforeAll, afterAll, vi } from "vitest";
import setupUserTableForTestDatabase from "../../scripts/user/setupTests";
import teardownUserTableForTestDatabase from "../../scripts/user/teardownTests";
import { Request, Response, NextFunction } from "express";

vi.mock("@clerk/clerk-sdk-node", () => ({
  ClerkExpressRequireAuth:
    () => (req: Request, res: Response, next: NextFunction) => {
      req.auth = { userId: "user_12543" };
      next();
    },
}));

const testJwt = process.env.CLERK_TEST_JWT;

describe("User Routes", () => {
  beforeAll(async () => {
    await setupUserTableForTestDatabase();
  });

  afterAll(async () => {
    await teardownUserTableForTestDatabase();
  });

  const userData = [
    {
      id: "user_12543",
      email: "johndoe@gmail.com",
      display_name: "John Doe",
    },
    {
      id: "user_13543",
      email: "bobsmith@gmail.com",
      display_name: "Bob Smith",
    },
    {
      id: "user_1257753",
      email: "elizebethOwens@aol.com",
      display_name: "Elizebeth Owens",
    },
  ];

  describe("GET /api/v1/user/me", () => {
    it("should return the current user", async () => {
      const response = await request(app)
        .get(`/api/v1/user/me`)
        .set("Authorization", `Bearer ${testJwt}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject({
        id: userData[0].id,
        email: userData[0].email,
        display_name: userData[0].display_name,
      });
    });
  });

  describe("DELETE /api/v1/user/me", () => {
    it("should delete a user", async () => {
      const response = await request(app)
        .delete(`/api/v1/user/me`)
        .set("Authorization", `Bearer ${testJwt}`);
      expect(response.statusCode).toBe(204);
    });

    it("user should no longer exist after being deleted", async () => {
      const response = await request(app)
        .get(`/api/v1/user/me`)
        .set("Authorization", `Bearer ${testJwt}`);
      expect(response.statusCode).toBe(404);
    });

    it("should not delete a user that does not exist", async () => {
      const response = await request(app)
        .delete(`/api/v1/user/me`)
        .set("Authorization", `Bearer ${testJwt}`);
      expect(response.statusCode).toBe(404);
    });
  });

  describe("Post /api/v1/user", () => {
    it("should create a new user", async () => {
      const newUser = {
        email: "sarahevans@yahoo.com",
        display_name: "Sarah Evans",
      };
      const response = await request(app)
        .post("/api/v1/user")
        .send(newUser)
        .set("Authorization", `Bearer ${testJwt}`);
      expect(response.statusCode).toBe(201);

      expect(response.body.user).toMatchObject(newUser);
    });

    it("should not create a user with a duplicate clerk_id and should return the user info with that clerk_id", async () => {
      const newUser = {
        id: "user_12543",
        email: "bob@gmail.com",
        display_name: "Bob",
      };
      const response = await request(app)
        .post("/api/v1/user")
        .send(newUser)
        .set("Authorization", `Bearer ${testJwt}`);
      expect(response.statusCode).toBe(400);
    });

    it("should not create a user with a duplicate email", async () => {
      const newUser = {
        id: "73547",
        email: "sarahevans@yahoo.com",
        display_name: "Sarah Smith Evans",
      };

      const response = await request(app)
        .post("/api/v1/user")
        .send(newUser)
        .set("Authorization", `Bearer ${testJwt}`);
      expect(response.statusCode).toBe(400);
    });
  });

  describe("PATCH /api/v1/user/me", () => {
    it("should update all items of an user", async () => {
      const updatedUser = {
        email: "sarahevans@yahoo.com",
        display_name: "Sarah Smith Evans",
      };
      const response = await request(app)
        .patch(`/api/v1/user/me`)
        .set("Authorization", `Bearer ${testJwt}`)
        .send(updatedUser);
      expect(response.statusCode).toBe(200);
      expect(response.body.user).toMatchObject({
        id: userData[0].id,
        ...updatedUser,
      });
    });

    it("should update some items of an user", async () => {
      const updatedUser = {
        email: "sarahevans@gmail.com",
      };
      const response = await request(app)
        .patch(`/api/v1/user/me`)
        .set("Authorization", `Bearer ${testJwt}`)
        .send(updatedUser);
      expect(response.statusCode).toBe(200);
      expect(response.body.user).toMatchObject({
        id: userData[0].id,
        email: "sarahevans@gmail.com",
        display_name: "Sarah Smith Evans",
      });
    });
  });
});
