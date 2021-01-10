import React, { useContext } from 'react';
import { ProfileContext } from './ProfilesContextProvider';

/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';
import MinimalButton from './MinimalButton';
import Header from './Header';
import SearchCard from './SearchCard';

const SearchPage = () => {
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
    justify-content: flex-end;
  `;

  const stCardContainer = css`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 16px;
  `;

  const { profiles = [], loading, dispatch } = useContext(ProfileContext);

  return (
    <div>
      <Header />

      <main css={stMainContainer}>
        <div css={stKeypad}>
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
