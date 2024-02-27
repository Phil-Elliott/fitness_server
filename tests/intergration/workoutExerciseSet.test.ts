import request from "supertest";
import app from "../../src/app";
import { expect, describe, it, beforeAll, afterAll, vi } from "vitest";
import setupWorkoutExerciseSetTableForTestDatabase from "../../scripts/workoutExerciseSet/setupTests";
import teardownWorkoutExerciseSetTableForTestDatabase from "../../scripts/workoutExerciseSet/teardownTests";
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

describe("WorkoutExerciseSet Routes", () => {
  beforeAll(async () => {
    await setupWorkoutExerciseSetTableForTestDatabase();
  });

  afterAll(async () => {
    await teardownWorkoutExerciseSetTableForTestDatabase();
  });

  let id: string;
  const workoutExerciseSetData = [
    {
      set_number: 1,
      repetitions: 10,
      weight: 100,
      weight_unit: "lbs",
      user_input: "10 reps at 100 lbs",
    },
    {
      set_number: 2,
      repetitions: 7,
      weight: 100,
      weight_unit: "lbs",
      user_input: "10 reps at 100 lbs",
    },
    {
      set_number: 3,
      repetitions: 12,
      weight: 85,
      weight_unit: "lbs",
      user_input: "10 reps at 100 lbs",
    },
  ];

  describe("GET /api/v1/workoutExerciseSet", () => {
    it("should return all workoutExerciseSets", async () => {
      const response = await request(app)
        .get("/api/v1/workoutExerciseSet")
        .set("Authorization", `Bearer ${testJwt}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject(workoutExerciseSetData);
      id = response.body[0].id;
    });
  });

  describe("GET /api/v1/workoutExerciseSet/:id", () => {
    it("should return a single workoutExerciseSet", async () => {
      const response = await request(app)
        .get(`/api/v1/workoutExerciseSet/${id}`)
        .set("Authorization", `Bearer ${testJwt}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject({
        id: id,
        ...workoutExerciseSetData[0],
      });
    });
  });

  describe("Post /api/v1/workoutExerciseSet", () => {
    it("should create a new workoutExerciseSet", async () => {
      const user = await db.execute(
        sql`INSERT INTO users (clerk_user_id, email, display_name) VALUES ('553226', 'debrajohnson@gmail.com', 'Debra Johnson') RETURNING *`
      );
      const userId = user.rows[0].id as number;

      const routine = await db.execute(
        sql`INSERT INTO routines (user_id, name, description, created_at) VALUES (${userId}, 'Another Routine', 'Another new routine to start the day', NOW()) RETURNING *`
      );
      const routineId = routine.rows[0].id as number;

      const workout = await db.execute(
        sql`INSERT INTO workouts (routine_id, name, description, created_at) VALUES (${routineId}, 'Fun Workout', 'A fun workout to start the day', NOW()) RETURNING *`
      );
      const workoutId = workout.rows[0].id as number;

      const exercise = await db.execute(
        sql`INSERT INTO exercises (name, description) VALUES ('Squats', 'A classic squat to improve leg strength') RETURNING *`
      );
      const exerciseId = exercise.rows[0].id as number;

      const workoutExercise = await db.execute(
        sql`INSERT INTO "workoutExercises" (workout_id, exercise_id, order_index) VALUES (${workoutId}, ${exerciseId}, 1) RETURNING *`
      );
      const workoutExerciseId = workoutExercise.rows[0].id as number;

      const newWorkoutExerciseSet = {
        workout_exercise_id: workoutExerciseId,
        set_number: 4,
        repetitions: 15,
        weight: 100,
        weight_unit: "lbs",
        user_input: "15 reps at 100 lbs",
      };
      const response = await request(app)
        .post("/api/v1/workoutExerciseSet")
        .set("Authorization", `Bearer ${testJwt}`)
        .send(newWorkoutExerciseSet);
      expect(response.statusCode).toBe(201);

      console.log(response.body);

      const createdWorkoutExerciseSet = {
        id: response.body.set.id,
        ...newWorkoutExerciseSet,
      };
      expect(response.body.set).toMatchObject(createdWorkoutExerciseSet);
      id = response.body.set.id;
    });
  });

  describe("PATCH /api/v1/workoutExerciseSet/:id", () => {
    it("should update all items of a workoutExerciseSet", async () => {
      const updatedWorkoutExerciseSet = {
        set_number: 6,
        repetitions: 20,
        weight: 120,
        weight_unit: "kg",
        user_input: "20 reps at 120 lbs",
      };
      const response = await request(app)
        .patch(`/api/v1/workoutExerciseSet/${id}`)
        .set("Authorization", `Bearer ${testJwt}`)
        .send(updatedWorkoutExerciseSet);
      expect(response.statusCode).toBe(200);
      expect(response.body.set).toMatchObject({
        id: id,
        ...updatedWorkoutExerciseSet,
      });
    });

    it("should update some items of a workoutExerciseSet", async () => {
      const updatedWorkoutExerciseSet = {
        weight: 140,
      };
      const response = await request(app)
        .patch(`/api/v1/workoutExerciseSet/${id}`)
        .set("Authorization", `Bearer ${testJwt}`)
        .send(updatedWorkoutExerciseSet);
      expect(response.statusCode).toBe(200);
      expect(response.body.set).toMatchObject({
        id: id,
        set_number: 6,
        repetitions: 20,
        weight: 140,
        weight_unit: "kg",
        user_input: "20 reps at 120 lbs",
      });
    });

    it("should not update a workoutExerciseSet that does not exist", async () => {
      const updatedWorkoutExerciseSet = {
        set_number: 6,
        repetitions: 20,
        weight: 190,
        weight_unit: "kg",
        user_input: "20 reps at 120 lbs",
      };
      const response = await request(app)
        .patch(`/api/v1/workoutExerciseSet/123456789`)
        .set("Authorization", `Bearer ${testJwt}`)
        .send(updatedWorkoutExerciseSet);
      expect(response.statusCode).toBe(404);
    });
  });

  describe("DELETE /api/v1/workoutExerciseSet/:id", () => {
    it("should delete a workoutExerciseSet", async () => {
      const response = await request(app)
        .delete(`/api/v1/workoutExerciseSet/${id}`)
        .set("Authorization", `Bearer ${testJwt}`);
      expect(response.statusCode).toBe(204);
    });

    it("WorkoutExerciseSet should no longer exist after being deleted", async () => {
      const response = await request(app)
        .get(`/api/v1/workoutExerciseSet/${id}`)
        .set("Authorization", `Bearer ${testJwt}`);
      expect(response.statusCode).toBe(404);
    });

    it("should not delete a workoutExerciseSet that does not exist", async () => {
      const response = await request(app)
        .delete(`/api/v1/workoutExerciseSet/123456789`)
        .set("Authorization", `Bearer ${testJwt}`);
      expect(response.statusCode).toBe(404);
    });
  });
});
