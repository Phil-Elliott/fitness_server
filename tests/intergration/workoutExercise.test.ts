import request from "supertest";
import app from "../../src/app";
import { expect, describe, it, beforeAll, afterAll } from "vitest";
import setupWorkoutExerciseTableForTestDatabase from "../../scripts/workoutExercise/setupTests";
import teardownWorkoutExerciseTableForTestDatabase from "../../scripts/workoutExercise/teardownTests";
import db from "../../src/database/setup";
import { sql } from "drizzle-orm";

describe("WorkoutExercise Routes", () => {
  beforeAll(async () => {
    await setupWorkoutExerciseTableForTestDatabase();
  });

  afterAll(async () => {
    await teardownWorkoutExerciseTableForTestDatabase();
  });

  let id: string;
  const workoutExerciseData = [
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

  describe("GET /api/v1/workoutExercise", () => {
    it("should return all workoutExercises", async () => {
      const response = await request(app).get("/api/v1/workoutExercise");
      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject(workoutExerciseData);
      id = response.body[0].id;
    });
  });

  describe("GET /api/v1/workoutExercise/:id", () => {
    it("should return a single workoutExercise", async () => {
      const response = await request(app).get(`/api/v1/workoutExercise/${id}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject({
        id: id,
        order_index: workoutExerciseData[0].order_index,
      });
    });
  });

  describe("Post /api/v1/workoutExercise", () => {
    it("should create a new workoutExercise", async () => {
      const user = await db.execute(
        sql`INSERT INTO users (clerk_user_id, email, display_name) VALUES ('3244343', 'BobThomas@gmail.com', 'Bob Thomas') RETURNING *`
      );
      const userId = user.rows[0].id as number;

      const routine = await db.execute(
        sql`INSERT INTO routines (user_id, name, description, created_at) VALUES (${userId}, 'Created Routine', 'A new routine created to start the day', NOW()) RETURNING *`
      );
      const routineId = routine.rows[0].id as number;

      const workout = await db.execute(
        sql`INSERT INTO workouts (routine_id, name, description, created_at) VALUES (${routineId}, 'Awesome Workout', 'A workout to start the day', NOW()) RETURNING *`
      );
      const workoutId = workout.rows[0].id as number;

      const exercise = await db.execute(
        sql`INSERT INTO exercises (name, description) VALUES ('Awesome Push Ups', 'An awesome exercise to build upper body strength') RETURNING *`
      );
      const exerciseId = exercise.rows[0].id as number;

      const newWorkoutExercise = {
        workout_id: workoutId,
        exercise_id: exerciseId,
        order_index: 1,
      };
      const response = await request(app)
        .post("/api/v1/workoutExercise")
        .send(newWorkoutExercise);
      expect(response.statusCode).toBe(201);

      const createdWorkoutExercise = {
        id: response.body.workoutExercise.id,
        ...newWorkoutExercise,
      };
      expect(response.body.workoutExercise).toMatchObject(
        createdWorkoutExercise
      );
      id = response.body.workoutExercise.id;
    });
  });

  describe("PATCH /api/v1/workoutExercise/:id", () => {
    it("should update the order index of a workoutExercise", async () => {
      const updatedWorkoutExercise = {
        order_index: 2,
      };
      const response = await request(app)
        .patch(`/api/v1/workoutExercise/${id}`)
        .send(updatedWorkoutExercise);
      expect(response.statusCode).toBe(200);
      expect(response.body.workoutExercise).toMatchObject({
        id: id,
        order_index: updatedWorkoutExercise.order_index,
      });
    });

    it("should not update a workoutExercise that does not exist", async () => {
      const updatedWorkoutExercise = {
        order_index: 3,
      };
      const response = await request(app)
        .patch(`/api/v1/workoutExercise/123456789`)
        .send(updatedWorkoutExercise);
      expect(response.statusCode).toBe(404);
    });
  });

  describe("DELETE /api/v1/workoutExercise/:id", () => {
    it("should delete a workoutExercise", async () => {
      const response = await request(app).delete(
        `/api/v1/workoutExercise/${id}`
      );
      expect(response.statusCode).toBe(204);
    });

    it("WorkoutExercise should no longer exist after being deleted", async () => {
      const response = await request(app).get(`/api/v1/workoutExercise/${id}`);
      expect(response.statusCode).toBe(404);
    });

    it("should not delete a workoutExercise that does not exist", async () => {
      const response = await request(app).delete(
        `/api/v1/workoutExercise/123456789`
      );
      expect(response.statusCode).toBe(404);
    });
  });
});
