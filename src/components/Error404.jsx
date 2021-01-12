import React from 'react';
import errorImg from '../assets/404-error.png';

/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';

const Error404 = ({ message }) => {
  const stErrorContainer = css`
    text-align: center;
    margin: 1rem;
  `;

  return (
    <div css={stErrorContainer}>
      <img src={errorImg} alt="error 404" />
    </div>
  );
};

export default Error404;
