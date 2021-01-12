import React from 'react';

/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';

const Error404 = ({ message }) => {
  const stErrorContainer = css`
    text-align: center;
    margin: 1rem;
  `;

  return <div css={stErrorContainer}>{message}</div>;
};

export default Error404;
