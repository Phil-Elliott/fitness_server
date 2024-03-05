import request from "supertest";
import app from "../../src/app";
import { expect, describe, it, beforeAll, afterAll, vi } from "vitest";
import setupTemplateWorkoutCardioTableForTestDatabase from "../../scripts/templateWorkoutCardio/setupTests";
import teardownTemplateWorkoutCardioTableForTestDatabase from "../../scripts/templateWorkoutCardio/teardownTests";
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

describe("templateWorkoutCardio Routes", () => {
  beforeAll(async () => {
    await setupTemplateWorkoutCardioTableForTestDatabase();
  });

  afterAll(async () => {
    await teardownTemplateWorkoutCardioTableForTestDatabase();
  });

  let id: string;
  const templateWorkoutCardioData = [
    {
      duration: 30,
      distance: 10,
      order_index: 1,
    },
    {
      duration: 20,
      distance: 8,
      order_index: 2,
    },
    {
      duration: 35,
      distance: 7,
      order_index: 3,
    },
  ];

  describe("GET /api/v1/templateWorkoutCardio", () => {
    it("should return all templateWorkoutCardio", async () => {
      const response = await request(app)
        .get("/api/v1/templateWorkoutCardio")
        .set("Authorization", `Bearer ${testJwt}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject(templateWorkoutCardioData);
      id = response.body[0].id;
    });
  });

  describe("GET /api/v1/templateWorkoutCardio/:id", () => {
    it("should return a single templateWorkoutCardio", async () => {
      const response = await request(app)
        .get(`/api/v1/templateWorkoutCardio/${id}`)
        .set("Authorization", `Bearer ${testJwt}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject({
        id: id,
        ...templateWorkoutCardioData[0],
      });
    });
  });

  describe("Post /api/v1/templateWorkoutCardio", () => {
    it("should create a new templateWorkoutCardio", async () => {
      const templateWorkout = await db.execute(
        sql`INSERT INTO "templateWorkouts" (user_id, name, notes, rest_between_exercises, template_workout_status, frequency, duration_type, duration) VALUES ('user_12543', 'Night Workout', 'A workout to start the night', 70, 'active', 'biweekly', 'months', 4) RETURNING *;`
      );
      const templateWorkoutId = templateWorkout.rows[0].id as number;

      const cardioExercise = await db.execute(
        sql`INSERT INTO "cardioExercises" (name, description) VALUES ('Jog', 'Jog fast') RETURNING *;`
      );

      const cardioExerciseId = cardioExercise.rows[0].id;

      const newTemplateWorkoutCardio = {
        template_workout_id: templateWorkoutId,
        cardio_exercise_id: cardioExerciseId,
        duration: 40,
        distance: 5,
        order_index: 4,
      };
      const response = await request(app)
        .post("/api/v1/templateWorkoutCardio")
        .set("Authorization", `Bearer ${testJwt}`)
        .send(newTemplateWorkoutCardio);
      expect(response.statusCode).toBe(201);

      const createdTemplateWorkoutCardio = {
        id: response.body.templateWorkoutCardio.id,
        ...newTemplateWorkoutCardio,
      };
      expect(response.body.templateWorkoutCardio).toMatchObject(
        createdTemplateWorkoutCardio
      );
      id = response.body.templateWorkoutCardio.id;
    });
  });

  describe("PATCH /api/v1/templateWorkoutCardio/:id", () => {
    it("should update the data of a templateWorkoutCardio", async () => {
      const updatedTemplateWorkoutCardio = {
        duration: 40,
        distance: 7,
        order_index: 5,
      };
      const response = await request(app)
        .patch(`/api/v1/templateWorkoutCardio/${id}`)
        .set("Authorization", `Bearer ${testJwt}`)
        .send(updatedTemplateWorkoutCardio);
      expect(response.statusCode).toBe(200);
      expect(response.body.templateWorkoutCardio).toMatchObject({
        id: id,
        ...updatedTemplateWorkoutCardio,
      });
    });

    it("should not update a templateWorkoutCardio that does not exist", async () => {
      const updatedTemplateWorkoutCardio = {
        order_index: 3,
      };
      const response = await request(app)
        .patch(`/api/v1/templateWorkoutCardio/123456789`)
        .set("Authorization", `Bearer ${testJwt}`)
        .send(updatedTemplateWorkoutCardio);
      expect(response.statusCode).toBe(404);
    });
  });

  describe("DELETE /api/v1/templateWorkoutCardio/:id", () => {
    it("should delete a templateWorkoutCardio", async () => {
      const response = await request(app)
        .delete(`/api/v1/templateWorkoutCardio/${id}`)
        .set("Authorization", `Bearer ${testJwt}`);
      expect(response.statusCode).toBe(204);
    });

    it("templateWorkoutCardio should no longer exist after being deleted", async () => {
      const response = await request(app)
        .get(`/api/v1/templateWorkoutCardio/${id}`)
        .set("Authorization", `Bearer ${testJwt}`);
      expect(response.statusCode).toBe(404);
    });

    it("should not delete a templateWorkoutCardio that does not exist", async () => {
      const response = await request(app)
        .delete(`/api/v1/templateWorkoutCardio/123456789`)
        .set("Authorization", `Bearer ${testJwt}`);
      expect(response.statusCode).toBe(404);
    });
  });
});
