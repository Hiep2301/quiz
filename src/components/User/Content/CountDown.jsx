import React, { useEffect, useState } from "react";

const CountDown = ({ onTimeOut }) => {
  const [count, setCount] = useState(300);

  // Hàm chuyển đổi giây sang định dạng HH:MM:SS
  const toHHMMSS = (secs) => {
    const sec_num = parseInt(secs, 10);
    const hours = Math.floor(sec_num / 3600);
    const minutes = Math.floor(sec_num / 60) % 60;
    const seconds = sec_num % 60;

    return [hours, minutes, seconds]
      .map((v) => (v < 10 ? "0" + v : v))
      .filter((v, i) => v !== "00" || i > 0)
      .join(":");
  };

  // Sử dụng useEffect để thiết lập một interval. Mỗi giây, giảm count đi 1 đơn vị.
  useEffect(() => {
    // Nếu count đạt 0, gọi hàm onTimeOut và dừng interval.
    if (count === 0) {
      onTimeOut();
      return;
    }

    const timer = setInterval(() => {
      setCount(count - 1);
    }, 1000);

    // Dọn dẹp interval khi component unmount hoặc khi count thay đổi.
    return () => clearInterval(timer);
  }, [count]);

  return (
    <>
      <div className="count-down-container">{toHHMMSS(count)}</div>
    </>
  );
};

export default CountDown;
