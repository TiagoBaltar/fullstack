import React from "react";

const Persons = ({ filter, list }) => {
  const newList = list.filter((x) => {
    return x.name.toLowerCase().includes(filter.toLowerCase());
  });

  return newList.map((x) => (
    <p>
      {x.name} {x.number}
    </p>
  ));
};

export default Persons;
