import React from 'react';
/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';

const MinimalButton = ({ label, children, onClick, style, ...props }) => {
  const stButton = css`
    background: transparent;
    border: 0;
    cursor: pointer;
    margin: 8px;
    outline: none;
  `;
  return (
    <button {...props} aria-label={label} onClick={onClick} css={[stButton, style]}>
      {children}
    </button>
  );
};

export default MinimalButton;
