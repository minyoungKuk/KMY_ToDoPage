"use client";

import Button from "@/components/ui/button/Button";
import DragBoardContainer from "@/components/ui/drag/DragBoardContainer";
import TodoDrawer from "@/components/ui/modal/TodoDrawer";
import { useState } from "react";

const HomeClient = () => {
  const [isTodoDrawerOpen, setIsTodoDrawerOpen] = useState(false);

  return (
    <>
      <div className="w-full flex justify-end">
        <Button
          size="md"
          variant="secondary"
          onClick={() => setIsTodoDrawerOpen(true)}
        >
          일정 추가
        </Button>
      </div>
      <DragBoardContainer />
      <TodoDrawer
        isOpen={isTodoDrawerOpen}
        onClose={() => setIsTodoDrawerOpen(false)}
      />
    </>
  );
};

export default HomeClient;
