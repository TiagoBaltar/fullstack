import React, { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const addPerson = (event) => {
    event.preventDefault();

    const newPerson = { name: newName, number: newNumber, key: newName };

    if (persons.find((x) => x.name === newName)) {
      window.alert(`${newName} is already added to phonebook`);
      setNewName("");
      setNewNumber("");
    } else {
      setPersons(persons.concat(newPerson));
      setNewName("");
    }
  };

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => setFilter(event.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange} />

      <h3>Add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        name={newName}
        onChangeName={handleNameChange}
        number={newNumber}
        onChangeNumber={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons filter={filter} list={persons} />
    </div>
  );
};

export default App;
