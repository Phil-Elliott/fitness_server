import * as cardioDataAccess from "../dataAccess/cardioDataAccess";
import { NewCardio, cardio } from "../types/cardioTypes";

export const getAllCardio = async (userId: string): Promise<cardio[]> => {
  return await cardioDataAccess.getAllCardio(userId);
};

export const getCardio = async (
  userId: string,
  cardioId: string
): Promise<cardio> => {
  return await cardioDataAccess.getCardio(userId, cardioId);
};

export const createCardio = async (
  userId: string,
  cardioData: NewCardio
): Promise<cardio> => {
  return await cardioDataAccess.createCardio(userId, cardioData);
};

export const updateCardio = async (
  userId: string,
  cardioData: cardio
): Promise<cardio> => {
  return await cardioDataAccess.updateCardio(userId, cardioData);
};

export const deleteCardio = async (
  userId: string,
  cardioId: string
): Promise<void> => {
  return await cardioDataAccess.deleteCardio(userId, cardioId);
};
