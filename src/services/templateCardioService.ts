import * as templateCardioDataAccess from "../dataAccess/templateCardioDataAccess";
import {
  NewTemplateCardio,
  TemplateCardio,
} from "../types/templateCardioTypes";

export const getAllTemplateCardio = async (
  userId: string
): Promise<TemplateCardio[]> => {
  return await templateCardioDataAccess.getAllTemplateCardio(userId);
};

export const getTemplateCardio = async (
  userId: string,
  templateCardioId: string
): Promise<TemplateCardio> => {
  return await templateCardioDataAccess.getTemplateCardio(
    userId,
    templateCardioId
  );
};

export const createTemplateCardio = async (
  userId: string,
  templateCardioData: NewTemplateCardio
): Promise<TemplateCardio> => {
  return await templateCardioDataAccess.createTemplateCardio(
    userId,
    templateCardioData
  );
};

export const updateTemplateCardio = async (
  userId: string,
  templateCardioData: TemplateCardio
): Promise<TemplateCardio> => {
  return await templateCardioDataAccess.updateTemplateCardio(
    userId,
    templateCardioData
  );
};

export const deleteTemplateCardio = async (
  userId: string,
  templateCardioId: string
): Promise<void> => {
  return await templateCardioDataAccess.deleteTemplateCardio(
    userId,
    templateCardioId
  );
};
