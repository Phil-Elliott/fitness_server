import request from "supertest";
import app from "../../src/app";
import { expect, describe, it, beforeAll, afterAll, vi } from "vitest";
import setupTemplateCardioTableForTestDatabase from "../../scripts/templateCardio/setupTests";
import teardownTemplateCardioTableForTestDatabase from "../../scripts/templateCardio/teardownTests";
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

describe("templateCardio Routes", () => {
  beforeAll(async () => {
    await setupTemplateCardioTableForTestDatabase();
  });

  afterAll(async () => {
    await teardownTemplateCardioTableForTestDatabase();
  });

  let id: string;
  let routineId: string;
  const templateCardioData = [
    {
      user_id: "user_12543",
      notes: "Have a good exercise and take it easy",
      template_cardio_status: "active",
      frequency: "biweekly",
      duration_type: "days",
      duration_value: 30,
    },
    {
      user_id: "user_12543",
      notes: "A cardio to break up the day",
      template_cardio_status: "inactive",
      frequency: "weekly",
      duration_type: "weeks",
      duration_value: 2,
    },
    {
      user_id: "user_12543",
      notes: "A cardio to end the day",
      template_cardio_status: "active",
      frequency: "monthly",
      duration_type: "months",
      duration_value: 1,
    },
  ];

  describe("GET /api/v1/templateCardio", () => {
    it("should return all templateCardio", async () => {
      const response = await request(app)
        .get("/api/v1/templateCardio")
        .set("Authorization", `Bearer ${testJwt}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject(templateCardioData);
      id = response.body[0].id;
      routineId = response.body[0].routine_id;
    });
  });

  describe("GET /api/v1/templateCardio/:id", () => {
    it("should return a single templateCardio", async () => {
      const response = await request(app)
        .get(`/api/v1/templateCardio/${id}`)
        .set("Authorization", `Bearer ${testJwt}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject({
        id: id,
        ...templateCardioData[0],
      });
    });
  });

  describe("Post /api/v1/templateCardio", () => {
    it("should create a new templateCardio", async () => {
      const templateCardioExercise = await db.execute(
        sql`INSERT INTO "cardioExercises" (name, description) VALUES ('Swim', 'Swim fast') RETURNING *;`
      );

      const cardioExerciseId = templateCardioExercise.rows[0].id;

      const newTemplateCardio = {
        user_id: "user_12543",
        routine_id: routineId,
        cardio_exercise_id: cardioExerciseId,
        notes: "A new templateCardio to do new things",
        template_cardio_status: "active",
        frequency: "biweekly",
        duration_type: "days",
        duration_value: 30,
      };
      const response = await request(app)
        .post("/api/v1/templateCardio")
        .set("Authorization", `Bearer ${testJwt}`)
        .send(newTemplateCardio);
      expect(response.statusCode).toBe(201);

      const createdTemplateCardio = {
        id: response.body.templateCardio.id,
        ...newTemplateCardio,
      };
      expect(response.body.templateCardio).toMatchObject(createdTemplateCardio);
      id = response.body.templateCardio.id;
    });
  });

  describe("PATCH /api/v1/templateCardio/:id", () => {
    it("should update all items of a templateCardio", async () => {
      const updatedTemplateCardio = {
        frequency: "monthly",
        duration_type: "weeks",
        duration_value: 2,
      };
      const response = await request(app)
        .patch(`/api/v1/templateCardio/${id}`)
        .set("Authorization", `Bearer ${testJwt}`)
        .send(updatedTemplateCardio);
      expect(response.statusCode).toBe(200);
      expect(response.body.templateCardio).toMatchObject({
        id: id,
        ...updatedTemplateCardio,
      });
    });

    it("should update some items of a templateCardio", async () => {
      const updatedTemplateCardio = {
        notes: "Another templateCardio to do new things",
      };
      const response = await request(app)
        .patch(`/api/v1/templateCardio/${id}`)
        .set("Authorization", `Bearer ${testJwt}`)
        .send(updatedTemplateCardio);
      expect(response.statusCode).toBe(200);
      expect(response.body.templateCardio).toMatchObject({
        id: id,
        frequency: "monthly",
        duration_type: "weeks",
        duration_value: 2,
        ...updatedTemplateCardio,
      });
    });

    it("should not update a templateCardio that does not exist", async () => {
      const updatedTemplateCardio = {
        notes: "Another templateCardio to do new things",
      };
      const response = await request(app)
        .patch(`/api/v1/templateCardio/123456789`)
        .set("Authorization", `Bearer ${testJwt}`)
        .send(updatedTemplateCardio);
      expect(response.statusCode).toBe(404);
    });
  });

  describe("DELETE /api/v1/templateCardio/:id", () => {
    it("should delete a templateCardio", async () => {
      const response = await request(app)
        .delete(`/api/v1/templateCardio/${id}`)
        .set("Authorization", `Bearer ${testJwt}`);
      expect(response.statusCode).toBe(204);
    });

    it("templateCardio should no longer exist after being deleted", async () => {
      const response = await request(app)
        .get(`/api/v1/templateCardio/${id}`)
        .set("Authorization", `Bearer ${testJwt}`);
      expect(response.statusCode).toBe(404);
    });

    it("should not delete a templateCardio that does not exist", async () => {
      const response = await request(app)
        .delete(`/api/v1/templateCardio/123456789`)
        .set("Authorization", `Bearer ${testJwt}`);
      expect(response.statusCode).toBe(404);
    });
  });
});
