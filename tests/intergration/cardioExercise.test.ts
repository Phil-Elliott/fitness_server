import request from "supertest";
import app from "../../src/app";
import { expect, describe, it, beforeAll, afterAll } from "vitest";
import setupCardioExerciseTableForTestDatabase from "../../scripts/cardioExercise/setupTests";
import teardownCardioExerciseTableForTestDatabase from "../../scripts/cardioExercise/teardownTests";

const testJwt = process.env.CLERK_TEST_JWT;

describe("cardioExercise Routes", () => {
  beforeAll(async () => {
    await setupCardioExerciseTableForTestDatabase();
  });

  afterAll(async () => {
    await teardownCardioExerciseTableForTestDatabase();
  });

  let id: string;
  const cardioExerciseData = [
    {
      name: "Run",
      description: "Run fast",
    },
    {
      name: "Bike",
      description: "Bike fast",
    },
    {
      name: "Swim",
      description: "Swim fast",
    },
  ];

  describe("GET /api/v1/cardioExercise", () => {
    it("should return all cardioExercises", async () => {
      const response = await request(app)
        .get("/api/v1/cardioExercise")
        .set("Authorization", `Bearer ${testJwt}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject(cardioExerciseData);
      id = response.body[0].id;
    });
  });

  describe("GET /api/v1/cardioExercise/:id", () => {
    it("should return a single cardioExercise", async () => {
      const response = await request(app)
        .get(`/api/v1/cardioExercise/${id}`)
        .set("Authorization", `Bearer ${testJwt}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject({
        id: id,
        name: cardioExerciseData[0].name,
        description: cardioExerciseData[0].description,
      });
    });
  });

  describe("Post /api/v1/cardioExercise", () => {
    it("should create a new cardioExercise", async () => {
      const newCardioExercise = {
        name: "Pull-up",
        description: "Lift your body up to the bar",
      };
      const response = await request(app)
        .post("/api/v1/cardioExercise")
        .set("Authorization", `Bearer ${testJwt}`)
        .send(newCardioExercise);
      expect(response.statusCode).toBe(201);

      const createdCardioExercise = {
        id: response.body.cardioExercise.id,
        ...newCardioExercise,
      };
      expect(response.body.cardioExercise).toMatchObject(createdCardioExercise);
      id = response.body.cardioExercise.id;
    });
  });

  describe("PATCH /api/v1/cardioExercise/:id", () => {
    it("should update all items of an cardioExercise", async () => {
      const updatedCardioExercise = {
        name: "Pull-up",
        description: "Lift your body up to the bar and lower it back down",
      };
      const response = await request(app)
        .patch(`/api/v1/cardioExercise/${id}`)
        .set("Authorization", `Bearer ${testJwt}`)
        .send(updatedCardioExercise);
      expect(response.statusCode).toBe(200);
      expect(response.body.cardioExercise).toMatchObject({
        id: id,
        name: updatedCardioExercise.name,
        description: updatedCardioExercise.description,
      });
    });

    it("should update some items of an cardioExercise", async () => {
      const updatedCardioExercise = {
        description: "Just lift your body up to the bar and lower it back down",
      };
      const response = await request(app)
        .patch(`/api/v1/cardioExercise/${id}`)
        .set("Authorization", `Bearer ${testJwt}`)
        .send(updatedCardioExercise);
      expect(response.statusCode).toBe(200);
      expect(response.body.cardioExercise).toMatchObject({
        id: id,
        name: "Pull-up",
        description: updatedCardioExercise.description,
      });
    });

    it("should not update an cardioExercise that does not exist", async () => {
      const updatedCardioExercise = {
        name: "Pull-up",
        description: "Lift your body up to the bar and lower it back down",
      };
      const response = await request(app)
        .patch(`/api/v1/cardioExercise/123456789`)
        .set("Authorization", `Bearer ${testJwt}`)
        .send(updatedCardioExercise);
      expect(response.statusCode).toBe(404);
    });
  });

  describe("DELETE /api/v1/cardioExercise/:id", () => {
    it("should delete an cardioExercise", async () => {
      const response = await request(app)
        .delete(`/api/v1/cardioExercise/${id}`)
        .set("Authorization", `Bearer ${testJwt}`);
      expect(response.statusCode).toBe(204);
    });

    it("cardioExercise should no longer exist after being deleted", async () => {
      const response = await request(app)
        .get(`/api/v1/cardioExercise/${id}`)
        .set("Authorization", `Bearer ${testJwt}`);
      expect(response.statusCode).toBe(404);
    });

    it("should not delete an cardioExercise that does not exist", async () => {
      const response = await request(app)
        .delete(`/api/v1/cardioExercise/123456789`)
        .set("Authorization", `Bearer ${testJwt}`);
      expect(response.statusCode).toBe(404);
    });
  });
});
