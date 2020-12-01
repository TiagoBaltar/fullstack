import React from "react";

const Persons = ({ filter, list, handleDelete }) => {
  const newList = list.filter((x) => {
    return x.name.toLowerCase().includes(filter.toLowerCase());
  });

  return newList.map((x) => (
    <p key={x.name}>
      {x.name} {x.number}{" "}
      <button onClick={handleDelete} id={x.id}>
        delete
      </button>
    </p>
  ));
};

export default Persons;
