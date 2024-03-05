import request from "supertest";
import app from "../../src/app";
import { expect, describe, it, beforeAll, afterAll, vi } from "vitest";
import setupTemplateWorkoutExerciseTableForTestDatabase from "../../scripts/templateWorkoutExercise/setupTests";
import teardownTemplateWorkoutExerciseTableForTestDatabase from "../../scripts/templateWorkoutExercise/teardownTests";
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

describe("templateWorkoutExercise Routes", () => {
  beforeAll(async () => {
    await setupTemplateWorkoutExerciseTableForTestDatabase();
  });

  afterAll(async () => {
    await teardownTemplateWorkoutExerciseTableForTestDatabase();
  });

  let id: string;
  const templateWorkoutExerciseData = [
    {
      order_index: 1,
      sets: 3,
      rest_between_sets: 60,
    },
    {
      order_index: 2,
      sets: 10,
      rest_between_sets: 90,
    },
    {
      order_index: 3,
      sets: 4,
      rest_between_sets: 120,
    },
  ];

  describe("GET /api/v1/templateWorkoutExercise", () => {
    it("should return all templateWorkoutExercises", async () => {
      const response = await request(app)
        .get("/api/v1/templateWorkoutExercise")
        .set("Authorization", `Bearer ${testJwt}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject(templateWorkoutExerciseData);
      id = response.body[0].id;
    });
  });

  describe("GET /api/v1/templateWorkoutExercise/:id", () => {
    it("should return a single templateWorkoutExercise", async () => {
      const response = await request(app)
        .get(`/api/v1/templateWorkoutExercise/${id}`)
        .set("Authorization", `Bearer ${testJwt}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject({
        id: id,
        order_index: templateWorkoutExerciseData[0].order_index,
      });
    });
  });

  describe("Post /api/v1/templateWorkoutExercise", () => {
    it("should create a new templateWorkoutExercise", async () => {
      const templateWorkout = await db.execute(
        sql`INSERT INTO "templateWorkouts" (user_id, name, notes, rest_between_exercises, template_workout_status, frequency, duration_type, duration) VALUES ('user_12543', 'Morning Workout', 'A workout to finish the day', 80, 'active', 'weekly', 'weeks', 8) RETURNING *;`
      );
      const templateWorkoutId = templateWorkout.rows[0].id as number;

      const exercise = await db.execute(
        sql`INSERT INTO exercises (name, description) VALUES ('Awesome Push Ups', 'An awesome exercise to build upper body strength') RETURNING *`
      );
      const exerciseId = exercise.rows[0].id as number;

      const newTemplateWorkoutExercise = {
        template_workout_id: templateWorkoutId,
        exercise_id: exerciseId,
        order_index: 4,
        sets: 5,
        rest_between_sets: 90,
      };
      const response = await request(app)
        .post("/api/v1/templateWorkoutExercise")
        .set("Authorization", `Bearer ${testJwt}`)
        .send(newTemplateWorkoutExercise);
      expect(response.statusCode).toBe(201);

      const createdTemplateWorkoutExercise = {
        id: response.body.templateWorkoutExercise.id,
        ...newTemplateWorkoutExercise,
      };
      expect(response.body.templateWorkoutExercise).toMatchObject(
        createdTemplateWorkoutExercise
      );
      id = response.body.templateWorkoutExercise.id;
    });
  });

  describe("PATCH /api/v1/templateWorkoutExercise/:id", () => {
    it("should update the data of a templateWorkoutExercise", async () => {
      const updatedTemplateWorkoutExercise = {
        order_index: 2,
        sets: 10,
        rest_between_sets: 150,
      };
      const response = await request(app)
        .patch(`/api/v1/templateWorkoutExercise/${id}`)
        .set("Authorization", `Bearer ${testJwt}`)
        .send(updatedTemplateWorkoutExercise);
      expect(response.statusCode).toBe(200);
      expect(response.body.templateWorkoutExercise).toMatchObject({
        id: id,
        ...updatedTemplateWorkoutExercise,
      });
    });

    it("should not update a templateWorkoutExercise that does not exist", async () => {
      const updatedTemplateWorkoutExercise = {
        order_index: 3,
      };
      const response = await request(app)
        .patch(`/api/v1/templateWorkoutExercise/123456789`)
        .set("Authorization", `Bearer ${testJwt}`)
        .send(updatedTemplateWorkoutExercise);
      expect(response.statusCode).toBe(404);
    });
  });

  describe("DELETE /api/v1/templateWorkoutExercise/:id", () => {
    it("should delete a templateWorkoutExercise", async () => {
      const response = await request(app)
        .delete(`/api/v1/templateWorkoutExercise/${id}`)
        .set("Authorization", `Bearer ${testJwt}`);
      expect(response.statusCode).toBe(204);
    });

    it("templateWorkoutExercise should no longer exist after being deleted", async () => {
      const response = await request(app)
        .get(`/api/v1/templateWorkoutExercise/${id}`)
        .set("Authorization", `Bearer ${testJwt}`);
      expect(response.statusCode).toBe(404);
    });

    it("should not delete a templateWorkoutExercise that does not exist", async () => {
      const response = await request(app)
        .delete(`/api/v1/templateWorkoutExercise/123456789`)
        .set("Authorization", `Bearer ${testJwt}`);
      expect(response.statusCode).toBe(404);
    });
  });
});
