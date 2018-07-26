/**
 *
 * WelcomeContent
 *
 */

import React from 'react';
// import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import styles from './styles.scss';

/* eslint-disable jsx-a11y/accessible-emoji */
function WelcomeContent() {
  return (
    <React.Fragment>
      <div className={styles.iconWave}>👋</div>
      <div className={styles.welcomeMessage}>Welcome to the dashboard !</div>      
    </React.Fragment>
  );
}

WelcomeContent.defaultProps = {
  hasContent: false,
};

WelcomeContent.propTypes = {
  hasContent: PropTypes.bool,
};

export default WelcomeContent;
