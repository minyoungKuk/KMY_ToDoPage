import { useBoardStore } from "@/features/store/boardStore";
import { Todo } from "@/types/todo";
import { useEffect, useMemo, useState } from "react";

interface TodoDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  editTodo?: Todo;
}

const TodoDrawer = ({ isOpen, onClose, editTodo }: TodoDrawerProps) => {
  const { addTodo, updateTodo, deleteTodo } = useBoardStore();
  const [title, setTitle] = useState(editTodo?.title || "");
  const [category, setCategory] = useState(editTodo?.category || "진행중");
  const [tag, setTag] = useState(editTodo?.tag || "");
  const [memo, setMemo] = useState(editTodo?.memo || "");
  const [startDate, setStartDate] = useState(
    editTodo?.startDate || new Date().toISOString()
  );
  const [dueDate, setDueDate] = useState(editTodo?.dueDate || startDate);
  const [priority, setPriority] = useState<1 | 2 | 3>(editTodo?.priority || 1);
  const [isFavorite, setIsFavorite] = useState(editTodo?.isFavorite || false);

  useEffect(() => {
    if (editTodo) {
      setTitle(editTodo.title);
      setCategory(editTodo.category);
      setTag(editTodo.tag || "");
      setMemo(editTodo.memo || "");
      setStartDate(editTodo.startDate || new Date().toISOString());
      setDueDate(editTodo.dueDate || startDate);
      setPriority(editTodo.priority || 1);
      setIsFavorite(editTodo.isFavorite || false);
    }
  }, [editTodo]);

  const handleSubmit = useMemo(
    () => () => {
      if (!title) return alert("제목을 입력해주세요");
      const newTodo: Omit<Todo, "id" | "createdAt" | "updatedAt"> = {
        title,
        category,
        tag,
        memo,
        startDate,
        dueDate,
        priority,
        isFavorite,
        isCompleted: false,
        subTasks: [],
      };
      if (editTodo) {
        updateTodo(editTodo.id, newTodo);
      } else {
        addTodo(newTodo);
      }
      setTitle("");
      setTag("");
      setMemo("");
      setStartDate(new Date().toISOString());
      setDueDate(new Date().toISOString());
      setPriority(1);
      setIsFavorite(false);

      onClose();
    },
    [
      title,
      category,
      tag,
      memo,
      startDate,
      dueDate,
      priority,
      isFavorite,
      editTodo,
      addTodo,
      updateTodo,
      onClose,
    ]
  );

  return (
    <div
      className={`fixed right-0 top-0 h-full w-full bg-white shadow-lg p-6 transition-transform duration-300 ease-in-out transform md:max-w-[80%] ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <button onClick={onClose}>닫기</button>
      <input
        type="text"
        placeholder="할 일 제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="요청">요청</option>
        <option value="진행중">진행중</option>
        <option value="완료">완료</option>
        <option value="지연">지연</option>
      </select>
      <input
        type="text"
        placeholder="태그"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
      />
      <textarea
        placeholder="메모"
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
      />
      <input
        type="date"
        value={startDate.split("T")[0]}
        onChange={(e) => setStartDate(new Date(e.target.value).toISOString())}
      />
      <input
        type="date"
        value={dueDate.split("T")[0]}
        onChange={(e) => setDueDate(new Date(e.target.value).toISOString())}
      />
      <select
        value={priority}
        onChange={(e) => setPriority(Number(e.target.value) as 1 | 2 | 3)}
      >
        <option value={1}>높음</option>
        <option value={2}>중간</option>
        <option value={3}>낮음</option>
      </select>
      <label>
        <input
          type="checkbox"
          checked={isFavorite}
          onChange={() => setIsFavorite(!isFavorite)}
        />{" "}
        즐겨찾기
      </label>
      <button onClick={handleSubmit}>{editTodo ? "수정" : "추가"}</button>
      {editTodo && (
        <button onClick={() => deleteTodo(editTodo.id)}>삭제</button>
      )}
    </div>
  );
};

export default TodoDrawer;
