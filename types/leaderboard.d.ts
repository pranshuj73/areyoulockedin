import { FileType } from "./lang";

export interface LeaderboardEntry {
  userId: string;
  username: string;
  profilePictureUrl: string;
  totalTimeSpent: number;
  languages: FileType[];
}

