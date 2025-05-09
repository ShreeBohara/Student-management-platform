
// ===================== context/StudentContext.jsx =====================
import React from "react";
import { nanoid } from "nanoid";

const StudentContext = React.createContext();

export function StudentProvider({ children }) {
  const [students, setStudents] = React.useState(() => {
    const saved = localStorage.getItem("smp.students");
    return saved ? JSON.parse(saved) : initialStudents;
  });

  const [threads, setThreads] = React.useState(() => {
    const saved = localStorage.getItem("smp.threads");
    return saved ? JSON.parse(saved) : initialThreads;
  });

  React.useEffect(() => {
    localStorage.setItem("smp.students", JSON.stringify(students));
  }, [students]);

  React.useEffect(() => {
    localStorage.setItem("smp.threads", JSON.stringify(threads));
  }, [threads]);

  const addStudent = (student) => {
    setStudents((prev) => [student, ...prev]);
    // create a default chat thread for the new student
    setThreads((prev) => [
      {
        id: student.id,
        name: student.name,
        messages: [
          {
            id: nanoid(),
            sender: "advisor",
            text: `Welcome aboard, ${student.name}! Feel free to ask questions here.`,
            timestamp: Date.now(),
          },
        ],
      },
      ...prev,
    ]);
  };

  const sendMessage = (threadId, text, sender = "advisor") => {
    setThreads((prev) =>
      prev.map((t) =>
        t.id === threadId
          ? {
              ...t,
              messages: [
                ...t.messages,
                { id: nanoid(), sender, text, timestamp: Date.now() },
              ],
            }
          : t
      )
    );
  };

  return (
    <StudentContext.Provider value={{ students, addStudent, threads, sendMessage }}>
      {children}
    </StudentContext.Provider>
  );
}

export const useStudentContext = () => React.useContext(StudentContext);

// ---- Sample seed data ----
const initialStudents = [
  {
    id: "S-1001",
    name: "Alice Johnson",
    course: "Physics",
    grade: "A",
    enrollmentDate: "2024-08-15",
  },
  {
    id: "S-1002",
    name: "Bob Smith",
    course: "Mathematics",
    grade: "B+",
    enrollmentDate: "2024-08-15",
  },
];

const initialThreads = [
  {
    id: "S-1001",
    name: "Alice Johnson",
    messages: [
      {
        id: nanoid(),
        sender: "student",
        text: "Hi advisor! When does the semester start?",
        timestamp: Date.now() - 100000,
      },
      {
        id: nanoid(),
        sender: "advisor",
        text: "Hello Alice, it begins Sept 3rd.",
        timestamp: Date.now() - 90000,
      },
    ],
  },
  {
    id: "S-1002",
    name: "Bob Smith",
    messages: [
      {
        id: nanoid(),
        sender: "student",
        text: "Can I change my course to CS?",
        timestamp: Date.now() - 80000,
      },
    ],
  },
];
