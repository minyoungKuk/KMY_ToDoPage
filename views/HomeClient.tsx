"use client";

import Button from "@/components/ui/button/Button";
import DragBoardContainer from "@/components/ui/drag/DragBoardContainer";
import TodoDrawer from "@/components/ui/modal/TodoDrawer";
import { useState } from "react";

const HomeClient = () => {
  const [isTodoDrawerOpen, setIsTodoDrawerOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsTodoDrawerOpen(true)}>일정 추가</Button>
      <DragBoardContainer />
      <TodoDrawer
        isOpen={isTodoDrawerOpen}
        onClose={() => setIsTodoDrawerOpen(false)}
      />
    </>
  );
};

export default HomeClient;
