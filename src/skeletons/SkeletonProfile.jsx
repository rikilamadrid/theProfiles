import React from 'react';

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

  const stThumbnail = css`
    animation: ${glow} 2s infinite;
    background-color: #c4c4c4;
    width: 100px;
    height: 100px;
  `;

  const stSkeletonWrapper = css`
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

  const stSkeletonAvatar = css`
    background-color: #ddd;
    width: 100px;
    height: 100px;
    border-radius: 50%;
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
    <div css={stSkeletonWrapper}>
      <div css={stSkeletonProfile}>
        <div>
          <div css={[stSkeletonAvatar]}></div>
        </div>
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
