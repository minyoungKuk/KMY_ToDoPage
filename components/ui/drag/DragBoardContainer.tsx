"use client";

import { useBoardStore } from "@/features/store/boardStore";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { useEffect } from "react";
import DraggableBoard from "./DraggableBoard";

const DragBoardContainer = () => {
  const { boards, reorderBoard, reorderTodo, moveTodo } = useBoardStore();

  useEffect(() => {
    console.log("현재 board:", boards);
  }, [boards]);

  const handleDargEnd = (data: DropResult) => {
    const { source, destination, type } = data;
    if (!destination) return;

    console.log("드래그 종료:", { source, destination, type });

    if (type === "BOARD") {
      if (source.index !== destination.index) {
        reorderBoard(source.index, destination.index);
      }
    } else if (type === "TODO") {
      const sourceBoardId = source.droppableId;
      const destinationBoardId = destination.droppableId;

      if (sourceBoardId === destinationBoardId) {
        reorderTodo(sourceBoardId, source.index, destination.index);
      } else {
        moveTodo(
          sourceBoardId,
          destinationBoardId,
          source.index,
          destination.index
        );
      }
    }
  };

  return (
    <DragDropContext onDragEnd={handleDargEnd}>
      <Droppable droppableId="board-list" direction="vertical" type="BOARD">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-4 overflow-auto w-full min-h-screen p-4"
          >
            {boards?.map((board, index) => (
              <DraggableBoard key={board.id} board={board} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DragBoardContainer;
