import React from 'react';
/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';

const Button = ({ label, onClick, style }) => {
  const stBackButton = css`
    border-radius: 8px;
    border: solid;
    cursor: pointer;
    display: inline-block;
    padding: 9px 12px 8px 12px;
    text-transform: uppercase;
    margin: 5px;
    outline: 0;

    background-color: #1927f0;
    border-color: #1927f0;
    border-width: 1px;
    font-size: 12px;
    color: white;
    font-weight: bold;

    &:hover {
      filter: brightness(80%) saturate(80%);
    }

    &:active {
      filter: brightness(110%) saturate(110%);
    }
  `;
  const clickHandle = (ev) => {
    ev.stopPropagation();
    onClick();
  };

  return (
    <button css={[stBackButton, style]} onClick={clickHandle} aria-label={label}>
      {label}
    </button>
  );
};

export default Button;
