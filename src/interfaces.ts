import { IDefaultSearchingParams } from "./store";

export interface ITask {
  _id: string;
  status: string;
  owner: string;
  title: string;
  description: string;
  date: Date;
  created_at: Date;
  updated_at: Date;
  __v: number;
}

export interface IUser {
  _id: string;
  name: string;
  surname: string;
}

export interface IChangedUser {
  name: string;
  surname: string;
}

export type SortType =
  | "a-z"
  | "z-a"
  | "creation_date_oldest"
  | "creation_date_newest"
  | "completion_date_oldest"
  | "completion_date_newest"
  | null;

export type StatusType = "active" | "done" | null;

export type DateType = string | null;

export type SearchKey = keyof IDefaultSearchingParams;
export type SearchValue = SortType | DateType | string | StatusType;

