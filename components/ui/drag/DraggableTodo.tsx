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

const DraggableTodo = ({ todo, index }: DraggableTodoProps) => {
  const { deleteTodo } = useBoardStore();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // const [editMode, setEditMode] = useState(false);

  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deleteTodo(todo.id);
      setIsDrawerOpen(false);
    }
  };

  return (
    <>
      <Draggable draggableId={todo.id} index={index}>
        {(provided) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className="p-2 bg-white rounded-md shadow-md mb-2 flex justify-between items-center"
            onClick={() => setIsDrawerOpen(true)}
          >
            <span className="text-gray-800 font-medium">{todo.title}</span>
          </div>
        )}
      </Draggable>
      {!isDrawerOpen || (
        <TodoDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          editTodo={todo} // ✅ 클릭된 Todo 정보를 모달에 전달
          // onEdit={() => setEditMode(true)}
          onDelete={handleDelete}
        />
      )}
    </>
  );
};

export default DraggableTodo;
