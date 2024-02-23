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
      clerk_user_id: "user_12543",
      email: "johndoe@gmail.com",
      display_name: "John Doe",
    },
    {
      clerk_user_id: "user_13543",
      email: "bobsmith@gmail.com",
      display_name: "Bob Smith",
    },
    {
      clerk_user_id: "user_1257753",
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
        clerk_user_id: userData[0].clerk_user_id,
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

      const createdUser = {
        id: response.body.user.id,
        clerk_user_id: "user_12543",
        ...newUser,
      };
      expect(response.body.user).toMatchObject(createdUser);
    });

    it("should not create a user with a duplicate clerk_id and should return the user info with that clerk_id", async () => {
      const newUser = {
        clerk_user_id: "user_12543",
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
        clerk_user_id: "73547",
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
        clerk_user_id: userData[0].clerk_user_id,
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
        clerk_user_id: userData[0].clerk_user_id,
        email: "sarahevans@gmail.com",
        display_name: "Sarah Smith Evans",
      });
    });
  });
});
