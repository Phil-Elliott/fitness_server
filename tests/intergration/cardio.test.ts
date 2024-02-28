import request from "supertest";
import app from "../../src/app";
import { expect, describe, it, beforeAll, afterAll, vi } from "vitest";
import setupCardioTableForTestDatabase from "../../scripts/cardio/setupTests";
import teardownCardioTableForTestDatabase from "../../scripts/cardio/teardownTests";
import { Request, Response, NextFunction } from "express";
import db from "../../src/database/setup";
import { sql } from "drizzle-orm";

vi.mock("@clerk/clerk-sdk-node", () => ({
  ClerkExpressRequireAuth:
    () => (req: Request, res: Response, next: NextFunction) => {
      req.auth = { userId: "user_12543" };
      next();
    },
}));

const testJwt = process.env.CLERK_TEST_JWT;

describe("Cardio Routes", () => {
  beforeAll(async () => {
    await setupCardioTableForTestDatabase();
  });

  afterAll(async () => {
    await teardownCardioTableForTestDatabase();
  });

  let id: string;
  let routineId: string;
  const cardioData = [
    {
      user_id: "user_12543",
      duration: 30,
      distance: 5,
      date: "2024-02-26",
      notes: "A cardio to start the day",
    },
    {
      user_id: "user_12543",
      duration: 45,
      distance: 10,
      date: "2024-02-29",
      notes: "A cardio to end the day",
    },
    {
      user_id: "user_12543",
      duration: 60,
      distance: 15,
      date: "2024-01-18",
      notes: "A cardio to break up the day",
    },
  ];

  describe("GET /api/v1/cardio", () => {
    it("should return all cardio", async () => {
      const response = await request(app)
        .get("/api/v1/cardio")
        .set("Authorization", `Bearer ${testJwt}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject(cardioData);
      id = response.body[0].id;
      routineId = response.body[0].routine_id;
    });
  });

  describe("GET /api/v1/cardio/:id", () => {
    it("should return a single cardio", async () => {
      const response = await request(app)
        .get(`/api/v1/cardio/${id}`)
        .set("Authorization", `Bearer ${testJwt}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject({
        id: id,
        ...cardioData[0],
      });
    });
  });

  describe("Post /api/v1/cardio", () => {
    it("should create a new cardio", async () => {
      const cardioExercise = await db.execute(
        sql`INSERT INTO "cardioExercises" (name, description) VALUES ('Swim', 'Swim fast') RETURNING *;`
      );

      const cardioExerciseId = cardioExercise.rows[0].id;

      const newCardio = {
        user_id: "user_12543",
        routine_id: routineId,
        cardio_exercise_id: cardioExerciseId,
        duration: 90,
        distance: 20,
        date: "2024-02-26",
        notes: "A cardio to do new things",
      };
      const response = await request(app)
        .post("/api/v1/cardio")
        .set("Authorization", `Bearer ${testJwt}`)
        .send(newCardio);
      expect(response.statusCode).toBe(201);

      const createdCardio = {
        id: response.body.cardio.id,
        ...newCardio,
      };
      expect(response.body.cardio).toMatchObject(createdCardio);
      id = response.body.cardio.id;
    });
  });

  describe("PATCH /api/v1/cardio/:id", () => {
    it("should update all items of a cardio", async () => {
      const updatedCardio = {
        duration: 120,
        distance: 25,
        date: "2025-02-26",
        notes: "An old cardio to do new things",
      };
      const response = await request(app)
        .patch(`/api/v1/cardio/${id}`)
        .set("Authorization", `Bearer ${testJwt}`)
        .send(updatedCardio);
      expect(response.statusCode).toBe(200);
      expect(response.body.cardio).toMatchObject({
        id: id,
        ...updatedCardio,
      });
    });

    it("should update some items of a cardio", async () => {
      const updatedCardio = {
        notes: "Another cardio to do new things",
      };
      const response = await request(app)
        .patch(`/api/v1/cardio/${id}`)
        .set("Authorization", `Bearer ${testJwt}`)
        .send(updatedCardio);
      expect(response.statusCode).toBe(200);
      expect(response.body.cardio).toMatchObject({
        id: id,
        duration: 120,
        distance: 25,
        date: "2025-02-26",
        ...updatedCardio,
      });
    });

    it("should not update a cardio that does not exist", async () => {
      const updatedCardio = {
        name: "Terrific cardio",
        notes: "A cardio to do terrific things",
      };
      const response = await request(app)
        .patch(`/api/v1/cardio/123456789`)
        .set("Authorization", `Bearer ${testJwt}`)
        .send(updatedCardio);
      expect(response.statusCode).toBe(404);
    });
  });

  describe("DELETE /api/v1/cardio/:id", () => {
    it("should delete a cardio", async () => {
      const response = await request(app)
        .delete(`/api/v1/cardio/${id}`)
        .set("Authorization", `Bearer ${testJwt}`);
      expect(response.statusCode).toBe(204);
    });

    it("cardio should no longer exist after being deleted", async () => {
      const response = await request(app)
        .get(`/api/v1/cardio/${id}`)
        .set("Authorization", `Bearer ${testJwt}`);
      expect(response.statusCode).toBe(404);
    });

    it("should not delete a cardio that does not exist", async () => {
      const response = await request(app)
        .delete(`/api/v1/cardio/123456789`)
        .set("Authorization", `Bearer ${testJwt}`);
      expect(response.statusCode).toBe(404);
    });
  });
});
