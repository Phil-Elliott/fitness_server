import request from "supertest";
import app from "../../src/app";
import { expect, describe, it, beforeAll, afterAll, vi } from "vitest";
import setupRoutineTableForTestDatabase from "../../scripts/routine/setupTests";
import teardownRoutineTableForTestDatabase from "../../scripts/routine/teardownTests";
import { Request, Response, NextFunction } from "express";

vi.mock("@clerk/clerk-sdk-node", () => ({
  ClerkExpressRequireAuth:
    () => (req: Request, res: Response, next: NextFunction) => {
      req.auth = { userId: "user_12543" };
      next();
    },
}));

const testJwt = process.env.CLERK_TEST_JWT;

describe("Routine Routes", () => {
  beforeAll(async () => {
    await setupRoutineTableForTestDatabase();
  });

  afterAll(async () => {
    await teardownRoutineTableForTestDatabase();
  });

  let id: string;
  const routineData = [
    {
      user_id: "user_12543",
      name: "Morning Routine",
      notes: "A routine to start the day",
      frequency: "daily",
      start_date: "2025-09-20",
      end_date: "2025-11-12",
    },
    {
      user_id: "user_12543",
      name: "Afternoon Routine",
      notes: "A routine for the middle of the day",
      frequency: "daily",
      start_date: "2026-02-08",
      end_date: "2026-04-18",
    },
    {
      user_id: "user_12543",
      name: "Evening Routine",
      notes: "A routine to end the day",
      frequency: "daily",
      start_date: "2024-03-02",
      end_date: "2024-05-03",
    },
  ];

  describe("GET /api/v1/routine", () => {
    it("should return all routines", async () => {
      const response = await request(app)
        .get("/api/v1/routine")
        .set("Authorization", `Bearer ${testJwt}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject(routineData);
      id = response.body[0].id;
    });
  });

  describe("GET /api/v1/routine/:id", () => {
    it("should return a single routine", async () => {
      const response = await request(app)
        .get(`/api/v1/routine/${id}`)
        .set("Authorization", `Bearer ${testJwt}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject({
        id: id,
        ...routineData[0],
      });
    });
  });

  describe("Post /api/v1/routine", () => {
    it("should create a new routine", async () => {
      const newRoutine = {
        name: "Cool routine",
        notes: "A routine to do cool things",
        frequency: "daily",
        start_date: "2025-09-20",
        end_date: "2025-11-12",
      };
      const response = await request(app)
        .post("/api/v1/routine")
        .set("Authorization", `Bearer ${testJwt}`)
        .send(newRoutine);
      expect(response.statusCode).toBe(201);

      const createdRoutine = {
        id: response.body.routine.id,
        name: "Cool routine",
        notes: "A routine to do cool things",
        frequency: "daily",
        start_date: response.body.routine.start_date,
        end_date: response.body.routine.end_date,
      };
      expect(response.body.routine).toMatchObject(createdRoutine);
      id = response.body.routine.id;
    });
  });

  describe("PATCH /api/v1/routine/:id", () => {
    it("should update all items of a routine", async () => {
      const updatedRoutine = {
        name: "New routine",
        notes: "A routine to do new things",
        frequency: "weekly",
        start_date: new Date("2025-09-22"),
        end_date: new Date("2026-12-12"),
      };
      const response = await request(app)
        .patch(`/api/v1/routine/${id}`)
        .set("Authorization", `Bearer ${testJwt}`)
        .send(updatedRoutine);
      expect(response.statusCode).toBe(200);
      expect(response.body.routine).toMatchObject({
        id: id,
        name: "New routine",
        notes: "A routine to do new things",
        frequency: "weekly",
      });
    });

    it("should update some items of a routine", async () => {
      const updatedRoutine = {
        notes: "Another routine to do new things",
      };
      const response = await request(app)
        .patch(`/api/v1/routine/${id}`)
        .set("Authorization", `Bearer ${testJwt}`)
        .send(updatedRoutine);
      expect(response.statusCode).toBe(200);
      expect(response.body.routine).toMatchObject({
        id: id,
        name: "New routine",
        notes: updatedRoutine.notes,
      });
    });

    it("should not update a routine that does not exist", async () => {
      const updatedRoutine = {
        name: "Terrific routine",
        description: "A routine to do terrific things",
      };
      const response = await request(app)
        .patch(`/api/v1/routine/1234561789`)
        .set("Authorization", `Bearer ${testJwt}`)
        .send(updatedRoutine);
      expect(response.statusCode).toBe(404);
    });
  });

  describe("DELETE /api/v1/routine/:id", () => {
    it("should delete a routine", async () => {
      const response = await request(app)
        .delete(`/api/v1/routine/${id}`)
        .set("Authorization", `Bearer ${testJwt}`);
      expect(response.statusCode).toBe(204);
    });

    it("routine should no longer exist after being deleted", async () => {
      const response = await request(app)
        .get(`/api/v1/routine/${id}`)
        .set("Authorization", `Bearer ${testJwt}`);
      expect(response.statusCode).toBe(404);
    });

    it("should not delete a routine that does not exist", async () => {
      const response = await request(app)
        .delete(`/api/v1/routine/123456789`)
        .set("Authorization", `Bearer ${testJwt}`);
      expect(response.statusCode).toBe(404);
    });
  });
});
