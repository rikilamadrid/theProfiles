import React from 'react';
import SkeletonThumbnail from './SkeletonThumbnail';

/** @jsxImportSource @emotion/react */
import { css, jsx, keyframes } from '@emotion/react';

const SkeletonProfile = () => {
  const glow = keyframes`
    from, 0%, 100% to {
      opacity: 1;
    };

    50% {
      opacity: 0.5;
    };
  `;

  const stSkeletonContainer = css`
    background-color: #f2f2f2;
    border-radius: 4px;
    margin: 20px auto;
    padding: 10px 15px;
    position: relative;
    overflow: hidden;
  `;

  const stSkeletonProfile = css`
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 30px;
    align-items: center;
  `;

  const stSkeletonTitle = css`
    animation: ${glow} 2s infinite;
    background-color: #ddd;
    width: 50%;
    height: 20px;
    margin-bottom: 15px;
  `;

  const stSkeletonText = css`
    animation: ${glow} 2s infinite;
    background-color: #ddd;
    width: 100%;
    height: 12px;
  `;

  return (
    <div css={stSkeletonContainer}>
      <div css={stSkeletonProfile}>
        <SkeletonThumbnail />
        <div>
          <div css={stSkeletonTitle}></div>
          <div css={stSkeletonText}></div>
          <div css={stSkeletonText}></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonProfile;
