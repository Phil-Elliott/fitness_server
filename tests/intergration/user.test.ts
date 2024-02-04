import request from "supertest";
import app from "../../src/app";
import { expect, describe, it, beforeAll, afterAll } from "vitest";
import setupUserTableForTestDatabase from "../../scripts/user/setupTests";
import teardownUserTableForTestDatabase from "../../scripts/user/teardownTests";

describe("User Routes", () => {
  beforeAll(async () => {
    await setupUserTableForTestDatabase();
  });

  afterAll(async () => {
    await teardownUserTableForTestDatabase();
  });

  let id: string;
  const userData = [
    {
      clerk_user_id: "73543",
      email: "johndoe@gmail.com",
      display_name: "John Doe",
    },
    {
      clerk_user_id: "73544",
      email: "bobsmith@gmail.com",
      display_name: "Bob Smith",
    },
    {
      clerk_user_id: "73545",
      email: "elizebethOwens@aol.com",
      display_name: "Elizebeth Owens",
    },
  ];

  describe("GET /api/v1/user", () => {
    it("should return all users", async () => {
      const response = await request(app).get("/api/v1/user");
      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject(userData);
      id = response.body[0].id;
    });
  });

  describe("GET /api/v1/user/:id", () => {
    it("should return a single user", async () => {
      const response = await request(app).get(`/api/v1/user/${id}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject({
        id: id,
        clerk_user_id: userData[0].clerk_user_id,
        email: userData[0].email,
        display_name: userData[0].display_name,
      });
    });
  });

  describe("Post /api/v1/user", () => {
    it("should create a new user", async () => {
      const newUser = {
        clerk_user_id: "73546",
        email: "sarahevans@yahoo.com",
        display_name: "Sarah Evans",
      };
      const response = await request(app).post("/api/v1/user").send(newUser);
      expect(response.statusCode).toBe(201);

      const createdUser = {
        id: response.body.user.id,
        ...newUser,
      };
      expect(response.body.user).toMatchObject(createdUser);
      id = response.body.user.id;
    });
  });

  describe("PATCH /api/v1/user/:id", () => {
    it("should update all items of an user", async () => {
      const updatedUser = {
        clerk_user_id: "73546",
        email: "sarahevans@yahoo.com",
        display_name: "Sarah Smith Evans",
      };
      const response = await request(app)
        .patch(`/api/v1/user/${id}`)
        .send(updatedUser);
      expect(response.statusCode).toBe(200);
      expect(response.body.user).toMatchObject({
        id: id,
        ...updatedUser,
      });
    });

    it("should update some items of an user", async () => {
      const updatedUser = {
        email: "sarahevans@gmail.com",
      };
      const response = await request(app)
        .patch(`/api/v1/user/${id}`)
        .send(updatedUser);
      expect(response.statusCode).toBe(200);
      expect(response.body.user).toMatchObject({
        id: id,
        clerk_user_id: "73546",
        email: "sarahevans@gmail.com",
        display_name: "Sarah Smith Evans",
      });
    });

    it("should not update an user that does not exist", async () => {
      const updatedUser = {
        name: "Pull-up",
        description: "Lift your body up to the bar and lower it back down",
      };
      const response = await request(app)
        .patch(`/api/v1/user/123456789`)
        .send(updatedUser);
      expect(response.statusCode).toBe(404);
    });
  });

  describe("DELETE /api/v1/user/:id", () => {
    it("should delete an user", async () => {
      const response = await request(app).delete(`/api/v1/user/${id}`);
      expect(response.statusCode).toBe(204);
    });

    it("user should no longer exist after being deleted", async () => {
      const response = await request(app).get(`/api/v1/user/${id}`);
      console.log(response.body, "response");
      expect(response.statusCode).toBe(404);
    });

    it("should not delete an user that does not exist", async () => {
      const response = await request(app).delete(`/api/v1/user/123456789`);
      expect(response.statusCode).toBe(404);
    });
  });
});
