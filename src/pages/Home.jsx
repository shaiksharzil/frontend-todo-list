import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TitleCard from "../components/TitleCard";
import { AuthContext } from "../AuthContext";

const Home = () => {
  const [username, setUsername] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const [cards, setCards] = useState([]);
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
        setTitleInput("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="h-full w-screen">
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

      <div className="flex flex-wrap gap-4 mt-5 mx-9 max-md:w-screen">
        {cards.map((card) => (
          <TitleCard key={card._id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default Home;
