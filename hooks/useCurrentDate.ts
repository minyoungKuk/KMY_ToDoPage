"use client";

import { useEffect, useState } from "react";

const useCurrentDate = () => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const formatDate = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
      });
      setCurrentDate(formatter.format(now));
    };

    formatDate(); // 초기 날짜 설정

    // 다음 정각(00:00:00)까지 남은 시간 계산
    const now = new Date();
    const midnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0,
      0,
      0
    );
    const timeUntilMidnight = midnight.getTime() - now.getTime();

    const timer = setTimeout(() => {
      formatDate();
      setInterval(formatDate, 24 * 60 * 60 * 1000);
    }, timeUntilMidnight);

    return () => clearTimeout(timer);
  }, []);

  return currentDate;
};

export default useCurrentDate;
