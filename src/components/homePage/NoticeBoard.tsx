import { useEffect, useState } from "react";

const NoticeBoard = ({
  messages,
}: {
  messages: { createdAt: Date; noticeContent: string }[] | null;
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  // const [messages] = useState([
  //   "Notice 1: APEX INTERNATIONAL SCHOOL.",
  //   "Notice 2: Admission Open in Session 2024-2025.",
  //   "Notice 3: All parents are informed that Term - 3 Exam  will start from 23rd December 2024.",
  //   "Notice 4: Term -3 exam result has been published online on 20.01.2025.",
  // ]);

  const messageHeight = 80;

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition((prev) => {
        if (!messages || prev >= messages.length * messageHeight) {
          return 0; // Reset to the top once the last message is scrolled
        }
        return prev + 1;
      });
    }, 35); // Adjust the speed of scroll here (lower is faster)

    return () => clearInterval(interval);
  }, [messages?.length]);

  return (
    <div className="relative overflow-hidden bg-secondary text-white h-40 p-4 rounded-md shadow-lg w-full max-w-3xl mx-auto">
      <div
        className="absolute w-full"
        style={{
          transform: `translateY(-${scrollPosition}px)`,
          transition: "transform 0.1s linear",
        }}
      >
        {messages?.map((message, index) => (
          <div key={index} className="py-2 text-sm md:text-base font-medium">
            {message.noticeContent}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoticeBoard;
