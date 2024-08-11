import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "./UserFlashcard.css"; // Import the custom CSS

const UserFlashcards = ({ isDarkTheme }) => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    const response = await axios.get("http://localhost:5000/api/flashcards");
    setFlashcards(response.data);
  };

  const nextCard = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setIsFlipped(false);
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      setIsFlipped(false);
    }
  };

  const toggleFlip = () => {
    setIsFlipped((prevFlip) => !prevFlip);
  };

  const themeClasses = isDarkTheme
    ? "bg-gray-900 text-white"
    : "bg-gray-100 text-gray-900";

  if (flashcards.length === 0)
    return (
      <div
        className={`min-h-screen flex flex-col items-center justify-center ${themeClasses} p-4`}
      >
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold mb-4">Cards Not Available</h1>
          <p className="text-xl">Please try again later.</p>
        </motion.div>
      </div>
    );

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center ${themeClasses} p-4`}
    >
      <h1 className="text-4xl font-bold mb-8">Study Your Flashcards</h1>
      <div className="flex justify-center items-center">
        <div className="flashcard-container w-80 h-60">
          <div
            className={`flashcard bg-gray-500 rounded-lg  ${isFlipped ? "flip" : ""}`}
            onClick={toggleFlip}
          >
            <div className="front flex items-center justify-center text-xl font-semibold">
              <div className="absolute translate-x-[-50%] text-black translate-y-[50%]">
                {flashcards[currentIndex]?.question}
              </div>
              <div className="absolute bottom-2 text-sm text-gray-500">
                click anywhere on the card to see answer
              </div>
            </div>
            <div className="back flex items-center justify-center text-xl font-semibold">
              <div className="absolute translate-x-[-50%] text-white translate-y-[50%]">
                {flashcards[currentIndex]?.answer}
              </div>
              <div className="absolute bottom-2 text-sm text-gray-500">
                click anywhere on the card to see question
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 flex space-x-4">
        <button
          onClick={prevCard}
          disabled={currentIndex === 0}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md transition-opacity duration-300 ease-in-out hover:opacity-80 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={nextCard}
          disabled={currentIndex === flashcards.length - 1}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md transition-opacity duration-300 ease-in-out hover:opacity-80 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserFlashcards;
