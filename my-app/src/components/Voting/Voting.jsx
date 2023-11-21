import React, { Component } from 'react';
import SmileCard from '../SmileCard';

import './Voting.scss';

export default class Voting extends Component {
  state = {
    candidates: [],
    votes: {},
    showResults: false,
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

  handleShowResults = () => {
    this.setState({
      showResults: true,
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

          <button className="show-results-btn" onClick={this.handleShowResults}>Show Results</button>
        </div>
      </div>
    );
  }
}