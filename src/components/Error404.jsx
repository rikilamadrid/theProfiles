import React from 'react';
import { useHistory } from 'react-router-dom';

import errorImg from '../assets/404-error.png';
import Button from '../components/Button/Button';

/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';

const Error404 = ({ message }) => {
  let history = useHistory();

  const stErrorContainer = css`
    margin: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <div css={stErrorContainer}>
      <h1>{message}</h1>
      <Button label="back" onClick={handleGoBack} />
      <img src={errorImg} alt="error 404" />
    </div>
  );
};

export default Error404;
