import React from "react";
import { useStudentContext } from "../context/StudentContext";

export default function MessageWindow({ thread }) {
  const { sendMessage } = useStudentContext();
  const [input, setInput] = React.useState("");
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    // scroll to bottom when thread changes or new message
    containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: "smooth" });
  }, [thread]);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(thread.id, input.trim(), "advisor");
    setInput("");
  };

  return (
    <section className="flex-1 flex flex-col">
      <header className="p-4 border-b font-semibold">Conversation with {thread.name}</header>
      <div ref={containerRef} className="flex-1 overflow-auto p-4 space-y-2 bg-gray-50">
        {thread.messages.map((m) => (
          <div
            key={m.id}
            className={`max-w-[70%] p-2 rounded-lg shadow text-sm ${
              m.sender === "advisor" ? "ml-auto bg-indigo-600 text-white" : "mr-auto bg-white"
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>
      <footer className="p-4 border-t flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
          className="flex-1 border p-2 rounded"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Send
        </button>
      </footer>
    </section>
  );
}
