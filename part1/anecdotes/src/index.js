import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const Header = ({ text }) => <h1>{text}</h1>;

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState(Array(anecdotes.length).fill(0));

  const getRandomAnecdote = () => {
    const rand = Math.floor(Math.random() * anecdotes.length);
    setSelected(rand);
  };

  const voteAnecdote = () => {
    let newVote = [...vote];
    newVote[selected] += 1;

    setVote(newVote);
  };

  const mostVoted = vote.indexOf(Math.max(...vote));

  return (
    <div>
      <Header text={"Anecdote of the day"} />

      <p>{props.anecdotes[selected]}</p>
      <p>has {vote[selected]} votes</p>

      <Button handleClick={voteAnecdote} text={"vote"} />
      <Button handleClick={getRandomAnecdote} text={"next anecdote"} />

      <Header text={"Anecdote with most votes"} />
      <p>{props.anecdotes[mostVoted]}</p>
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
