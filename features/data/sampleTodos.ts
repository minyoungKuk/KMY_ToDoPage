import { Todo } from "@/types/todo";

export const sampleTodos: Todo[] = [
  {
    id: "todo-1",
    title: "기능 구현 시작",
    category: "요청",
    isCompleted: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "todo-2",
    title: "UI 디자인 수정",
    category: "진행중",
    isCompleted: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
