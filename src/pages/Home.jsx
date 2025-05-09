import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TitleCard from "../components/TitleCard";
import EditPopUp from "../components/EditPopUp";
import { AuthContext } from "../AuthContext";
import DeletePopUp from "../components/DeletePopUp";
import { ToastContainer, toast } from "react-toastify";

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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get(`${Url}/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUsername(res.data.username);
        fetchCards(res.data.username);
      })
      .catch((err) => {
        console.log(err);
        navigate("/login");
      });
  }, [navigate]);

  const fetchCards = (userId) => {
    axios
      .get(`${Url}/cards/${userId}`)
      .then((res) => setCards(res.data))
      .catch((err) => console.log(err));
  };

  const handleAddTitle = (e) => {
    e.preventDefault();
    if (!titleInput.trim()) return;

    axios
      .post(`${Url}/addcard`, {
        userId: username,
        title: titleInput,
      })
      .then((res) => {
        setCards((prev) => [...prev, res.data]); // Show new card immediately
        toast.success("New title successfully added");
        setTitleInput("");
      })
      .catch((err) => console.log(err));
  };

  const handleEditClick = (card) => {
    setSelectedCard(card);
    setEditPopUp(true);
  };

  const handleEditConfirm = (newTitle) => {
    axios
      .put(`${Url}/cards/${selectedCard._id}`, { title: newTitle })
      .then((res) => {
        // Update cards state with new title
        setCards((prevCards) =>
          prevCards.map((card) =>
            card._id === selectedCard._id ? { ...card, title: newTitle } : card
          )
        );
        toast.success("Title Updated successfully")
        setEditPopUp(false);
        setSelectedCard(null);
      })
      .catch((err) => console.log(err));
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
      <ToastContainer theme="colored" position="top-center" />
      <form
        onSubmit={handleAddTitle}
        className="fixed h-20 w-screen flex items-center justify-center bg-white pt-10 max-md:pt-5 max-md:h-15"
      >
        <input
          type="text"
          placeholder="Enter title name"
          value={titleInput}
          onChange={(e) => setTitleInput(e.target.value)}
          className="border-2 border-emerald-400 rounded-l-sm pl-2 h-10 w-60 focus:outline-none max-md:h-8 max-md:w-40"
          required
        />
        <button className="bg-emerald-400 rounded-r-sm h-10 text-white px-1 max-md:h-8">
          Add title
        </button>
      </form>

      <div className="h-20 max-md:h-15"></div>

      <div className="flex flex-wrap gap-4 mt-5 mx-9  max-md:pr-36">
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
