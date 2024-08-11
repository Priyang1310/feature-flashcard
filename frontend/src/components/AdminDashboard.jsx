import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = ({isDarkTheme}) => {
  const [flashcards, setFlashcards] = useState([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    const response = await axios.get('http://localhost:5000/api/flashcards');
    setFlashcards(response.data);
  };

  const addFlashcard = async () => {
    await axios.post('http://localhost:5000/api/flashcards', {
      question,
      answer,
    });
    setQuestion('');
    setAnswer('');
    fetchFlashcards();
  };
  
  const deleteFlashcard = async (id) => {
    await axios.delete(`http://localhost:5000/api/flashcards/${id}`);
    fetchFlashcards();
  };
  
  const editFlashcard = async (id) => {
    const newQuestion = prompt('Enter new question:', question);
    const newAnswer = prompt('Enter new answer:', answer);
    
    if (newQuestion && newAnswer) {
      await axios.put(`http://localhost:5000/api/flashcards/${id}`, {
        question: newQuestion,
        answer: newAnswer,
      });
      fetchFlashcards();
    }
  };
  
  return (
    <div className={`min-h-screen ${!isDarkTheme?"bg-gray-100":"bg-gray-900"} p-6`}>
      <h2 className="text-4xl font-bold text-center mb-8">Manage Flashcards</h2>
      <div className={`max-w-xl mx-auto mb-8 p-6 ${!isDarkTheme?"bg-gray-200":"bg-gray-800"} rounded-lg shadow-lg`}>
        <h3 className="text-2xl font-semibold mb-4">Add a New Flashcard</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full text-black p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full p-3 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addFlashcard}
            className="w-full bg-blue-500 text-white py-3 rounded-md shadow-md hover:bg-blue-600 transition-colors duration-200"
          >
            Add Flashcard
          </button>
        </div>
      </div>
      <div className="max-w-xl mx-auto">
        {flashcards.map((flashcard) => (
          <div key={flashcard.id} className={`mb-4 p-6 ${!isDarkTheme?"bg-gray-200":"bg-gray-800"} rounded-lg shadow-md`}>
            <p className="text-lg mb-2"><strong>Q:</strong> {flashcard.question}</p>
            <p className="text-lg mb-4"><strong>A:</strong> {flashcard.answer}</p>
            <div className="flex space-x-4">
              <button
                onClick={() => editFlashcard(flashcard.id)}
                className="flex-1 bg-yellow-500 text-white py-2 rounded-md shadow-md hover:bg-yellow-600 transition-colors duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => deleteFlashcard(flashcard.id)}
                className="flex-1 bg-red-500 text-white py-2 rounded-md shadow-md hover:bg-red-600 transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
