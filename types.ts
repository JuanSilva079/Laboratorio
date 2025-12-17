
export type TechniqueId = 
  | 'filtracion' 
  | 'tamizado' 
  | 'decantacion' 
  | 'extraccion_sl' 
  | 'sedimentacion' 
  | 'flotacion' 
  | 'separacion_magnetica' 
  | 'cristalizacion' 
  | 'absorcion_adsorcion' 
  | 'destilacion' 
  | 'extraccion_ll';

export interface Technique {
  id: TechniqueId;
  name: string;
  definition: string;
  keywords: string[];
  icon: string;
}

export interface Mission {
  title: string;
  description: string;
  correctTechniqueId: TechniqueId;
  hint: string;
}

export interface GameState {
  score: number;
  level: number;
  currentMission: Mission | null;
  history: { mission: Mission; success: boolean }[];
  isGameOver: boolean;
}
