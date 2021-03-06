import React, { useState, useEffect, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import { ProfileContext } from '../store/ProfilesContextProvider';

import MinimalButton from '../components/MinimalButton';
import Error404 from '../components/Error404';
import Toggle from '../components/Toggle/Toggle';
import SearchCard from '../components/SearchCard';
import SkeletonThumbnail from '../skeletons/SkeletonThumbnail';
import ascendingIcon from '../assets/ascending.svg';
import descendingIcon from '../assets/descending.svg';
import filterIcon from '../assets/filter.svg';

/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';

import { capitalize } from '../utilities/stringFormatters';

const SearchPage = () => {
  const {
    profiles = [],
    filteredProfiles,
    isFiltered,
    error,
    loading,
    dispatch,
    fetchProfiles,
    fetchProfile,
    sortByAscending,
    sortByDescending,
    lessThan30,
  } = useContext(ProfileContext);

  const [counter, setCounter] = useState(10);
  const [profilesToRender, setProfilesToRender] = useState([]);
  const [enableCounter, setEnableCounter] = useState(true);

  const counterRef = useRef();
  let history = useHistory();

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

  const handleSortAscending = () => {
    sortByAscending(isFiltered);
  };

  const handleSortDescending = () => {
    sortByDescending(isFiltered);
  };

  const handleFilter = () => {
    lessThan30(!isFiltered);
  };

  const handleToggle = () => {
    setCounter(10);
    setEnableCounter((prevState) => !prevState);
    clearInterval(counterRef.current);
  };

  const setFetchInterval = () => {
    if (enableCounter === true) {
      const countDown = () => {
        setCounter((prevState) => prevState - 1);
      };
      counterRef.current = setInterval(() => countDown(), 1000);
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

  useEffect(() => {
    console.log('lamadrid isFiltered', isFiltered);
    setProfilesToRender(!isFiltered ? profiles : filteredProfiles);
  }, [isFiltered, profiles, filteredProfiles]);

  return (
    <div>
      {error ? (
        <Error404 message={error} />
      ) : (
        <main css={stMainContainer}>
          <div css={stKeypad}>
            <div>
              {counter}
              <Toggle label="Re-fetch" checked={enableCounter} onChange={handleToggle} />
            </div>
            <div css={stFilteringButtons}>
              <MinimalButton label="filter" onClick={handleFilter}>
                <img src={filterIcon} width={22} alt="filter" />
              </MinimalButton>
              <MinimalButton label="Sort ascending" onClick={handleSortAscending}>
                <img src={ascendingIcon} width={22} alt="Sort ascending" />
              </MinimalButton>
              <MinimalButton label="Sort descending" onClick={handleSortDescending}>
                <img src={descendingIcon} width={22} alt="Sort descending" />
              </MinimalButton>
            </div>
          </div>
          <div css={stCardContainer}>
            {loading ? (
              <>
                <SkeletonThumbnail />
                <SkeletonThumbnail />
                <SkeletonThumbnail />
                <SkeletonThumbnail />
                <SkeletonThumbnail />
              </>
            ) : (
              profilesToRender.map((profile) => (
                <SearchCard
                  key={profile.id}
                  photoUrl={profile.photoUrl}
                  handle={capitalize(profile.handle)}
                  location={capitalize(profile.location)}
                  age={profile.age}
                  photoCount={profile.photoCount}
                  id={profile.id}
                  onClick={handleProfileClick}
                  label={`Profile for ${profile.handle}`}
                />
              ))
            )}
          </div>
        </main>
      )}
    </div>
  );
};

export default SearchPage;
