export enum Status {
  todo = "Todo",
  inProgress = "In-Progress",
  done = "Done",
}

export interface Task {
  id: string;
  title: string;
  status: Status;
  createdAt: string; // ISO string
}
