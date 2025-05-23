export interface LightsaberOption {
  LightsaberOptionId: string;
  color: string;
  meaning: string;
  description: string;
}

export interface LightsaberSelection {
  userId: string;
  LightsaberSelectionId: string;
  color: string;
  createdAt: number;
} 