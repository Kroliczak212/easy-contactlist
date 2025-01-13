import { useState } from "react";
import Form from "./components/Form/Form";
import PersonInfo from "./components/PersonInfo/PersonInfo";
import "./App.css";

const initialPeople = [
  {
    id: 1,
    name: "John",
    tel: 1234567890,
    city: "New York",
  },
  {
    id: 2,
    name: "Jane",
    tel: 9876543210,
    city: "Los Angeles",
  },
  {
    id: 3,
    name: "Mike",
    tel: 5555555555,
  },
];

function App() {
  const [isEditShown, setIsEditShown] = useState(false);
  const [isFormShown, setIsFormShown] = useState(false);
  const [people, setPeople] = useState(initialPeople);
  const [editPerson, setEditPerson] = useState(null);

  const handleShowFormClick = () => {
    setIsFormShown(true);
    setEditPerson(null);
  };
  const handleHideFormClick = () => {
    setIsFormShown(false);
    setEditPerson(null);
  };

  // Funkcja obsługująca dodawanie nowej osoby lub edytowanie istniejącej
const addPerson = (data) => {
  // Sprawdzamy, czy edytujemy istniejącą osobę
  if (editPerson) {
      // Aktualizujemy listę osób, modyfikując dane dla edytowanej osoby
      setPeople((prevPeople) =>
          prevPeople.map((person) =>
              // Jeśli ID osoby w liście jest równe ID edytowanej osoby, zaktualizuj jej dane
              person.id === editPerson.id ? { ...person, ...data } : person
          )
      );
      // Resetujemy edytowaną osobę i ukrywamy interfejs edycji
      setEditPerson(null);
      setIsEditShown(false);
  } else {
      // Dodajemy nową osobę do listy, generując unikalne ID
      const newPerson = { ...data, id: Date.now() };
      setPeople((prevPeople) => [...prevPeople, newPerson]);
  }
  // Ukrywamy formularz po dodaniu lub edycji osoby
  setIsFormShown(false);
};

  const handleEditPerson = (person) => {
    setEditPerson(person);
    setIsFormShown(true);
  };

  const handleDeletePerson = (id) => {
    setPeople((prevPeople) => prevPeople.filter((person) => person.id !== id));
  };

  return (
    <>
      <h1>Lista kontaktów</h1>
      {isFormShown ? (
        <Form
          onAddPerson={addPerson}
          onCancel={handleHideFormClick}
          editPerson={editPerson}
        />
      ) : (
        <div className="workButtons">
          <button className="personButton" onClick={handleShowFormClick}>
            Dodaj
          </button>

          <button onClick={() => setIsEditShown((prev) => !prev)}>
            {isEditShown ? "Zakończ" : "Edytuj"}
          </button>
        </div>
      )}
      <ul>
        {people.map((person) => (
          <PersonInfo
            key={person.id}
            name={person.name}
            tel={person.tel}
            city={person.city}
            isEditShown={isEditShown}
            onEdit={() => handleEditPerson(person)}
            onDelete={() => handleDeletePerson(person.id)}
          />
        ))}
      </ul>
    </>
  );
}

export default App;
