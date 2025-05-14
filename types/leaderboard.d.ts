import { FileType } from "@/types/lang";

export interface LeaderboardEntry {
  userId: string;
  username: string;
  profilePictureUrl: string;
  totalTimeSpent: number;
  languages: FileType[];
}

export interface LeaderboardApiResponse {
  data: LeaderboardEntry[];
  totalHeartbeatsReceived: number;
}
