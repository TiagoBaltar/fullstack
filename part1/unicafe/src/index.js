import React, { useState } from "react";
import ReactDOM from "react-dom";

const Header = ({ text }) => <h1>{text}</h1>;

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const Stat = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = ((good - bad) / total).toFixed(2);
  const positive = ((good / total) * 100).toFixed(2) + " %";

  if (total > 0) {
    return (
      <div>
        <table>
          <tbody>
            <Stat text={"good"} value={good} />
            <Stat text={"neutral"} value={neutral} />
            <Stat text={"bad"} value={bad} />
            <Stat text={"all"} value={total} />
            <Stat text={"average"} value={average} />
            <Stat text={"positive"} value={positive} />
          </tbody>
        </table>
      </div>
    );
  }

  return <div>No feedback given</div>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const setGoodClick = () => setGood(good + 1);
  const setNeutralClick = () => setNeutral(neutral + 1);
  const setBadClick = () => setBad(bad + 1);

  return (
    <div>
      <Header text={"give feedback"} />
      <Button handleClick={setGoodClick} text={"Good"} />
      <Button handleClick={setNeutralClick} text={"Neutral"} />
      <Button handleClick={setBadClick} text={"Bad"} />
      <Header text={"statistics"} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
