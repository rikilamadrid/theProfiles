import React, { useState, useEffect, useContext, useRef } from 'react';
import { ProfileContext } from '../components/ProfilesContextProvider';

/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';
import MinimalButton from '../components/MinimalButton';
import Toggle from '../components/Toggle';
import Header from '../components/Header';
import SearchCard from '../components/SearchCard';

const SearchPage = () => {
  const [counter, setCounter] = useState(10);
  const [enableCounter, setEnableCounter] = useState(true);
  const counterRef = useRef();

  const handleSortAscending = () => {
    dispatch({ type: 'ascending' });
  };

  const handleSortDescending = () => {
    dispatch({ type: 'descending' });
  };

  const stMainContainer = css`
    margin: 24px;
  `;

  const stKeypad = css`
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  `;

  const stFilteringButtons = css`
    display: flex;
    justify-content: space-between;
  `;

  const stCardContainer = css`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 16px;
  `;

  const stCounterButton = css`
    background-color: none;
    border-radius: 8px;
    cursor: pointer;
    padding: 9px 12px 8px 12px;
    outline: 0;

    &:hover {
      filter: brightness(80%) saturate(80%);
    }
  `;

  const onChangeHandler = () => {
    setCounter(10);
    setEnableCounter((prevState) => !prevState);
    clearInterval(counterRef.current);
  };

  const { profiles = [], loading, dispatch, fetchProfiles } = useContext(ProfileContext);

  useEffect(() => {
    if (enableCounter === true) {
      function tick() {
        setCounter((prevState) => prevState - 1);
      }
      counterRef.current = setInterval(() => tick(), 1000);
    }
  }, [enableCounter]);

  useEffect(() => {
    if (counter === 0) {
      setCounter(10);
      fetchProfiles();
    }
  }, [counter]);

  return (
    <div>
      <Header />
      <main css={stMainContainer}>
        <div css={stKeypad}>
          <div>
            {counter}
            <Toggle label="Re-fetch" checked={enableCounter} onChange={onChangeHandler} />
          </div>
          <div css={stFilteringButtons}>
            <MinimalButton disabled>
              <img src="filter.svg" width={22} alt="filter" />
            </MinimalButton>
            <MinimalButton onClick={handleSortAscending}>
              <img src="./ascending.svg" width={22} alt="Sort ascending" />
            </MinimalButton>
            <MinimalButton onClick={handleSortDescending}>
              <img src="./descending.svg" width={22} alt="Sort descending" />
            </MinimalButton>
          </div>
        </div>
        <div css={stCardContainer}>
          {loading
            ? '...loading'
            : profiles.map((profile) => (
                <SearchCard
                  key={profile.id}
                  photoUrl={profile.photoUrl}
                  handle={profile.handle}
                  location={profile.location}
                  age={profile.age}
                  photoCount={profile.photoCount}
                />
              ))}
        </div>
      </main>
    </div>
  );
};

export default SearchPage;
