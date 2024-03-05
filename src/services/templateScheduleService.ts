import * as templateScheduleDataAccess from "../dataAccess/templateScheduleDataAccess";
import { TemplateSchedule } from "../types/templateScheduleTypes";

export const getAllTemplateSchedules = async (): Promise<
  TemplateSchedule[]
> => {
  return await templateScheduleDataAccess.getAllTemplateSchedules();
};

export const getTemplateSchedule = async (
  id: string
): Promise<TemplateSchedule> => {
  return await templateScheduleDataAccess.getTemplateSchedule(id);
};

export const createTemplateSchedule = async (
  templateScheduleData: TemplateSchedule
): Promise<TemplateSchedule> => {
  return await templateScheduleDataAccess.createTemplateSchedule(
    templateScheduleData
  );
};

export const updateTemplateSchedule = async (
  id: string,
  templateScheduleData: TemplateSchedule
): Promise<TemplateSchedule> => {
  return await templateScheduleDataAccess.updateTemplateSchedule(
    id,
    templateScheduleData
  );
};

export const deleteTemplateSchedule = async (id: string): Promise<void> => {
  return await templateScheduleDataAccess.deleteTemplateSchedule(id);
};
