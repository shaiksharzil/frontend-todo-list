import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TaskList from "../components/TaskList";
import { ToastContainer, toast } from "react-toastify";
import DeletePopUp from "../components/DeletePopUp";
import EditPopUp from "../components/EditPopUp";

const Tasks = () => {
  const { titleId } = useParams();
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [delPopUp, setDelPopUp] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editPopUp, setEditPopUp] = useState(false)
  const printRef = useRef(null);
  const Url = import.meta.env.VITE_URL;
  
  useEffect(() => {
    axios
      .get(`${Url}/tasks/${titleId}`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          const formatted = res.data.map((t) => ({
            ...t,
            checked: t.checked || false,
            details: t.inputValue || "", // Show saved input value
          }));
          setTasks(formatted);
        } else {
          console.error("Expected array, got:", res.data);
          setTasks([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching tasks:", err);
        setTasks([]);
      });

    axios.get(`${Url}/card/${titleId}`).then((res) => {
      setTitle(res.data.title);
    });
  }, [titleId]);


  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${Url}/tasks`, { titleId, task }).then((res) => {
      setTasks((prev) => [
        ...prev,
        { ...res.data, checked: false, details: "" },
      ]);
      toast.success("New task successfully added");
      setTask("");
    });
  };

  const handleCheckChange = (id, checked) => {
    setTasks((prev) => prev.map((t) => (t._id === id ? { ...t, checked } : t)));
  };

  const handleDetailsChange = (id, details) => {
    setTasks((prev) => prev.map((t) => (t._id === id ? { ...t, details } : t)));
  };

  const handleDelete = (taskId) => {
    axios
      .delete(`${Url}/tasks/${taskId}`)
      .then(() => {
        setTasks((prevTasks) => prevTasks.filter((t) => t._id !== taskId));
        toast.warn("Task deleted successfully")
      })
      .catch((err) => console.error("Delete failed:", err));
  };

  const handlePrint = () => {
    const printWindow = window.open("", "PRINT", "width=88");
    const checkedTasks = tasks.filter((t) => t.checked);
    const now = new Date();
    const dateTimeString = now.toLocaleString();

    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <style>
            body {padding: 20px;}
            ol { padding-left: 20px; }
            li { margin-bottom: 7px;}
            h2 { text-align: center; text-transform: uppercase;}
            .timestamp { text-align: right; font-size: 12px; color: #555; }
          </style>
        </head>
        <body>
          <h2>${title}</h2>
          <div class="timestamp">${dateTimeString}</div>
          <hr/>
          <ol>
  ${checkedTasks
    .map((t) => `<li>${t.details ? `${t.task} - ${t.details}` : t.task}</li>`)
    .join("")}
</ol>
          <br/>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  const handleSave = () => {
    const updatedTasks = tasks.map((t) => ({
      _id: t._id,
      checked: t.checked,
      details: t.details || "", // details is used in frontend
    }));

    axios
      .put(`${Url}/tasks/save`, { tasks: updatedTasks })
      .then((res) => {
        console.log("Tasks saved:", res.data);
        toast.success("Tasks saved successfully!");
      })
      .catch((err) => {
        console.error("Save failed:", err);
        toast.error("Failed to save tasks.");
      });
  };

  const handleReset = () => {
    const resetTasks = tasks.map((t) => ({
      _id: t._id,
      checked: false,
      details: "",
    }));

    axios
      .put(`${Url}/tasks/save`, { tasks: resetTasks })
      .then((res) => {
        console.log("Tasks reset:", res.data);
        toast.warn("Tasks reset successfully!")
        setTasks((prev) =>
          prev.map((t) => ({ ...t, checked: false, details: "" }))
        );
      })
      .catch((err) => {
        console.error("Reset failed:", err);
        toast.error("Failed to reset tasks.");
      });
  };

  

  return (
    <div className="h-full w-screen">
      <ToastContainer theme="colored" position="top-center" />
      {delPopUp && selectedTask && (
        <DeletePopUp
          t={selectedTask}
          handleDelete={(id) => {
            handleDelete(id);
            setDelPopUp(false);
          }}
          setDelPopUp={setDelPopUp}
        />
      )}
      {editPopUp && selectedTask && (
        <EditPopUp
          setEditPopUp={setEditPopUp}
          t={selectedTask}
          onConfirm={async (updatedText) => {
            try {
              const res = await fetch(
                `${Url}/tasks/${selectedTask._id}`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ task: updatedText }),
                }
              );

              const data = await res.json();

              if (res.ok) {
                const updated = tasks.map((task) =>
                  task._id === selectedTask._id ? data.task : task
                );
                setTasks(updated);
                toast.success("Task updated successfully")
              } else {
                console.error(
                  "Error updating task:",
                  data.message || data.error
                );
                toast.error("Task failed to update")
              }
            } catch (error) {
              console.error("Network error:", error.message);
            } finally {
              setEditPopUp(false);
            }
          }}
          onCancel={() => setEditPopUp(false)}
        />
      )}
      <form
        onSubmit={handleSubmit}
        className="fixed h-20 w-screen flex items-center justify-center bg-white pt-10 max-md:pt-5 max-md:h-15"
      >
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="New task"
          className="border-2 border-emerald-400 rounded-l-sm pl-2 h-10 w-60 focus:outline-none max-md:h-8 max-md:w-40"
          required
        />
        <button
          type="submit"
          className="bg-emerald-400 rounded-r-sm h-10 text-white px-1 max-md:h-8"
        >
          Add Task
        </button>
      </form>

      <div className="h-20 max-md:h-15"></div>

      {Array.isArray(tasks) &&
        tasks.map((t) => (
          <TaskList
            setDelPopUp={(task) => {
              setSelectedTask(task);
              setDelPopUp(true);
            }}
            setEditPopUp={(task) => {
              setSelectedTask(task);
              setEditPopUp(true);
            }}
            key={t._id}
            t={t}
            onCheckChange={handleCheckChange}
            onDetailsChange={handleDetailsChange}
          />
        ))}
      <div className="flex justify-between items-center px-4 py-2">
        <button
          className="text-xl font-bold rounded-md px-2 py-1 text-white bg-emerald-400 hover:bg-emerald-500"
          onClick={handleSave}
        >
          <i class="ri-save-3-line"></i> Save
        </button>
        <button
          className="text-xl  font-bold rounded-md px-2 py-1 text-white bg-red-400 hover:bg-red-500 mr-5 max-md:mr-0"
          onClick={handleReset}
        >
          <i class="ri-loop-left-line"></i> Reset
        </button>
        <button
          className="text-xl  font-bold rounded-md px-2 py-1 text-white bg-blue-400 hover:bg-blue-500 mr-5 max-md:mr-0"
          onClick={handlePrint}
        >
          <i class="ri-printer-fill"></i> Print
        </button>
      </div>
    </div>
  );
};

export default Tasks;
