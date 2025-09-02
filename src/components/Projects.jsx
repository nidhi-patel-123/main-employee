import React, { useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";

export default function Projects() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Website Redesign",
      client: "Acme Corporation",
      startDate: "2023-04-01",
      deadline: "2023-06-30",
      team: ["S", "J", "D"],
      progress: 65,
      status: "In Progress",
    },
    {
      id: 2,
      name: "Mobile App Development",
      client: "TechStart Inc.",
      startDate: "2023-03-15",
      deadline: "2023-07-15",
      team: ["W", "E", "M"],
      progress: 40,
      status: "In Progress",
    },
  ]);

  const [filter, setFilter] = useState("All Projects");
  const [showModal, setShowModal] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [form, setForm] = useState({
    name: "",
    client: "",
    startDate: "",
    deadline: "",
    team: [],
    progress: 0,
    status: "In Progress",
  });

  // Filter Logic
  const filteredProjects =
    filter === "All Projects"
      ? projects
      : projects.filter((p) => p.status === filter);

  // Delete Project
  const handleDelete = (id) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  // Open Add/Edit Modal
  const handleOpenModal = (project = null) => {
    if (project) {
      setEditProject(project.id);
      setForm({ ...project, team: project.team.join(", ") });
    } else {
      setEditProject(null);
      setForm({
        name: "",
        client: "",
        startDate: "",
        deadline: "",
        team: "",
        progress: 0,
        status: "In Progress",
      });
    }
    setShowModal(true);
  };

  // Save Project
  const handleSave = () => {
    const projectData = {
      ...form,
      team: form.team.split(",").map((t) => t.trim()),
      progress: Number(form.progress),
    };
    if (editProject) {
      setProjects(
        projects.map((p) => (p.id === editProject ? { ...projectData, id: editProject } : p))
      );
    } else {
      setProjects([...projects, { ...projectData, id: Date.now() }]);
    }
    setShowModal(false);
  };

  // // Export CSV
  // const handleExport = () => {
  //   const csv = [
  //     ["Project Name", "Client", "Start Date", "Deadline", "Team", "Progress", "Status"],
  //     ...projects.map((p) => [
  //       p.name,
  //       p.client,
  //       p.startDate,
  //       p.deadline,
  //       p.team.join(";"),
  //       p.progress + "%",
  //       p.status,
  //     ]),
  //   ]
  //     .map((row) => row.join(","))
  //     .join("\n");

  //   const blob = new Blob([csv], { type: "text/csv" });
  //   const link = document.createElement("a");
  //   link.href = URL.createObjectURL(blob);
  //   link.download = "projects.csv";
  //   link.click();
  // };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Project Management</h1>
        <div className="flex gap-2">
          {/* <button
            className="px-4 py-2 border rounded bg-white hover:bg-gray-100"
            onClick={handleExport}
          >
            Export
          </button> */}
          <button
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => handleOpenModal()}
          >
            <AiOutlinePlus className="mr-2" /> Add Project
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b mb-4">
        {["All Projects", "In Progress", "Completed", "On Hold"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`pb-2 ${
              filter === tab
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Project Name</th>
              <th className="px-6 py-3">Client</th>
              <th className="px-6 py-3">Start Date</th>
              <th className="px-6 py-3">Deadline</th>
              <th className="px-6 py-3">Team</th>
              <th className="px-6 py-3">Progress</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((project) => (
              <tr key={project.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3 text-blue-600 font-medium">{project.name}</td>
                <td className="px-6 py-3">{project.client}</td>
                <td className="px-6 py-3">{project.startDate}</td>
                <td className="px-6 py-3">{project.deadline}</td>
                <td className="px-6 py-3 flex -space-x-2">
                  {project.team.slice(0, 3).map((member, idx) => (
                    <div
                      key={idx}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-xs font-bold"
                    >
                      {member}
                    </div>
                  ))}
                  {project.team.length > 3 && (
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 text-xs font-bold">
                      +{project.team.length - 3}
                    </div>
                  )}
                </td>
                <td className="px-6 py-3">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${
                        project.progress === 100 ? "bg-green-500" : "bg-orange-400"
                      }`}
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-xs ml-2">{project.progress}%</span>
                </td>
                <td className="px-6 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      project.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {project.status}
                  </span>
                </td>
                <td className="px-6 py-3 flex gap-2 text-gray-600">
                  <button onClick={() => handleOpenModal(project)}>
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(project.id)}>
                    <FaTrash className="text-red-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editProject ? "Edit Project" : "Add Project"}
            </h2>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Project Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="border px-3 py-2 rounded"
              />
              <input
                type="text"
                placeholder="Client"
                value={form.client}
                onChange={(e) => setForm({ ...form, client: e.target.value })}
                className="border px-3 py-2 rounded"
              />
              <div className="flex gap-2">
                <input
                  type="date"
                  value={form.startDate}
                  onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                  className="border px-3 py-2 rounded w-full"
                />
                <input
                  type="date"
                  value={form.deadline}
                  onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                  className="border px-3 py-2 rounded w-full"
                />
              </div>
              <input
                type="text"
                placeholder="Team (comma separated)"
                value={form.team}
                onChange={(e) => setForm({ ...form, team: e.target.value })}
                className="border px-3 py-2 rounded"
              />
              <input
                type="number"
                placeholder="Progress %"
                value={form.progress}
                onChange={(e) => setForm({ ...form, progress: e.target.value })}
                className="border px-3 py-2 rounded"
                min="0"
                max="100"
              />
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="border px-3 py-2 rounded"
              >
                <option>In Progress</option>
                <option>Completed</option>
                <option>On Hold</option>
              </select>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
