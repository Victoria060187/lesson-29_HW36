import { Component } from 'react'
import {func, number, string} from 'prop-types';

import './SmileCard.scss';

export default class SmileCard extends Component {
  handleClick = () => {
    const { onVote, id } = this.props;
    onVote(id);
  }

  render() {
    
    const { smile, title, description } = this.props;
    return (
      <div className='SmileCard' onClick={this.handleClick}>
        <div>{smile}</div>
        <div>
          <h3>{title}</h3>
          <div>{description}</div>
        </div>
      </div>
    )
  }
}

SmileCard.propTypes = {
  id: number,
  smile: string,
  title: string,
  description: string,
  onVote: func,
};

SmileCard.defaultProps = {
  id: 0,
  smile: 'SMILE',
  title: 'TITLE',
  description: 'DESCRIPTION',
  onVote: () => {},
}
