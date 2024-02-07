import request from "supertest";
import app from "../../src/app";
import { expect, describe, it, beforeAll, afterAll } from "vitest";
import setupRoutineTableForTestDatabase from "../../scripts/routine/setupTests";
import teardownRoutineTableForTestDatabase from "../../scripts/routine/teardownTests";
import db from "../../src/database/setup";
import { sql } from "drizzle-orm";

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
      name: "Morning Routine",
      description: "A routine to start the day",
    },
    {
      name: "Evening Routine",
      description: "A routine to end the day",
    },
    {
      name: "Afternoon Routine",
      description: "A routine to break up the day",
    },
  ];

  describe("GET /api/v1/routine", () => {
    it("should return all Routines", async () => {
      const response = await request(app).get("/api/v1/routine");
      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject(routineData);
      id = response.body[0].id;
    });
  });

  describe("GET /api/v1/routine/:id", () => {
    it("should return a single Routine", async () => {
      const response = await request(app).get(`/api/v1/routine/${id}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject({
        id: id,
        name: routineData[0].name,
        description: routineData[0].description,
      });
    });
  });

  describe("Post /api/v1/routine", () => {
    it("should create a new routine", async () => {
      let user = await db.execute(
        sql`INSERT INTO users (clerk_user_id, email, display_name) VALUES ('73543', 'matStone@gmail.com', 'Mat Stone') RETURNING *`
      );

      const newRoutine = {
        user_id: user.rows[0].id,
        name: "Cool routine",
        description: "A routine to do cool things",
      };
      const response = await request(app)
        .post("/api/v1/routine")
        .send(newRoutine);
      expect(response.statusCode).toBe(201);

      const createdRoutine = {
        id: response.body.routine.id,
        ...newRoutine,
      };
      expect(response.body.routine).toMatchObject(createdRoutine);
      id = response.body.routine.id;
    });
  });

  describe("PATCH /api/v1/routine/:id", () => {
    it("should update all items of a routine", async () => {
      const updatedRoutine = {
        name: "New routine",
        description: "A routine to do new things",
      };
      const response = await request(app)
        .patch(`/api/v1/Routine/${id}`)
        .send(updatedRoutine);
      expect(response.statusCode).toBe(200);
      expect(response.body.routine).toMatchObject({
        id: id,
        name: updatedRoutine.name,
        description: updatedRoutine.description,
      });
    });

    it("should update some items of a routine", async () => {
      const updatedRoutine = {
        description: "Another routine to do new things",
      };
      const response = await request(app)
        .patch(`/api/v1/routine/${id}`)
        .send(updatedRoutine);
      expect(response.statusCode).toBe(200);
      expect(response.body.routine).toMatchObject({
        id: id,
        name: "New routine",
        description: updatedRoutine.description,
      });
    });

    it("should not update a routine that does not exist", async () => {
      const updatedRoutine = {
        name: "Terrific routine",
        description: "A routine to do terrific things",
      };
      const response = await request(app)
        .patch(`/api/v1/routine/123456789`)
        .send(updatedRoutine);
      expect(response.statusCode).toBe(404);
    });
  });

  describe("DELETE /api/v1/routine/:id", () => {
    it("should delete a routine", async () => {
      const response = await request(app).delete(`/api/v1/routine/${id}`);
      expect(response.statusCode).toBe(204);
    });

    it("routine should no longer exist after being deleted", async () => {
      const response = await request(app).get(`/api/v1/routine/${id}`);
      expect(response.statusCode).toBe(404);
    });

    it("should not delete a routine that does not exist", async () => {
      const response = await request(app).delete(`/api/v1/routine/123456789`);
      expect(response.statusCode).toBe(404);
    });
  });
});
