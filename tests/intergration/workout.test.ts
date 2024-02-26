import request from "supertest";
import app from "../../src/app";
import { expect, describe, it, beforeAll, afterAll, vi } from "vitest";
import setupWorkoutTableForTestDatabase from "../../scripts/workout/setupTests";
import teardownWorkoutTableForTestDatabase from "../../scripts/workout/teardownTests";
import { Request, Response, NextFunction } from "express";

vi.mock("@clerk/clerk-sdk-node", () => ({
  ClerkExpressRequireAuth:
    () => (req: Request, res: Response, next: NextFunction) => {
      req.auth = { userId: "user_12543" };
      next();
    },
}));

const testJwt = process.env.CLERK_TEST_JWT;

describe("Workout Routes", () => {
  beforeAll(async () => {
    await setupWorkoutTableForTestDatabase();
  });

  afterAll(async () => {
    await teardownWorkoutTableForTestDatabase();
  });

  let id: string;
  let routineId: string;
  const workoutData = [
    {
      user_id: "user_12543",
      name: "Morning Workout",
      notes: "A workout to start the day",
      workout_status: "incomplete",
    },
    {
      user_id: "user_12543",
      name: "Evening Workout",
      notes: "A workout to end the day",
      workout_status: "not_started",
    },
    {
      user_id: "user_12543",
      name: "Afternoon Workout",
      notes: "A workout to break up the day",
      workout_status: "finished",
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
      routineId = response.body[0].routine_id;
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
        notes: workoutData[0].notes,
      });
    });
  });

  describe("Post /api/v1/workout", () => {
    it("should create a new workout", async () => {
      const newWorkout = {
        user_id: "user_12543",
        routine_id: routineId,
        name: "Cool Workout",
        notes: "A Workout to do cool things",
        date: "2024-02-26",
        workout_status: "incomplete",
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
        notes: "A Workout to do new things",
      };
      const response = await request(app)
        .patch(`/api/v1/workout/${id}`)
        .set("Authorization", `Bearer ${testJwt}`)
        .send(updatedWorkout);
      expect(response.statusCode).toBe(200);
      expect(response.body.workout).toMatchObject({
        id: id,
        name: updatedWorkout.name,
        notes: updatedWorkout.notes,
      });
    });

    it("should update some items of a workout", async () => {
      const updatedWorkout = {
        notes: "Another Workout to do new things",
      };
      const response = await request(app)
        .patch(`/api/v1/workout/${id}`)
        .set("Authorization", `Bearer ${testJwt}`)
        .send(updatedWorkout);
      expect(response.statusCode).toBe(200);
      expect(response.body.workout).toMatchObject({
        id: id,
        name: "New Workout",
        notes: updatedWorkout.notes,
      });
    });

    it("should not update a workout that does not exist", async () => {
      const updatedWorkout = {
        name: "Terrific Workout",
        notes: "A Workout to do terrific things",
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

/*

Will need to create handlers to show workouts for a specific routine or a specific date and same with routines



*/
