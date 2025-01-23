import React, { useState } from 'react';
import styles from './Card.module.css';

function Card() {
  // State variables for the game
  const [count, setCount] = useState(0); // Click counter
  const [score, setScore] = useState(0); // Total score
  const [prize, setPrize] = useState(null); // Prize received

  // Function to handle the button click
  const handleClick = async () => {
    // Increment the click counter
    setCount((prevCount) => prevCount + 1);

    try {
      // Call the backend API
      const response = await fetch('http://localhost:3000/api/click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      
      // Parse the JSON response
      const data = await response.json();

      // Update the score and prize based on the backend response
      setScore((prevScore) => prevScore + data.points);
      if (data.prize) {
        setPrize(data.prize); // Set prize if any
      } else {
        setPrize(null); // Reset prize if none received
      }
    } catch (error) {
      console.error('Error while calling the backend:', error);
    }
  };

  return (
    <div className={styles.cards}>
      <h1>Click Game</h1>
      <div>
        <strong>Total Score:</strong> {score}
      </div>
      <div>
        <strong>Click Counter:</strong> {count}
      </div>
      { (
        <div>
          <strong>Prize:</strong> {prize}
        </div>
      )}
      <button onClick={handleClick}>
        Click Me!
      </button>
    </div>
  );
}

export default Card;
