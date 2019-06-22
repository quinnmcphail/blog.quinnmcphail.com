import React from 'react';

import { rhythm } from '../utils/typography';

class Footer extends React.Component {
  render() {
    return (
      <footer
        style={{
          marginTop: rhythm(2.5),
          paddingTop: rhythm(1),
        }}
      >
        <div style={{ float: 'right' }}>
          <a href="/rss.xml" target="_blank" rel="noopener noreferrer">
            rss
          </a>
        </div>
        <a
          href="https://mobile.twitter.com/quinnmcphail"
          target="_blank"
          rel="noopener noreferrer"
        >
          twitter
        </a>{' '}
        &bull;{' '}
        <a
          href="https://github.com/quinnmcphail"
          target="_blank"
          rel="noopener noreferrer"
        >
          github
        </a>{' '}
        &bull;{' '}
        <a
          href="https://docs.google.com/document/d/18ykKgtlrrPo0Z8iki4wT1SSVAbvrfYTzq5b29AndzgA/edit?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
        >
          resume
        </a>
      </footer>
    );
  }
}

export default Footer;
