"use client";

import { useBoardStore } from "@/features/store/boardStore";
import { Todo } from "@/types/todo";
import { Draggable } from "@hello-pangea/dnd";
import { useState } from "react";
import TodoDrawer from "../modal/TodoDrawer";

interface DraggableTodoProps {
  todo: Todo;
  index: number;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toISOString().slice(2, 10).replace(/-/g, ".");
};

const DraggableTodo = ({ todo, index }: DraggableTodoProps) => {
  const { deleteTodo, updateTodo } = useBoardStore();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // const [editMode, setEditMode] = useState(false);

  const toggleCompleted = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    updateTodo(todo.id, { isCompleted: e.target.checked });
  };

  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deleteTodo(todo.id);
      setIsDrawerOpen(false);
    }
  };

  const priorityClass = {
    1: "bg-white",
    2: "bg-yellow-100",
    3: "bg-blue-100",
  }[todo.priority || 1];

  return (
    <>
      <Draggable draggableId={todo.id} index={index}>
        {(provided) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className={`p-2 rounded-md shadow-md mb-2 flex flex-col justify-between items-start relative gap-1 ${
              todo.isCompleted
                ? "bg-gray-200 border border-gray-400 opacity-50"
                : priorityClass
            }`}
            onClick={() => setIsDrawerOpen(true)}
          >
            <input
              type="checkbox"
              checked={todo.isCompleted}
              onChange={toggleCompleted}
              className="p-2 cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="w-full flex justify-between items-center">
              {todo.tag && (
                <span className="border border-gray-50 rounded-lg px-1 bg-yellow-200 text-sm text-slate-800">
                  {todo.tag}
                </span>
              )}
              {todo.isFavorite ? "" : <span>❤️</span>}
            </div>

            <span className="text-gray-800 font-medium">{todo.title}</span>
            <div className="mt-2 text-sm">
              {todo.startDate && <p>시작일: {formatDate(todo.startDate)}</p>}
              {todo.dueDate && <p>마감일: {formatDate(todo.dueDate)}</p>}

              <p></p>
            </div>
          </div>
        )}
      </Draggable>
      {!isDrawerOpen || (
        <TodoDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          editTodo={todo}
          onDelete={handleDelete}
        />
      )}
    </>
  );
};

export default DraggableTodo;
