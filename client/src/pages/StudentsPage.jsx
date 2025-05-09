import StudentTable from "../components/StudentTable";
import AddStudentForm from "../components/AddStudentForm";

export default function StudentsPage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold">Student Management</h1>
      <AddStudentForm />
      <StudentTable />
    </div>
  );
}
