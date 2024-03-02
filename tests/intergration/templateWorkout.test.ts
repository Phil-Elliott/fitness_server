import request from "supertest";
import app from "../../src/app";
import { expect, describe, it, beforeAll, afterAll, vi } from "vitest";
import setupTemplateWorkoutTableForTestDatabase from "../../scripts/templateWorkout/setupTests";
import teardownTemplateWorkoutTableForTestDatabase from "../../scripts/templateWorkout/teardownTests";
import { Request, Response, NextFunction } from "express";

vi.mock("@clerk/clerk-sdk-node", () => ({
  ClerkExpressRequireAuth:
    () => (req: Request, res: Response, next: NextFunction) => {
      req.auth = { userId: "user_12543" };
      next();
    },
}));

const testJwt = process.env.CLERK_TEST_JWT;

describe("TemplateWorkout Routes", () => {
  beforeAll(async () => {
    await setupTemplateWorkoutTableForTestDatabase();
  });

  afterAll(async () => {
    await teardownTemplateWorkoutTableForTestDatabase();
  });

  let id: string;
  let routineId: string;
  const templateWorkoutData = [
    {
      user_id: "user_12543",
      name: "Morning Workout",
      notes: "A workout to start the day",
      rest_between_exercises: 60,
      template_workout_status: "active",
      frequency: "daily",
      duration_type: "days",
      duration: 10,
    },
    {
      user_id: "user_12543",
      name: "Evening Workout",
      notes: "A workout to end the day",
      rest_between_exercises: 90,
      template_workout_status: "inactive",
      frequency: "monthly",
      duration_type: "weeks",
      duration: 2,
    },
    {
      user_id: "user_12543",
      name: "Afternoon Workout",
      notes: "A workout to break up the day",
      rest_between_exercises: 120,
      template_workout_status: "active",
      frequency: "weekly",
      duration_type: "months",
      duration: 4,
    },
  ];

  describe("GET /api/v1/templateWorkout", () => {
    it("should return all templateWorkouts", async () => {
      const response = await request(app)
        .get("/api/v1/templateWorkout")
        .set("Authorization", `Bearer ${testJwt}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject(templateWorkoutData);
      id = response.body[0].id;
      routineId = response.body[0].routine_id;
    });
  });

  describe("GET /api/v1/templateWorkout/:id", () => {
    it("should return a single templateWorkout", async () => {
      const response = await request(app)
        .get(`/api/v1/templateWorkout/${id}`)
        .set("Authorization", `Bearer ${testJwt}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject({
        id: id,
        ...templateWorkoutData[0],
      });
    });
  });

  describe("Post /api/v1/templateWorkout", () => {
    it("should create a new templateWorkout", async () => {
      const newTemplateWorkout = {
        user_id: "user_12543",
        routine_id: routineId,
        name: "Midday Workout",
        notes: "A workout to break up the day",
        rest_between_exercises: 120,
        template_workout_status: "active",
        frequency: "weekly",
        duration_type: "months",
        duration: 4,
      };
      const response = await request(app)
        .post("/api/v1/templateWorkout")
        .set("Authorization", `Bearer ${testJwt}`)
        .send(newTemplateWorkout);
      expect(response.statusCode).toBe(201);

      const createdTemplateWorkout = {
        id: response.body.templateWorkout.id,
        ...newTemplateWorkout,
      };
      expect(response.body.templateWorkout).toMatchObject(
        createdTemplateWorkout
      );
      id = response.body.templateWorkout.id;
    });
  });

  describe("PATCH /api/v1/templateWorkout/:id", () => {
    it("should update all items of a templateWorkout", async () => {
      const updatedTemplateWorkout = {
        name: "New templateWorkout",
        notes: "A templateWorkout to do new things",
        rest_between_exercises: 90,
        template_workout_status: "inactive",
        frequency: "monthly",
        duration_type: "weeks",
        duration: 2,
      };
      const response = await request(app)
        .patch(`/api/v1/templateWorkout/${id}`)
        .set("Authorization", `Bearer ${testJwt}`)
        .send(updatedTemplateWorkout);
      expect(response.statusCode).toBe(200);
      expect(response.body.templateWorkout).toMatchObject({
        id: id,
        ...updatedTemplateWorkout,
      });
    });

    it("should update some items of a TemplateWorkout", async () => {
      const updatedTemplateWorkout = {
        notes: "Another templateWorkout to do new things",
      };
      const response = await request(app)
        .patch(`/api/v1/templateWorkout/${id}`)
        .set("Authorization", `Bearer ${testJwt}`)
        .send(updatedTemplateWorkout);
      expect(response.statusCode).toBe(200);
      expect(response.body.templateWorkout).toMatchObject({
        id: id,
        name: "New templateWorkout",
        notes: updatedTemplateWorkout.notes,
        rest_between_exercises: 90,
        template_workout_status: "inactive",
        frequency: "monthly",
        duration_type: "weeks",
        duration: 2,
      });
    });

    it("should not update a TemplateWorkout that does not exist", async () => {
      const updatedTemplateWorkout = {
        name: "Terrific TemplateWorkout",
        notes: "A TemplateWorkout to do terrific things",
      };
      const response = await request(app)
        .patch(`/api/v1/templateWorkout/123456789`)
        .set("Authorization", `Bearer ${testJwt}`)
        .send(updatedTemplateWorkout);
      expect(response.statusCode).toBe(404);
    });
  });

  describe("DELETE /api/v1/templateWorkout/:id", () => {
    it("should delete a templateWorkout", async () => {
      const response = await request(app)
        .delete(`/api/v1/templateWorkout/${id}`)
        .set("Authorization", `Bearer ${testJwt}`);
      expect(response.statusCode).toBe(204);
    });

    it("TemplateWorkout should no longer exist after being deleted", async () => {
      const response = await request(app)
        .get(`/api/v1/templateWorkout/${id}`)
        .set("Authorization", `Bearer ${testJwt}`);
      expect(response.statusCode).toBe(404);
    });

    it("should not delete a TemplateWorkout that does not exist", async () => {
      const response = await request(app)
        .delete(`/api/v1/templateWorkout/123456789`)
        .set("Authorization", `Bearer ${testJwt}`);
      expect(response.statusCode).toBe(404);
    });
  });
});
