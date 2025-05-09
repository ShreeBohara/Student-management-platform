// ==================== components/AddStudentForm.jsx ====================
import React from "react";
import { useStudentContext } from "../context/StudentContext";
import { nanoid } from "nanoid";

export default function AddStudentForm() {
  const { addStudent } = useStudentContext();
  const [form, setForm] = React.useState({
    id: "",
    name: "",
    course: "",
    grade: "",
    enrollmentDate: "",
  });
  const [status, setStatus] = React.useState(null); // null | "success" | "error"

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // basic validation
    if (!form.id || !form.name || !form.course || !form.grade || !form.enrollmentDate) {
      setStatus("error");
      return;
    }
    addStudent(form);
    setForm({ id: "", name: "", course: "", grade: "", enrollmentDate: "" });
    setStatus("success");
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">Add New Student</h2>
      <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
        {[
          { label: "Student ID", name: "id" },
          { label: "Name", name: "name" },
          { label: "Course", name: "course" },
          { label: "Grade", name: "grade" },
        ].map(({ label, name }) => (
          <input
            key={name}
            type="text"
            name={name}
            placeholder={label}
            value={form[name]}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        ))}
        <input
          type="date"
          name="enrollmentDate"
          value={form.enrollmentDate}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <button type="submit" className="sm:col-span-2 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
          Add Student
        </button>
        {status === "success" && (
          <p className="sm:col-span-2 text-green-600">Student added successfully!</p>
        )}
        {status === "error" && (
          <p className="sm:col-span-2 text-red-600">Please fill all fields.</p>
        )}
      </form>
    </div>
  );
}