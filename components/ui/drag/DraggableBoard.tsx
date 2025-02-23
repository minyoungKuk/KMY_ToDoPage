import { useBoardStore } from "@/features/store/boardStore";
import { Board } from "@/types/board";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import DraggableTodo from "./DraggableTodo";

interface DraggableBoardProps {
  board: Board;
  index: number;
}

const DraggableBoard = ({ board, index }: DraggableBoardProps) => {
  const { todos } = useBoardStore();
  const boardTodos = todos.filter((todo) => board.todoIds.includes(todo.id));

  return (
    <Draggable draggableId={board.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="p-4 bg-gray-100 rounded-md shadow-md w-80 min-h-[200px] flex flex-col flex-grow"
        >
          <h3 className="font-bold mb-2">{board.name}</h3>

          <Droppable droppableId={board.id} type="TODO">
            {(dropProvided) => (
              <div
                {...dropProvided.droppableProps}
                ref={dropProvided.innerRef}
                className="bg-white rounded-md p-2 flex-grow min-h-[100px]"
              >
                {boardTodos.length > 0 ? (
                  boardTodos.map((todo, i) => (
                    <DraggableTodo key={todo.id} todo={todo} index={i} />
                  ))
                ) : (
                  <p className="text-gray-400 text-sm">할 일이 없습니다.</p>
                )}
                {dropProvided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default DraggableBoard;
