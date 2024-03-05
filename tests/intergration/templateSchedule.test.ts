import request from "supertest";
import app from "../../src/app";
import { expect, describe, it, beforeAll, afterAll } from "vitest";
import setupTemplateScheduleTableForTestDatabase from "../../scripts/templateSchedule/setupTests";
import teardownTemplateScheduleTableForTestDatabase from "../../scripts/templateSchedule/teardownTests";
import { sql } from "drizzle-orm";
import db from "../../src/database/setup";

const testJwt = process.env.CLERK_TEST_JWT;

describe("templateSchedule Routes", () => {
  beforeAll(async () => {
    await setupTemplateScheduleTableForTestDatabase();
  });

  afterAll(async () => {
    await teardownTemplateScheduleTableForTestDatabase();
  });

  let id: string;
  const templateScheduleData = [
    {
      day_of_week: "Day1",
      start_time: "08:00:00+08",
      end_time: "09:00:00+08",
    },
    {
      day_of_week: "Day2",
      start_time: "08:00:00+08",
      end_time: "09:00:00+08",
    },
    {
      day_of_week: "Day3",
      start_time: "08:00:00+08",
      end_time: "09:00:00+08",
    },
  ];

  describe("GET /api/v1/templateSchedule", () => {
    it("should return all templateSchedules", async () => {
      const response = await request(app)
        .get("/api/v1/templateSchedule")
        .set("Authorization", `Bearer ${testJwt}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject(templateScheduleData);
      id = response.body[0].id;
    });
  });

  describe("GET /api/v1/templateSchedule/:id", () => {
    it("should return a single templateSchedule", async () => {
      const response = await request(app)
        .get(`/api/v1/templateSchedule/${id}`)
        .set("Authorization", `Bearer ${testJwt}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject({
        id: id,
        ...templateScheduleData[0],
      });
    });
  });

  describe("Post /api/v1/templateSchedule", () => {
    it("should create a new templateSchedule", async () => {
      const cardioExercise = await db.execute(
        sql`INSERT INTO "cardioExercises" (name, description) VALUES ('Jog', 'Jog fast') RETURNING *;`
      );

      const cardioExerciseId = cardioExercise.rows[0].id;

      const templateCardio = await db.execute(
        sql`INSERT INTO "templateCardio" (user_id, cardio_exercise_id, notes, template_cardio_status, frequency, duration_type, duration_value) VALUES ('user_12543', ${cardioExerciseId}, 'Jog a lot', 'active', 'weekly', 'days', 30) RETURNING *;`
      );

      const templateCardioId = templateCardio.rows[0].id;

      const newTemplateSchedule = {
        template_cardio_id: templateCardioId,
        day_of_week: "Day4",
        start_time: "08:00:00+08",
        end_time: "09:00:00+08",
      };
      const response = await request(app)
        .post("/api/v1/templateSchedule")
        .set("Authorization", `Bearer ${testJwt}`)
        .send(newTemplateSchedule);
      expect(response.statusCode).toBe(201);

      const createdTemplateSchedule = {
        id: response.body.templateSchedule.id,
        ...newTemplateSchedule,
      };
      expect(response.body.templateSchedule).toMatchObject(
        createdTemplateSchedule
      );
      id = response.body.templateSchedule.id;
    });
  });

  describe("PATCH /api/v1/templateSchedule/:id", () => {
    it("should update all items of an templateSchedule", async () => {
      const updatedTemplateSchedule = {
        day_of_week: "Day6",
        start_time: "11:00:00+08",
        end_time: "11:30:00+08",
      };
      const response = await request(app)
        .patch(`/api/v1/templateSchedule/${id}`)
        .set("Authorization", `Bearer ${testJwt}`)
        .send(updatedTemplateSchedule);
      expect(response.statusCode).toBe(200);
      expect(response.body.templateSchedule).toMatchObject({
        id: id,
        ...updatedTemplateSchedule,
      });
    });

    it("should update some items of an templateSchedule", async () => {
      const updatedTemplateSchedule = {
        day_of_week: "Day7",
      };
      const response = await request(app)
        .patch(`/api/v1/templateSchedule/${id}`)
        .set("Authorization", `Bearer ${testJwt}`)
        .send(updatedTemplateSchedule);
      expect(response.statusCode).toBe(200);
      expect(response.body.templateSchedule).toMatchObject({
        id: id,
        ...updatedTemplateSchedule,
      });
    });

    it("should not update an templateSchedule that does not exist", async () => {
      const updatedTemplateSchedule = {
        name: "Pull-up",
        description: "Lift your body up to the bar and lower it back down",
      };
      const response = await request(app)
        .patch(`/api/v1/templateSchedule/123456789`)
        .set("Authorization", `Bearer ${testJwt}`)
        .send(updatedTemplateSchedule);
      expect(response.statusCode).toBe(404);
    });
  });

  describe("DELETE /api/v1/templateSchedule/:id", () => {
    it("should delete an templateSchedule", async () => {
      const response = await request(app)
        .delete(`/api/v1/templateSchedule/${id}`)
        .set("Authorization", `Bearer ${testJwt}`);
      expect(response.statusCode).toBe(204);
    });

    it("templateSchedule should no longer exist after being deleted", async () => {
      const response = await request(app)
        .get(`/api/v1/templateSchedule/${id}`)
        .set("Authorization", `Bearer ${testJwt}`);
      expect(response.statusCode).toBe(404);
    });

    it("should not delete an templateSchedule that does not exist", async () => {
      const response = await request(app)
        .delete(`/api/v1/templateSchedule/123456789`)
        .set("Authorization", `Bearer ${testJwt}`);
      expect(response.statusCode).toBe(404);
    });
  });
});
