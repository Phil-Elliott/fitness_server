import request from "supertest";
import app from "../../src/app";
import { expect, describe, it, beforeAll, afterAll, vi } from "vitest";
import setupWorkoutCardioTableForTestDatabase from "../../scripts/workoutCardio/setupTests";
import teardownWorkoutCardioTableForTestDatabase from "../../scripts/workoutCardio/teardownTests";
import db from "../../src/database/setup";
import { sql } from "drizzle-orm";
import { Request, Response, NextFunction } from "express";

vi.mock("@clerk/clerk-sdk-node", () => ({
  ClerkExpressRequireAuth:
    () => (req: Request, res: Response, next: NextFunction) => {
      req.auth = { userId: "user_12543" };
      next();
    },
}));

const testJwt = process.env.CLERK_TEST_JWT;

describe("WorkoutCardio Routes", () => {
  beforeAll(async () => {
    await setupWorkoutCardioTableForTestDatabase();
  });

  afterAll(async () => {
    await teardownWorkoutCardioTableForTestDatabase();
  });

  let id: string;
  const workoutCardioData = [
    {
      order_index: 1,
    },
    {
      order_index: 2,
    },
    {
      order_index: 3,
    },
  ];

  describe("GET /api/v1/workoutCardio", () => {
    it("should return all workoutCardio", async () => {
      const response = await request(app)
        .get("/api/v1/workoutCardio")
        .set("Authorization", `Bearer ${testJwt}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject(workoutCardioData);
      id = response.body[0].id;
    });
  });

  describe("GET /api/v1/workoutCardio/:id", () => {
    it("should return a single workoutCardio", async () => {
      const response = await request(app)
        .get(`/api/v1/workoutCardio/${id}`)
        .set("Authorization", `Bearer ${testJwt}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject({
        id: id,
        order_index: workoutCardioData[0].order_index,
      });
    });
  });

  describe("Post /api/v1/workoutCardio", () => {
    it("should create a new workoutCardio", async () => {
      const workout = await db.execute(
        sql`INSERT INTO workouts (user_id, name, notes, date, workout_status, created_at) VALUES ('user_12543', 'Night Workout', 'A workout to end the day', date '2024-03-07', 'incomplete', NOW()) RETURNING *`
      );

      const workoutId = workout.rows[0].id;

      const cardioExercise = await db.execute(
        sql`INSERT INTO "cardioExercises" (name, description) VALUES ('Jog', 'Jog fast') RETURNING *;`
      );

      const cardioExerciseId = cardioExercise.rows[0].id;

      const cardio = await db.execute(
        sql`INSERT INTO cardio (user_id, cardio_exercise_id, duration, distance, date, notes) VALUES ('user_12543', ${cardioExerciseId}, 35, 7, date '2024-01-04', 'A jog to start the day') RETURNING *;`
      );

      const cardioId = cardio.rows[0].id;

      const newWorkoutCardio = {
        workout_id: workoutId,
        cardio_id: cardioId,
        order_index: 1,
      };
      const response = await request(app)
        .post("/api/v1/workoutCardio")
        .set("Authorization", `Bearer ${testJwt}`)
        .send(newWorkoutCardio);
      expect(response.statusCode).toBe(201);

      const createdWorkoutCardio = {
        id: response.body.workoutCardio.id,
        ...newWorkoutCardio,
      };
      expect(response.body.workoutCardio).toMatchObject(createdWorkoutCardio);
      id = response.body.workoutCardio.id;
    });
  });

  describe("PATCH /api/v1/workoutCardio/:id", () => {
    it("should update the order index of a workoutCardio", async () => {
      const updatedWorkoutCardio = {
        order_index: 2,
      };
      const response = await request(app)
        .patch(`/api/v1/workoutCardio/${id}`)
        .set("Authorization", `Bearer ${testJwt}`)
        .send(updatedWorkoutCardio);
      expect(response.statusCode).toBe(200);
      expect(response.body.workoutCardio).toMatchObject({
        id: id,
        order_index: updatedWorkoutCardio.order_index,
      });
    });

    it("should not update a workoutCardio that does not exist", async () => {
      const updatedWorkoutCardio = {
        order_index: 3,
      };
      const response = await request(app)
        .patch(`/api/v1/workoutCardio/123456789`)
        .set("Authorization", `Bearer ${testJwt}`)
        .send(updatedWorkoutCardio);
      expect(response.statusCode).toBe(404);
    });
  });

  describe("DELETE /api/v1/workoutCardio/:id", () => {
    it("should delete a workoutCardio", async () => {
      const response = await request(app)
        .delete(`/api/v1/workoutCardio/${id}`)
        .set("Authorization", `Bearer ${testJwt}`);
      expect(response.statusCode).toBe(204);
    });

    it("WorkoutCardio should no longer exist after being deleted", async () => {
      const response = await request(app)
        .get(`/api/v1/workoutCardio/${id}`)
        .set("Authorization", `Bearer ${testJwt}`);
      expect(response.statusCode).toBe(404);
    });

    it("should not delete a workoutCardio that does not exist", async () => {
      const response = await request(app)
        .delete(`/api/v1/workoutCardio/123456789`)
        .set("Authorization", `Bearer ${testJwt}`);
      expect(response.statusCode).toBe(404);
    });
  });
});
