import { Board } from "@/types/board";
import { Todo } from "@/types/todo";
import { useEffect } from "react";
import { create } from "zustand";
import { sampleBoards } from "../data/sampleBoards";

interface BoardStore {
  boards: Board[];
  todos: Todo[];
  setBoards: (boards: Board[]) => void;
  setTodos: (todos: Todo[]) => void;
  addTodo: (todo: Omit<Todo, "id" | "createdAt" | "updatedAt">) => void;
  reorderBoard: (sourceIndex: number, destinationIndex: number) => void;
  reorderTodo: (
    boardId: string,
    sourceIndex: number,
    destinationIndex: number
  ) => void;
  moveTodo: (
    sourceBoardId: string,
    destinationBoardId: string,
    sourceIndex: number,
    destinationIndex: number
  ) => void;

  updateTodo: (id: string, updatedFields: Partial<Todo>) => void;
  deleteTodo: (id: string) => void;
}

export const useBoardStore = create<BoardStore>((set) => ({
  boards: JSON.parse(localStorage.getItem("boards") || "null") || sampleBoards,
  todos: JSON.parse(localStorage.getItem("todos") || "[]"),

  setBoards: (boards) => {
    set({ boards });
    localStorage.setItem("boards", JSON.stringify(boards));
  },

  setTodos: (todos) => {
    set({ todos });
    localStorage.setItem("todos", JSON.stringify(todos));
  },

  addTodo: (newTodo) => {
    const today = new Date().toISOString();
    const todoWithDefaults: Todo = {
      id: crypto.randomUUID(),
      createdAt: today,
      updatedAt: today,
      title: newTodo.title,
      category: newTodo.category || "진행중",
      tag: newTodo.tag,
      memo: newTodo.memo,
      startDate: newTodo.startDate || today,
      dueDate: newTodo.dueDate || newTodo.startDate || today,
      isCompleted: newTodo.isCompleted || false,
      priority: newTodo.priority,
      isFavorite: newTodo.isFavorite || false,
      subTasks: newTodo.subTasks || [],
    };
    set((state) => {
      const updatedTodos = [...state.todos, todoWithDefaults];
      const updatedBoards = state.boards.map((board) =>
        board.name === todoWithDefaults.category
          ? { ...board, todoIds: [...board.todoIds, todoWithDefaults.id] }
          : board
      );
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      localStorage.setItem("boards", JSON.stringify(updatedBoards));

      return { todos: updatedTodos, boards: updatedBoards };
    });
  },

  reorderBoard: (sourceIndex, destinationIndex) => {
    set((state) => {
      const updatedBoards = [...state.boards];
      const [movedBoard] = updatedBoards.splice(sourceIndex, 1);
      updatedBoards.splice(destinationIndex, 0, movedBoard);
      localStorage.setItem("boards", JSON.stringify(updatedBoards));
      return { boards: updatedBoards };
    });
  },

  reorderTodo: (boardId, sourceIndex, destinationIndex) => {
    set((state) => {
      const board = state.boards.find((b) => b.id === boardId);
      if (!board) return state;

      const updatedTodoIds = [...board.todoIds];
      const [movedTodoId] = updatedTodoIds.splice(sourceIndex, 1);
      updatedTodoIds.splice(destinationIndex, 0, movedTodoId);

      const updatedBoards = state.boards.map((b) =>
        b.id === boardId ? { ...b, todoIds: updatedTodoIds } : b
      );
      const updatedTodos = updatedTodoIds
        .map((id) => state.todos.find((todo) => todo.id === id))
        .filter(Boolean) as Todo[];

      localStorage.setItem("boards", JSON.stringify(updatedBoards));
      localStorage.setItem("todos", JSON.stringify(updatedTodos));

      return { boards: updatedBoards, todos: updatedTodos };
    });
  },

  moveTodo: (
    sourceBoardId,
    destinationBoardId,
    sourceIndex,
    destinationIndex
  ) => {
    set((state) => {
      const sourceBoard = state.boards.find((b) => b.id === sourceBoardId);
      const destinationBoard = state.boards.find(
        (b) => b.id === destinationBoardId
      );
      if (!sourceBoard || !destinationBoard) return state;

      const updatedSourceTodoIds = [...sourceBoard.todoIds];
      const [movedTodoId] = updatedSourceTodoIds.splice(sourceIndex, 1);

      const updatedDestinationTodoIds = [...destinationBoard.todoIds];
      updatedDestinationTodoIds.splice(destinationIndex, 0, movedTodoId);

      const updatedBoards = state.boards.map((b) =>
        b.id === sourceBoardId
          ? { ...b, todoIds: updatedSourceTodoIds }
          : b.id === destinationBoardId
          ? { ...b, todoIds: updatedDestinationTodoIds }
          : b
      );

      localStorage.setItem("boards", JSON.stringify(updatedBoards));
      return { boards: updatedBoards };
    });
  },

  updateTodo: (id, updatedFields) => {
    set((state) => {
      const updatedTodos = state.todos.map((todo) =>
        todo.id === id
          ? { ...todo, ...updatedFields, updatedAt: new Date().toISOString() }
          : todo
      );
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return { todos: updatedTodos };
    });
  },

  deleteTodo: (id) => {
    set((state) => {
      const updatedTodos = state.todos.filter((todo) => todo.id !== id);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return { todos: updatedTodos };
    });
  },
}));

// 마운트 시 로컬스토리지에서 데이터 불러오기
export const useLoadStoredData = () => {
  const { setBoards, setTodos } = useBoardStore();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedBoards = JSON.parse(localStorage.getItem("boards") || "null");
      const storedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
      if (storedBoards) setBoards(storedBoards);
      if (storedTodos) setTodos(storedTodos);
    }
  }, [setBoards, setTodos]);
};
