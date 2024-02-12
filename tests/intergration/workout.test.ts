import request from "supertest";
import app from "../../src/app";
import { expect, describe, it, beforeAll, afterAll } from "vitest";
import setupWorkoutTableForTestDatabase from "../../scripts/workout/setupTests";
import teardownWorkoutTableForTestDatabase from "../../scripts/workout/teardownTests";
import db from "../../src/database/setup";
import { sql } from "drizzle-orm";

const testJwt = process.env.CLERK_TEST_JWT;

describe("Workout Routes", () => {
  beforeAll(async () => {
    await setupWorkoutTableForTestDatabase();
  });

  afterAll(async () => {
    await teardownWorkoutTableForTestDatabase();
  });

  let id: string;
  const workoutData = [
    {
      name: "Morning Workout",
      description: "A workout to start the day",
    },
    {
      name: "Evening Workout",
      description: "A workout to end the day",
    },
    {
      name: "Afternoon Workout",
      description: "A workout to break up the day",
    },
  ];

  describe("GET /api/v1/workout", () => {
    it("should return all workouts", async () => {
      const response = await request(app)
        .get("/api/v1/workout")
        .set("Authorization", `Bearer ${testJwt}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject(workoutData);
      id = response.body[0].id;
    });
  });

  describe("GET /api/v1/workout/:id", () => {
    it("should return a single workout", async () => {
      const response = await request(app)
        .get(`/api/v1/workout/${id}`)
        .set("Authorization", `Bearer ${testJwt}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject({
        id: id,
        name: workoutData[0].name,
        description: workoutData[0].description,
      });
    });
  });

  describe("Post /api/v1/workout", () => {
    it("should create a new workout", async () => {
      const user = await db.execute(
        sql`INSERT INTO users (clerk_user_id, email, display_name) VALUES ('3244343', 'BobThomas@gmail.com', 'Bob Thomas') RETURNING *`
      );
      const userId = user.rows[0].id as number;

      const routine = await db.execute(
        sql`INSERT INTO routines (user_id, name, description, created_at) VALUES (${userId}, 'Created Routine', 'A new routine created to start the day', NOW()) RETURNING *`
      );
      const routineId = routine.rows[0].id as number;

      const newWorkout = {
        routine_id: routineId,
        name: "Cool Workout",
        description: "A Workout to do cool things",
      };
      const response = await request(app)
        .post("/api/v1/workout")
        .set("Authorization", `Bearer ${testJwt}`)
        .send(newWorkout);
      expect(response.statusCode).toBe(201);

      const createdWorkout = {
        id: response.body.workout.id,
        ...newWorkout,
      };
      expect(response.body.workout).toMatchObject(createdWorkout);
      id = response.body.workout.id;
    });
  });

  describe("PATCH /api/v1/workout/:id", () => {
    it("should update all items of a workout", async () => {
      const updatedWorkout = {
        name: "New Workout",
        description: "A Workout to do new things",
      };
      const response = await request(app)
        .patch(`/api/v1/workout/${id}`)
        .set("Authorization", `Bearer ${testJwt}`)
        .send(updatedWorkout);
      expect(response.statusCode).toBe(200);
      expect(response.body.workout).toMatchObject({
        id: id,
        name: updatedWorkout.name,
        description: updatedWorkout.description,
      });
    });

    it("should update some items of a workout", async () => {
      const updatedWorkout = {
        description: "Another Workout to do new things",
      };
      const response = await request(app)
        .patch(`/api/v1/workout/${id}`)
        .set("Authorization", `Bearer ${testJwt}`)
        .send(updatedWorkout);
      expect(response.statusCode).toBe(200);
      expect(response.body.workout).toMatchObject({
        id: id,
        name: "New Workout",
        description: updatedWorkout.description,
      });
    });

    it("should not update a workout that does not exist", async () => {
      const updatedWorkout = {
        name: "Terrific Workout",
        description: "A Workout to do terrific things",
      };
      const response = await request(app)
        .patch(`/api/v1/workout/123456789`)
        .set("Authorization", `Bearer ${testJwt}`)
        .send(updatedWorkout);
      expect(response.statusCode).toBe(404);
    });
  });

  describe("DELETE /api/v1/workout/:id", () => {
    it("should delete a workout", async () => {
      const response = await request(app)
        .delete(`/api/v1/workout/${id}`)
        .set("Authorization", `Bearer ${testJwt}`);
      expect(response.statusCode).toBe(204);
    });

    it("Workout should no longer exist after being deleted", async () => {
      const response = await request(app)
        .get(`/api/v1/workout/${id}`)
        .set("Authorization", `Bearer ${testJwt}`);
      expect(response.statusCode).toBe(404);
    });

    it("should not delete a workout that does not exist", async () => {
      const response = await request(app)
        .delete(`/api/v1/workout/123456789`)
        .set("Authorization", `Bearer ${testJwt}`);
      expect(response.statusCode).toBe(404);
    });
  });
});
