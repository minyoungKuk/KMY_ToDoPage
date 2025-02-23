import { useBoardStore } from "@/features/store/boardStore";
import { Todo } from "@/types/todo";
import { useEffect, useState } from "react";
import Button from "../button/Button";
import Input from "../input";
import Select from "../select";

interface TodoDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  editTodo?: Todo;
  onDelete?: () => void;
}

const TodoDrawer = ({
  isOpen,
  onClose,
  editTodo,
  onDelete,
}: TodoDrawerProps) => {
  const { addTodo, updateTodo } = useBoardStore();
  const [title, setTitle] = useState(editTodo?.title || "");
  const [category, setCategory] = useState(editTodo?.category || "요청");
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
      setDueDate(
        editTodo.dueDate || editTodo.startDate || new Date().toISOString()
      );
      setPriority(editTodo.priority || 1);
      setIsFavorite(editTodo.isFavorite || false);
    } else {
      setTitle("");
      setCategory("요청");
      setTag("");
      setMemo("");
      setStartDate(new Date().toISOString());
      setDueDate(new Date().toISOString());
      setPriority(1);
      setIsFavorite(false);
    }
  }, [editTodo, isOpen]);

  useEffect(() => {
    setDueDate(startDate);
  }, [startDate]);

  const handleSubmit = () => {
    if (!title.trim()) return alert("제목을 입력해주세요");

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

    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      setTitle("");
      setCategory("요청");
      setTag("");
      setMemo("");
      setStartDate(new Date().toISOString());
      setDueDate(new Date().toISOString());
      setPriority(1);
      setIsFavorite(false);
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}
      <div
        className={`fixed right-0 top-0 h-full w-full bg-white shadow-lg p-6 transition-transform duration-300 ease-in-out transform md:max-w-[80%] z-50 flex flex-col justify-between ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          <button onClick={onClose}>닫기</button>
          <div className="flex flex-col mt-4 gap-2">
            <Input
              label="할 일 제목"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Select
              label="카테고리"
              value={category}
              onChange={(e) =>
                setCategory(
                  e.target.value as "요청" | "진행중" | "완료" | "지연"
                )
              }
              options={[
                { value: "요청", label: "요청" },
                { value: "진행중", label: "진행중" },
                { value: "완료", label: "완료" },
                { value: "지연", label: "지연" },
              ]}
            />
            <Input
              label="태그"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            />
            <Input
              label="메모"
              textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
            />
            <Input
              label="시작 날짜"
              type="date"
              value={startDate.split("T")[0]}
              onChange={(e) =>
                setStartDate(new Date(e.target.value).toISOString())
              }
            />

            <Input
              label="마감 날짜"
              type="date"
              value={dueDate.split("T")[0]}
              onChange={(e) =>
                setDueDate(new Date(e.target.value).toISOString())
              }
            />
            <Select
              label="우선순위"
              value={priority}
              onChange={(e) => setPriority(Number(e.target.value) as 1 | 2 | 3)}
              options={[
                { value: 1, label: "낮음" },
                { value: 2, label: "중간" },
                { value: 3, label: "높음" },
              ]}
            />
            <label className="mt-4">
              <input
                type="checkbox"
                checked={isFavorite}
                onChange={() => setIsFavorite(!isFavorite)}
              />{" "}
              즐겨찾기 추가 시 하트이모티콘이 추가됩니다.
            </label>
          </div>
        </div>

        <div className="flex gap-2">
          {editTodo && (
            <Button size="lg" variant="danger" onClick={onDelete}>
              삭제
            </Button>
          )}
          <Button size="lg" onClick={handleSubmit}>
            {editTodo ? "수정" : "추가"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default TodoDrawer;
