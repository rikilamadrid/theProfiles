import React from 'react';

/** @jsxImportSource @emotion/react */
import { css, jsx, keyframes } from '@emotion/react';

const SkeletonThumbnail = () => {
  const glow = keyframes`
    from, 0%, 100% to {
      opacity: 1;
    };

    50% {
      opacity: 0.5;
    };
  `;

  const stThumbnailContainer = css`
    display: flex;
    justify-content: center;
  `;

  const stThumbnail = css`
    animation: ${glow} 2s infinite;
    border-radius: 8px;
    background-color: #c4c4c4;
    width: 200px;
    height: 200px;
  `;

  return (
    <div css={stThumbnailContainer}>
      <div css={stThumbnail}></div>
    </div>
  );
};

export default SkeletonThumbnail;
