"use client";

import { useBoardStore } from "@/features/store/boardStore";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import DraggableBoard from "./DraggableBoard";

const DragBoardContainer = () => {
  const { boards, reorderBoard, reorderTodo, moveTodo } = useBoardStore();

  const handleDargEnd = (data: DropResult) => {
    const { source, destination, type } = data;
    if (!destination) return;

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
            className="flex flex-col gap-4 overflow-auto w-full min-h-[80vh] py-4 md:flex-row"
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
