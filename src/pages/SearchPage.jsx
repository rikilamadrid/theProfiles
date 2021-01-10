import React, { useState, useEffect, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { ProfileContext } from '../context/ProfilesContextProvider';

/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';
import MinimalButton from '../components/MinimalButton';
import Toggle from '../components/Toggle';
import SearchCard from '../components/SearchCard';

const SearchPage = () => {
  const { profiles = [], loading, dispatch, fetchProfiles, fetchProfile } = useContext(
    ProfileContext
  );
  const [counter, setCounter] = useState(10);
  const [enableCounter, setEnableCounter] = useState(true);
  const counterRef = useRef();
  let history = useHistory();

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

  const handleProfileClick = async (id) => {
    fetchProfile(id);
    history.push(`profiles/${id}`);
  };

  const onChangeHandler = () => {
    setCounter(10);
    setEnableCounter((prevState) => !prevState);
    clearInterval(counterRef.current);
  };

  const setFetchInterval = () => {
    if (enableCounter === true) {
      function tick() {
        setCounter((prevState) => prevState - 1);
      }
      counterRef.current = setInterval(() => tick(), 1000);
    }
  };

  useEffect(() => {
    if (history.action === 'POP') {
      setCounter(10);
      fetchProfiles();
    }
  }, [history]);

  useEffect(() => {
    setFetchInterval();
  }, [enableCounter]);

  useEffect(() => {
    if (counter === 0) {
      setCounter(10);
      fetchProfiles();
    }
  }, [counter, fetchProfiles]);

  return (
    <div>
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
                  id={profile.id}
                  onClick={handleProfileClick}
                />
              ))}
        </div>
      </main>
    </div>
  );
};

export default SearchPage;
