import React, { useEffect, useState } from "react";
import "./Previewpage.css";

const Previewpage = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const savedCards = JSON.parse(localStorage.getItem("cards")) || [];
    setCards(savedCards);
  }, []);

  const handleDelete = (id) => {
    const updated = cards.filter((card) => card.id !== id);
    setCards(updated);
    localStorage.setItem("cards", JSON.stringify(updated));
  };

  return (
    <div className="preview-page">
      <h1>All Cards</h1>

      <div className="card-grid">
        {cards.length === 0 ? (
          <p>No cards saved yet</p>
        ) : (
          cards.map((card) => (
            <div key={card.id} className="card-item">

              <div
                className="card-top"
                style={{
                  backgroundImage: card.backgroundImage
                    ? `url(${URL.createObjectURL(card.backgroundImage)})`
                    : undefined
                }}
              ></div>

              <div className="card-content">
                <h3>{card.name}</h3>
                <p>{card.title}</p>

                <div className="actions">
                  <button onClick={() => handleDelete(card.id)}>
                    Delete
                  </button>
                </div>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Previewpage;