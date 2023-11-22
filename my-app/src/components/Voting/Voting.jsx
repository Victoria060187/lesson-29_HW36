import React, { Component } from 'react';
import SmileCard from '../SmileCard';

import './Voting.scss';

export default class Voting extends Component {
  state = {
    candidates: [],
    votes: {},
    showResults: false,
    winners: [],
  };

  handleVote = (id) => {
    this.setState((prevState) => ({
      votes: {
        ...prevState.votes,
        [id]: (prevState.votes[id] || 0) + 1,
      },
    }));
  };

  componentDidMount() {
    fetch('http://localhost:3000/data.json')
      .then((res) => res.json())
      .then((result) => {
        const ids = result.map((item) => item.id);

        const initialVotes = {};
        ids.forEach((id) => {
          initialVotes[id] = 0;
        });

        this.setState({
          candidates: result,
          votes: initialVotes,
        });
      });
  }

  findWinners = () => {
    const { votes, candidates } = this.state;
    const maxVotes = Math.max(...Object.values(votes));

    const winners = candidates.filter((candidate) => votes[candidate.id] === maxVotes);
    return winners;
  };

  handleShowResults = () => {
    const winners = this.findWinners();
    const totalVotes = Object.values(this.state.votes).reduce((acc, curr) => acc + curr, 0);
    const uniqueVotes = [...new Set(Object.values(this.state.votes))];

    this.setState({
      showResults: true,
      winners: totalVotes === 0 || uniqueVotes.length === 1 ? [] : winners,
    });
  };

  render() {
    return (
      <div>
        <h1>Choose the best smile ever:</h1>
        <div className="container">
          {!this.state.candidates.length && <div>No candidates yet...</div>}

          {this.state.candidates.map((item) => (
            <div key={item.id}>
              <SmileCard
                id={item.id}
                title={item.title}
                description={item.description}
                smile={item.smile}
                onVote={this.handleVote}
              />
              {this.state.showResults && <div>Votes: {this.state.votes[item.id]}</div>}
            </div>
          ))}

          {this.state.showResults && (
            <div>
              {this.state.winners.length > 0 ? (
                <div>
                  <p>Winners:</p>
                  <ul>
                    {this.state.winners.map((winner) => (
                      <li key={winner.id}>{winner.title}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p>No winner (Tie)</p>
              )}
            </div>
          )}

          <button className="show-results-btn" onClick={this.handleShowResults}>
            Show Results
          </button>
        </div>
      </div>
    );
  }
}