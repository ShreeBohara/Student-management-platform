import React from "react";
import { useStudentContext } from "../context/StudentContext";
import ThreadList from "../components/ThreadList";
import MessageWindow from "../components/MessageWindow";

export default function ChatPage() {
  const { threads } = useStudentContext();
  const [selectedThreadId, setSelectedThreadId] = React.useState(
    threads.length ? threads[0].id : null
  );
  const selected = threads.find((t) => t.id === selectedThreadId);

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-white rounded-xl shadow overflow-hidden">
      <ThreadList threads={threads} selected={selectedThreadId} onSelect={setSelectedThreadId} />
      {selected ? (
        <MessageWindow thread={selected} />
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          Select a conversation
        </div>
      )}
    </div>
  );
}