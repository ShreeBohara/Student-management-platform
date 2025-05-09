import React from "react";
import { useStudentContext } from "../context/StudentContext";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";

export default function StudentTable() {
  const { students } = useStudentContext();
  const [search, setSearch] = React.useState("");
  const [sortConfig, setSortConfig] = React.useState({ key: "id", direction: "asc" });

  const sortedFiltered = React.useMemo(() => {
    let filtered = students.filter(
      (s) =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.id.toLowerCase().includes(search.toLowerCase())
    );
    const { key, direction } = sortConfig;
    filtered.sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    return filtered;
  }, [students, search, sortConfig]);

  const toggleSort = (key) => {
    setSortConfig((curr) => {
      if (curr.key === key) {
        return { key, direction: curr.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  const SortIcon = ({ col }) =>
    sortConfig.key === col ? (
      sortConfig.direction === "asc" ? (
        <ArrowUpIcon className="w-4 h-4 inline" />
      ) : (
        <ArrowDownIcon className="w-4 h-4 inline" />
      )
    ) : null;

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Student List</h2>
        <input
          type="text"
          placeholder="Search by name or ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-60"
        />
      </div>
      <div className="overflow-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left bg-gray-100">
              {[
                ["id", "Student ID"],
                ["name", "Name"],
                ["course", "Course"],
                ["grade", "Grade"],
                ["enrollmentDate", "Enrollment Date"],
              ].map(([key, label]) => (
                <th
                  key={key}
                  onClick={() => toggleSort(key)}
                  className="px-4 py-2 cursor-pointer whitespace-nowrap"
                >
                  {label} <SortIcon col={key} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedFiltered.map((s) => (
              <tr key={s.id} className="even:bg-gray-50 hover:bg-indigo-50 transition">
                <td className="px-4 py-2 whitespace-nowrap">{s.id}</td>
                <td className="px-4 py-2 whitespace-nowrap">{s.name}</td>
                <td className="px-4 py-2 whitespace-nowrap">{s.course}</td>
                <td className="px-4 py-2 whitespace-nowrap">{s.grade}</td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {new Date(s.enrollmentDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
