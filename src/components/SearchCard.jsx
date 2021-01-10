import React from 'react';

/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';

const SearchCard = ({ photoUrl = '', handle = '', location = '', age = 99, photoCount = 0 }) => {
  const stCardContainer = css`
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  const stCard = css`
    border: 1px solid lightgray;
    border-radius: 8px;
    box-shadow: 0 3px 6px lightgray, 0 3px 6px;
    overflow: hidden;
  `;

  const stAvatar = css`
    position: relative;
    width: 200px;
    height: 200px;
  `;

  const stDashBoardContainer = css`
    position: absolute;
    width: 100%;
    bottom: 0;
    border-radius: inherit;
    overflow: hidden;
  `;

  const stDashBoard = css`
    margin: 8px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  `;

  const stDetailsContainer = css`
    color: white;
    display: flex;
    flex-direction: column;
    width: 100%;
  `;

  const stHandle = css`
    font-size: 16px;
    display: flex;
    align-items: center;
  `;

  const stAgeAndLocationContainer = css`
    display: flex;
    justify-content: space-between;
    align-items: baseline;

    > p {
      margin: 0 0.5rem 0.5rem 0;
    }
  `;

  return (
    <div css={stCardContainer}>
      <div css={stCard}>
        <div css={stAvatar}>
          <img src={photoUrl} alt="potential date"></img>
          <div css={stDashBoardContainer}>
            <div css={stDashBoard}>
              <div css={stDetailsContainer}>
                <h6 css={stHandle}>{handle}</h6>
                <div css={stAgeAndLocationContainer}>
                  <p>{location ? `${age} • ${location}` : age}</p>
                  {photoCount > 1 && <p>{photoCount}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
