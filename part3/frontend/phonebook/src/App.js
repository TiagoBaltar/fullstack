import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    personService //
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      });
  }, []);

  const displayAndRefresh = (message, type) => {
    setNotification(message);
    setType(type);
    setNewName("");
    setNewNumber("");
    setTimeout(() => {
      setNotification("");
      setType("");
    }, 5000);
  };

  const addPerson = (event) => {
    event.preventDefault();

    const newPerson = { key: newName, name: newName, number: newNumber };

    if (persons.find((x) => x.name === newName)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace old number with new one?`
        )
      ) {
        const id = persons.find((x) => x.name === newName).id;
        personService //
          .update(id, newPerson)
          .then((updatedPerson) => {
            console.log(`updatedPerson ${updatedPerson}`);
            setPersons(persons.map((x) => (x.id !== id ? x : updatedPerson)));
            displayAndRefresh(`Updated ${updatedPerson.name}`, "update");
          })
          .catch(() => {
            displayAndRefresh(
              `Information on ${newName} has already been removed from server`,
              "error"
            );
          });
      } else {
        setNewName("");
        setNewNumber("");
      }
    } else {
      personService //
        .add(newPerson)
        .then((returnedPerson) => {
          console.log(`returnedPerson ${returnedPerson}`);
          setPersons(persons.concat(returnedPerson));
          displayAndRefresh(`Added ${returnedPerson.name}`, "add");
        })
        .catch((error) => {
          displayAndRefresh(
            `Error: ${JSON.stringify(error.response.data)}`,
            "error"
          );
          console.log(error.response.data);
        });
    }
  };

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => setFilter(event.target.value);
  const handleDelete = (event) => {
    const id = event.target.id;
    const name = persons.find((x) => x.id === id).name;
    if (window.confirm(`Delete ${name} ?`)) {
      personService //
        .remove(event.target.id)
        .then(() => {
          setPersons(persons.filter((x) => x.id !== id));
          setNotification(`Removed ${name}`);
          setType("remove");
          setTimeout(() => {
            setNotification("");
            setType("");
          }, 5000);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} type={type} />
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
      <Persons filter={filter} list={persons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
