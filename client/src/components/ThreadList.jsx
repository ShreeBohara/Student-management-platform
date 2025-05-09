import classNames from "classnames";

export default function ThreadList({ threads, selected, onSelect }) {
  return (
    <aside className="w-64 border-r overflow-auto">
      {threads.map((t) => {
        const lastMsg = t.messages[t.messages.length - 1];
        return (
          <button
            key={t.id}
            onClick={() => onSelect(t.id)}
            className={classNames(
              "w-full text-left p-4 border-b hover:bg-indigo-50 transition focus:outline-none",
              selected === t.id && "bg-indigo-100"
            )}
          >
            <div className="font-semibold">{t.name}</div>
            <div className="text-xs text-gray-500 truncate">{lastMsg.text}</div>
          </button>
        );
      })}
    </aside>
  );
}