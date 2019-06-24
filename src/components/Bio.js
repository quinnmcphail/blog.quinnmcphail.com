import React from 'react';
import profilePic from '../assets/profile-pic.jpg';
import { rhythm } from '../utils/typography';

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: rhythm(2),
        }}
      >
        <img
          src={profilePic}
          alt={`Quinn McPhail`}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            width: rhythm(3),
            height: rhythm(3),
            borderRadius: '50%',
          }}
        />
        <p style={{ maxWidth: 310 }}>
          Personal blog by{' '}
          <a href="https://mobile.twitter.com/quinnmcphail">Quinn McPhail</a>.
          <br />
          Lightning App Dev Champion ⚡️
          <br />
          <a href="https://docs.google.com/document/d/18ykKgtlrrPo0Z8iki4wT1SSVAbvrfYTzq5b29AndzgA/edit?usp=sharing">
            Resume
          </a>
        </p>
      </div>
    );
  }
}

export default Bio;
