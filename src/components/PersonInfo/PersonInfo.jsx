import { useState } from "react";
import { Tel } from "../Tel";
import "./PersonInfo.css";

const PersonInfo = ({ name, tel, city, isEditShown, onEdit, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <li className={isExpanded ? "active" : ""}>
      <h2>{name}</h2>
      <button onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? "Schowaj" : "Pokaż"}
      </button>

      {isEditShown && (
        <>
          <button onClick={onEdit}>Edytuj</button>
          <button onClick={onDelete}>Usuń</button>
        </>
      )}

      {isExpanded && (
        <>
          <h3>
            Tel: <Tel tel={tel} />
          </h3>
          {city && <h3>Miasto: {city}</h3>}
        </>
      )}
    </li>
  );
};

export default PersonInfo;
