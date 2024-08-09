import  React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type PropsType = {
  isOpen: boolean;

  closeModal: () => void;
};

const LevelModal = ({ isOpen, closeModal }: PropsType) => {
  const [level, setLevel] = useState<string>("");
  let navigate = useNavigate();
  if (["easy", "medium", "hard"].includes(level)) {
    navigate(`/quiz/${level}`);
  }
  return (
    <div>
      {isOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={closeModal}>
              ×
            </button>
            <h2 className="modal-title">Select the level</h2>
            <div className="modal-content">
              <button className="modal-btn" onClick={() => setLevel("easy")}>
                Easy
              </button>
              <button  className="modal-btn" onClick={() => setLevel("medium")}>
                Medium 
              </button>
              <button className="modal-btn" onClick={() => setLevel("hard")}>
                Hard 
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(LevelModal);
