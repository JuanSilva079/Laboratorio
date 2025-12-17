
import { GoogleGenAI } from "@google/genai";
import { TECHNIQUES } from "./constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getFeedback(missionDescription: string, selectedName: string, isCorrect: boolean): Promise<string> {
  // En esta versión simplificada, el feedback es directo en el cliente para mayor velocidad.
  // Pero mantenemos la estructura por si se quiere expandir.
  return isCorrect ? "¡Excelente!" : "Sigue practicando.";
}

// Nota: generateMission ya no es necesario para la versión simplificada pero se mantiene la firma
// por compatibilidad si fuera necesario.
export async function generateMission(level: number): Promise<any> {
  return null;
}
