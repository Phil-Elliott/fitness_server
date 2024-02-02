import request from "supertest";
import app from "../../src/app";
import { expect, describe, it, beforeAll, afterAll } from "vitest";
import setupExerciseTableForTestDatabase from "../../scripts/exercise/setupTests";
import teardownExerciseTableForTestDatabase from "../../scripts/exercise/teardownTests";

describe("Exercise Routes", () => {
  beforeAll(async () => {
    await setupExerciseTableForTestDatabase();
  });

  afterAll(async () => {
    await teardownExerciseTableForTestDatabase();
  });

  let id: string;
  const exerciseData = [
    {
      name: "Bench Press",
      description: "Lift the barbell from your chest to full extension",
    },
    {
      name: "Squat",
      description:
        "Lower your body until your thighs are parallel to the ground",
    },
    {
      name: "Deadlift",
      description: "Lift the barbell from the ground to full extension",
    },
  ];

  describe("GET /api/v1/exercise", () => {
    it("should return all exercises", async () => {
      const response = await request(app).get("/api/v1/exercise");
      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject(exerciseData);
      id = response.body[0].id;
    });
  });

  describe("GET /api/v1/exercise/:id", () => {
    it("should return a single exercise", async () => {
      const response = await request(app).get(`/api/v1/exercise/${id}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject({
        id: id,
        name: exerciseData[0].name,
        description: exerciseData[0].description,
      });
    });
  });

  describe("Post /api/v1/exercise", () => {
    it("should create a new exercise", async () => {
      const newExercise = {
        name: "Pull-up",
        description: "Lift your body up to the bar",
      };
      const response = await request(app)
        .post("/api/v1/exercise")
        .send(newExercise);
      expect(response.statusCode).toBe(201);

      const createdExercise = {
        id: response.body.exercise.id,
        ...newExercise,
      };
      expect(response.body.exercise).toMatchObject(createdExercise);
      id = response.body.exercise.id;
    });
  });

  describe("PATCH /api/v1/exercise/:id", () => {
    it("should update all items of an exercise", async () => {
      const updatedExercise = {
        name: "Pull-up",
        description: "Lift your body up to the bar and lower it back down",
      };
      const response = await request(app)
        .patch(`/api/v1/exercise/${id}`)
        .send(updatedExercise);
      expect(response.statusCode).toBe(200);
      expect(response.body.exercise).toMatchObject({
        id: id,
        name: updatedExercise.name,
        description: updatedExercise.description,
      });
    });

    it("should update some items of an exercise", async () => {
      const updatedExercise = {
        description: "Just lift your body up to the bar and lower it back down",
      };
      const response = await request(app)
        .patch(`/api/v1/exercise/${id}`)
        .send(updatedExercise);
      expect(response.statusCode).toBe(200);
      expect(response.body.exercise).toMatchObject({
        id: id,
        name: "Pull-up",
        description: updatedExercise.description,
      });
    });

    it("should not update an exercise that does not exist", async () => {
      const updatedExercise = {
        name: "Pull-up",
        description: "Lift your body up to the bar and lower it back down",
      };
      const response = await request(app)
        .patch(`/api/v1/exercise/123456789`)
        .send(updatedExercise);
      expect(response.statusCode).toBe(404);
    });
  });

  describe("DELETE /api/v1/exercise/:id", () => {
    it("should delete an exercise", async () => {
      const response = await request(app).delete(`/api/v1/exercise/${id}`);
      expect(response.statusCode).toBe(204);
    });

    it("exercise should no longer exist after being deleted", async () => {
      const response = await request(app).get(`/api/v1/exercise/${id}`);
      console.log(response.body, "response");
      expect(response.statusCode).toBe(404);
    });

    it("should not delete an exercise that does not exist", async () => {
      const response = await request(app).delete(`/api/v1/exercise/123456789`);
      expect(response.statusCode).toBe(404);
    });
  });
});
