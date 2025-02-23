import { Todo } from "@/types/todo";
import { Draggable } from "@hello-pangea/dnd";

interface DraggableTodoProps {
  todo: Todo;
  index: number;
}

const DraggableTodo = ({ todo, index }: DraggableTodoProps) => {
  return (
    <Draggable draggableId={todo.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="p-2 bg-white rounded-md shadow-md mb-2 flex justify-between items-center"
        >
          <span className="text-gray-800 font-medium">{todo.title}</span>
        </div>
      )}
    </Draggable>
  );
};

export default DraggableTodo;
