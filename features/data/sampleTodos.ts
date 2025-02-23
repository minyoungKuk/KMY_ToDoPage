import { Todo } from "@/types/todo";

export const sampleTodos: Todo[] = [
  {
    id: crypto.randomUUID(),
    title: "기능 구현 시작",
    priority: 1,
    category: "요청",
    isCompleted: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    title: "UI 디자인 수정",
    category: "진행중",
    isCompleted: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    title: "스터디 참여",
    category: "진행중",
    isCompleted: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
