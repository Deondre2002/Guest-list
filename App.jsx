import { useState, useEffect } from "react";
import "./index.css";

const cohort_name = "2506-ftb-et-web-pt";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${cohort_name}/guests`;

function App() {
  const [guests, setGuests] = useState([]);
  const [selectedGuest, setSelectedGuest] = useState(null);

  useEffect(() => {
    async function fetchGuests() {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setGuests(data.data); // API gives { data: [...] }
      } catch (err) {
        console.error("Couldn't fetch guests", err);
      }
    }
    fetchGuests();
  }, []);

  async function selectGuest(id) {
    try {
      const res = await fetch(`${API_URL}/${id}`);
      const data = await res.json();
      setSelectedGuest(data.data); // API gives { data: {...} }
    } catch (err) {
      console.error("Couldn't fetch guest by id", err);
    }
  }

  function handleBack() {
    setSelectedGuest(null);
  }

  return (
    <div className="App">
      <h1>Guest list</h1>

      {selectedGuest ? (
        <div>
          <h3>{selectedGuest.name}</h3>
          <p>
            <strong>Email:</strong> {selectedGuest.email}
          </p>
          <p>
            <strong>Phone:</strong> {selectedGuest.phone}
          </p>
          <p>
            <strong>Job:</strong> {selectedGuest.job}
          </p>
          <p>
            <strong>Bio:</strong> {selectedGuest.bio}
          </p>
          <button onClick={handleBack}>Back</button>
        </div>
      ) : (
        <ul>
          {guests.map((guest) => (
            <li key={guest.id} onClick={() => selectGuest(guest.id)}>
              <strong>{guest.name}</strong> - {guest.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
