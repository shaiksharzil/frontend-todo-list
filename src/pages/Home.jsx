import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import TitleCard from "../components/TitleCard";
import EditPopUp from "../components/EditPopUp";
import { AuthContext } from "../AuthContext";
import DeletePopUp from "../components/DeletePopUp";
import { ToastContainer, toast } from "react-toastify";
import { motion, useScroll } from "motion/react";
import TitleNothing from "../components/TitleNothing";
import Loader from "../components/Loader";

const Home = () => {
  const [username, setUsername] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const [cards, setCards] = useState([]);
  const [editCard, setEditCard] = useState(null);
  const [editPopUp, setEditPopUp] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null); // card to edit
  const [delPopUp, setDelPopUp] = useState(false);
  const navigate = useNavigate();
  const { username: contextUsername } = useContext(AuthContext);
  const Url = import.meta.env.VITE_URL;
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const scrollYProgress = useScroll().scrollYProgress;


  useEffect(() => {
    const initialize = async () => {
      const token = localStorage.getItem("token");
      const storedUsername = localStorage.getItem("username");
      if (!token || !storedUsername) {
        navigate("/login");
        return;
      }
      setUsername(storedUsername);

      if (location.state?.showWelcome) {
        toast.success(`Welcome ${storedUsername}`);
        navigate(location.pathname, { replace: true });
      }

      try {
        const res = await axios.get(`${Url}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const validUsername = res.data.username || storedUsername;
        setUsername(validUsername);
        await fetchCards(validUsername);
      } catch (err) {
        console.log(err);
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, [navigate]);
  

  const fetchCards = async (userId) => {
    try {
      const res = await axios.get(`${Url}/cards/${userId}`);
      setCards(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  

  const handleAddTitle = async (e) => {
    e.preventDefault();
    if (!titleInput.trim()) return;

    try {
      const res = await axios.post(`${Url}/addcard`, {
        userId: username,
        title: titleInput,
      });
      setCards((prev) => [...prev, res.data]);
      toast.success("New title successfully added");
      setTitleInput("");
    } catch (err) {
      console.log(err);
    }
  };
  

  const handleEditClick = (card) => {
    setSelectedCard(card);
    setEditPopUp(true);
  };

  const handleEditConfirm = async (newTitle) => {
    try {
      await axios.put(`${Url}/cards/${selectedCard._id}`, { title: newTitle });
      setCards((prevCards) =>
        prevCards.map((card) =>
          card._id === selectedCard._id ? { ...card, title: newTitle } : card
        )
      );
      toast.success("Title Updated successfully");
      setEditPopUp(false);
      setSelectedCard(null);
    } catch (err) {
      console.log(err);
    }
  };
  

  const handleEditCancel = () => {
    setEditPopUp(false);
    setSelectedCard(null);
  };

  const handleDeleteCard = async (cardId) => {
    try {
      await axios.delete(`${Url}/cards/${cardId}`);
      await axios.delete(`${Url}/tasks/byTitle/${cardId}`); // delete all tasks for this card
      setCards((prev) => prev.filter((c) => c._id !== cardId));
      toast.warn("Title card and its tasks deleted Successfully");
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="h-full w-screen">
      <motion.div
        style={{
          scaleX: scrollYProgress,
        }}
        className="h-1 w-screen fixed left-0 top-0 bg-gradient-to-r from-[#EEEEEE] to-gray-500 origin-left"
      ></motion.div>
      <ToastContainer theme="colored" position="top-center" />
      <form
        onSubmit={handleAddTitle}
        className="fixed h-20 w-screen flex items-center justify-center bg-white pt-10 max-md:pt-5 max-md:h-15"
      >
        <input
          type="text"
          placeholder="New title"
          value={titleInput}
          onChange={(e) => setTitleInput(e.target.value)}
          className="border-2 border-emerald-400 rounded-l-sm pl-2 h-10 w-60 focus:outline-none max-md:h-8 max-md:w-40"
          required
        />
        <button className="bg-emerald-400 rounded-r-sm h-10 text-white px-2 max-md:h-8 cursor-pointer">
          Create
        </button>
      </form>
      <div className="h-20 max-md:h-15"></div>
      {loading ? (
        <Loader />
      ) : cards.length === 0 ? (
        <div className="flex justify-center items-center h-[calc(100vh-120px)]">
          <TitleNothing />
        </div>
      ) : (
        <div className="flex flex-wrap gap-4 mt-5 mx-9 max-md:pr-36">
          {cards.map((card) => (
            <TitleCard
              key={card._id}
              card={card}
              onEdit={handleEditClick}
              onDelete={(card) => {
                setSelectedCard(card);
                setDelPopUp(true);
              }}
            />
          ))}
        </div>
      )}

      {editPopUp && selectedCard && (
        <EditPopUp
          t={{ task: selectedCard.title }}
          setEditPopUp={setEditPopUp}
          onConfirm={handleEditConfirm}
          onCancel={handleEditCancel}
        />
      )}
      {delPopUp && selectedCard && (
        <DeletePopUp
          t={{ task: selectedCard.title, _id: selectedCard._id }}
          setDelPopUp={setDelPopUp}
          handleDelete={(id) => {
            handleDeleteCard(id);
            setDelPopUp(false);
          }}
        />
      )}
    </div>
  );
};

export default Home;
