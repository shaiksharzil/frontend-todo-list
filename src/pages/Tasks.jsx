import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TaskList from "../components/TaskList";
import { ToastContainer, toast } from "react-toastify";
import DeletePopUp from "../components/DeletePopUp";
import EditPopUp from "../components/EditPopUp";
import { motion, useScroll } from "motion/react";
import TaskNothing from "../components/TaskNothing";
import Loader from "../components/Loader";

const Tasks = () => {
  const { titleId } = useParams();
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [delPopUp, setDelPopUp] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editPopUp, setEditPopUp] = useState(false);
  const printRef = useRef(null);
  const Url = import.meta.env.VITE_URL;
  const scrollYProgress = useScroll().scrollYProgress;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const res = await axios.get(`${Url}/tasks/${titleId}`);
        if (Array.isArray(res.data)) {
          const formatted = res.data.map((t) => ({
            ...t,
            checked: t.checked || false,
            details: t.inputValue || "",
          }));
          setTasks(formatted);
        } else {
          console.error("Expected array, got:", res.data);
          setTasks([]);
        }

        const cardRes = await axios.get(`${Url}/card/${titleId}`);
        setTitle(cardRes.data.title);
      } catch (err) {
        console.error("Error fetching data:", err);
        setTasks([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [titleId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${Url}/tasks`, { titleId, task });
      setTasks((prev) => [
        ...prev,
        { ...res.data, checked: false, details: "" },
      ]);
      toast.success("New task successfully added");
      setTask("");
    } catch (err) {
      console.error("Error adding task:", err);
      toast.error("Failed to add task.");
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`${Url}/tasks/${taskId}`);
      setTasks((prev) => prev.filter((t) => t._id !== taskId));
      toast.warn("Task deleted successfully");
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete task.");
    }
  };

  const handleSave = async () => {
    const updatedTasks = tasks.map((t) => ({
      _id: t._id,
      checked: t.checked,
      details: t.details || "",
    }));

    try {
      await axios.put(`${Url}/tasks/save`, { tasks: updatedTasks });
      toast.success("Tasks saved successfully!");
    } catch (err) {
      console.error("Save failed:", err);
      toast.error("Failed to save tasks.");
    }
  };

  const handleReset = async () => {
    const resetTasks = tasks.map((t) => ({
      _id: t._id,
      checked: false,
      details: "",
    }));

    try {
      await axios.put(`${Url}/tasks/save`, { tasks: resetTasks });
      toast.warn("Tasks reset successfully!");
      setTasks((prev) =>
        prev.map((t) => ({ ...t, checked: false, details: "" }))
      );
    } catch (err) {
      console.error("Reset failed:", err);
      toast.error("Failed to reset tasks.");
    }
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
              .map(
                (t) =>
                  `<li>${t.details ? `${t.task} - ${t.details}` : t.task}</li>`
              )
              .join("")}
          </ol>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();

    const isDesktop = !/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
    if (isDesktop) {
      printWindow.close();
    }
  };

  const handleCheckChange = (id, checked) => {
    setTasks((prev) => prev.map((t) => (t._id === id ? { ...t, checked } : t)));
  };

  const handleDetailsChange = (id, details) => {
    setTasks((prev) => prev.map((t) => (t._id === id ? { ...t, details } : t)));
  };

  return (
    <div className="h-full w-screen">
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="h-1 w-screen fixed left-0 top-0 bg-gradient-to-r from-[#EEEEEE] to-gray-500 origin-left"
      />
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
              const res = await fetch(`${Url}/tasks/${selectedTask._id}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ task: updatedText }),
              });

              const data = await res.json();

              if (res.ok) {
                const updated = tasks.map((task) =>
                  task._id === selectedTask._id ? data.task : task
                );
                setTasks(updated);
                toast.success("Task updated successfully");
              } else {
                console.error(
                  "Error updating task:",
                  data.message || data.error
                );
                toast.error("Task failed to update");
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
          className="bg-emerald-400 rounded-r-sm h-10 text-white px-2 max-md:h-8 cursor-pointer"
        >
          Add Task
        </button>
      </form>

      <div className="h-20 max-md:h-15"></div>
      <h2 className="mx-5 mt-5 font-bold bg-gradient-to-b from-[#304352] to-[#d7d2cc] bg-clip-text text-transparent text-4xl break-words uppercase max-md:text-2xl">
        {title}
      </h2>

      {isLoading ? (
        <Loader/>
      ) : tasks.length > 0 ? (
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
        ))
      ) : (
        <TaskNothing />
      )}

      <div className="flex justify-between items-center px-4 py-2">
        <button
          className="text-xl font-bold rounded-md px-2 py-1 text-white bg-emerald-500 hover:bg-emerald-400 cursor-pointer"
          onClick={handleSave}
        >
          <i className="ri-save-3-line"></i> Save
        </button>
        <button
          className="text-xl font-bold rounded-md px-2 py-1 text-white bg-red-500 hover:bg-red-400  mr-5 max-md:mr-0 cursor-pointer"
          onClick={handleReset}
        >
          <i className="ri-loop-left-line"></i> Reset
        </button>
        <button
          className="text-xl  font-bold rounded-md px-2 py-1 text-white bg-blue-500 hover:bg-blue-400 mr-5 max-md:mr-0 cursor-pointer"
          onClick={handlePrint}
        >
          <i className="ri-printer-fill"></i> Print
        </button>
      </div>
    </div>
  );
};

export default Tasks;
