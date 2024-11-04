import React, { useEffect, useState } from "react";

const initialWords = [
  "apple",
  "banana",
  "orange",
  "grape",
  "watermelon",
  "strawberry",
  "blueberry",
  "raspberry",
  "blackberry",
  "cherry",
  "avocado",
];

export default function App() {
  const [words, setWords] = useState(initialWords);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [input, setInput] = useState("");
  const [timer, setTimer] = useState(0);
  const [NmbPerMunites, setNmbPerMunites] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let interval;
    if (isStarted && !isFinished) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else if (isFinished) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isStarted, isFinished]);

  const handleStart = () => {
    setIsStarted(true);
    setIsFinished(false);
    setTimer(0);
    setCurrentWordIndex(0);
    setInput("");
    setNmbPerMunites(0); // Reset words per minute
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    if (
      e.target.value.trim().toLowerCase() ===
      words[currentWordIndex].toLowerCase()
    ) {
      setCurrentWordIndex((prev) => prev + 1);
      setInput("");
      if (currentWordIndex === words.length - 1) {
        setIsFinished(true);
        setIsStarted(false);
        calculateWordsPerMinute(); // Calculate words per minute at the end
      }
    }
  };
  // calculating number of words per minutes
  function calculateWordsPerMinute() {
    if (timer > 0) {
      const wordsPerMinute = (currentWordIndex / timer) * 60;
      setNmbPerMunites(wordsPerMinute.toFixed(1));
    }
  }

  return (
    <div className="bg-indigo-950 h-screen w-full flex flex-col items-center justify-center p-4">
      <div className="flex justify-center items-center gap-4 flex-wrap p-5">
        {words.map((item, index) => (
          <div
            key={index}
            className="px-2 py-3 bg-slate-700 border rounded-md text-stone-200">
            {item}
          </div>
        ))}
      </div>
      <h1 className="text-4xl text-white mb-6">Typing Speed Test</h1>
      <div className="text-center mb-4">
        {!isStarted && (
          <button
            onClick={handleStart}
            className="bg-blue-600 text-white py-2 px-4 rounded">
            Start Test
          </button>
        )}
      </div>

      <div className="bg-gray-800 p-6 rounded shadow-lg text-white w-3/4 max-w-lg text-center">
        <div className="mb-4 text-2xl">
          {isFinished ? (
            <span>Test Completed!</span>
          ) : (
            <span className="font-bold text-xl">
              Type this word:{" "}
              <strong className="text-3xl">{words[currentWordIndex]}</strong>
            </span>
          )}
        </div>

        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          disabled={!isStarted || isFinished}
          placeholder="Start typing..."
          className="w-full p-2 rounded text-white bg-slate-950"
        />
      </div>

      <div className="mt-6 text-white text-xl">
        <p>Time: {timer} seconds</p>
        {isFinished && <p>Your typing time: {timer} seconds</p>}
        {isFinished && <p> Number of worlds per minutes {NmbPerMunites} </p>}
      </div>
    </div>
  );
}
