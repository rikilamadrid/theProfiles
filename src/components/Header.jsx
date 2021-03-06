import React from 'react';
import mainLogo from '../assets/logo.svg';

/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';

const Header = () => {
  const stHeader = css`
    border-bottom: 1px solid #efefef;
    padding: 16px;
  `;

  return (
    <header css={stHeader}>
      <img src={mainLogo} alt="match" width="110" />
    </header>
  );
};

export default Header;
