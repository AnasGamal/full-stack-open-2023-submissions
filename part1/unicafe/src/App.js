import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>
const Statistics = ({good,neutral,bad}) => {
  const totalFeedback = good + neutral + bad;
  const averageScore = totalFeedback !== 0 ? (good - bad) / totalFeedback : 0;
  const positivePercentage = totalFeedback !== 0 ? (good / totalFeedback) * 100 : 0;

  return (
    <>
      <p>all {totalFeedback}</p>
      <p>average {averageScore}</p>
      <p>positive {positivePercentage}%</p>
    </>
  );
};
const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>
const StatisticLine = ({text, value}) => <tr><td>{text}</td><td>{value}</td></tr>

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
  };

  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };

  const handleBad = () => {
    setBad(bad + 1);
  };
  const renderFeedback = () => {
    const feedbackGiven = good + neutral + bad > 0;
    return feedbackGiven ? <Statistics good={good} neutral={neutral} bad={bad} /> : <p>No feedback given</p>;
  };

  return (
    <div>
      <Header text="give feedback" />
      <Button handleClick={handleGood} text="good" />
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleBad} text="bad" />
      <Header text="statistics" />
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
        </tbody>
      </table>
      {renderFeedback()}
      </div>
  )
}

export default App