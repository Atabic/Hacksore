import { STATE_COLORS } from "../components/aboutMe";
import { Activity } from "./activities";

export type Status = keyof typeof STATE_COLORS;

export interface Profile {
  status: Status;
  avatarHash: string;
  userId: string;
  activities: Activity[];
  streaming: boolean;
}
