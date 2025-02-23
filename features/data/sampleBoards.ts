import { Board } from "@/types/board";

export const sampleBoards: Board[] = [
  {
    id: "board-1",
    name: "요청",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    todoIds: [],
  },
  {
    id: "board-2",
    name: "진행중",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    todoIds: [],
  },
  {
    id: "board-3",
    name: "완료",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    todoIds: [],
  },
  {
    id: "board-4",
    name: "지연",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    todoIds: [],
  },
];
