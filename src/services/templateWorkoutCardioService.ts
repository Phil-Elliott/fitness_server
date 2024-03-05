import * as templateWorkoutCardioDataAccess from "../dataAccess/templateWorkoutCardioDataAccess";
import {
  NewTemplateWorkoutCardio,
  TemplateWorkoutCardio,
} from "../types/templateWorkoutCardioTypes";

export const getAllTemplateWorkoutCardio = async (): Promise<
  TemplateWorkoutCardio[]
> => {
  return await templateWorkoutCardioDataAccess.getAllTemplateWorkoutCardio();
};

export const getTemplateWorkoutCardio = async (
  id: string
): Promise<TemplateWorkoutCardio> => {
  return await templateWorkoutCardioDataAccess.getTemplateWorkoutCardio(id);
};

export const createTemplateWorkoutCardio = async (
  templateWorkoutCardioData: NewTemplateWorkoutCardio
): Promise<TemplateWorkoutCardio> => {
  return await templateWorkoutCardioDataAccess.createTemplateWorkoutCardio(
    templateWorkoutCardioData
  );
};

export const updateTemplateWorkoutCardio = async (
  id: string,
  templateWorkoutCardioData: TemplateWorkoutCardio
): Promise<TemplateWorkoutCardio> => {
  return await templateWorkoutCardioDataAccess.updateTemplateWorkoutCardio(
    id,
    templateWorkoutCardioData
  );
};

export const deleteTemplateWorkoutCardio = async (
  id: string
): Promise<void> => {
  return await templateWorkoutCardioDataAccess.deleteTemplateWorkoutCardio(id);
};
