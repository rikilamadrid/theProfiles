import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { ProfileContext } from '../context/ProfilesContextProvider';

import Button from '../components/Button/Button';
import Error404 from '../components/Error404';
import SkeletonProfile from '../skeletons/SkeletonProfile';

/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';

import { capitalize } from '../utilities/stringFormatters';

const ProfilePage = ({ match }) => {
  const [loading, setLoading] = useState(false);
  const { selectedProfile, dispatch, error, fetchProfile } = useContext(ProfileContext);
  let history = useHistory();

  const stPageContainer = css`
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 1rem;
  `;

  const stImage = css`
    border-radius: 8px;
    margin: 1rem;
  `;

  const stDetailsContainer = css`
    display: flex;
    text-align: center;
  `;

  const stInfoContainer = css`
    display: flex;
    flex-direction: column;
    text-align: initial;
    justify-content: flex-end;
    margin-bottom: 1rem;
  `;

  const stName = css`
    font-size: 20px;
    font-weight: normal;
    margin: 0.5rem;
  `;

  const stDetails = css`
    margin: 0.5rem;
  `;

  const stButton = css`
    align-self: flex-start;
  `;

  const handleGoBack = () => {
    history.goBack();
  };

  useEffect(() => {
    const reFetchProfile = async () => {
      setLoading(true);
      await fetchProfile(match.params.id);
      setLoading(false);
    };

    if (history.action === 'POP' && !selectedProfile) {
      reFetchProfile();
    }
  }, [selectedProfile, history]);

  return (
    <>
      {error ? (
        <Error404 message={error} />
      ) : (
        <main css={stPageContainer}>
          <Button label="back" onClick={handleGoBack} style={stButton} />
          {loading ? (
            <SkeletonProfile />
          ) : (
            <>
              <div css={stDetailsContainer}>
                <img css={stImage} src={selectedProfile?.photoUrl} alt="selected date" />
                <div css={stInfoContainer}>
                  <h1 css={stName}>{`Name: ${capitalize(selectedProfile?.handle)}`}</h1>
                  <p css={stDetails}>{`Age: ${selectedProfile?.age}`}</p>
                  <p css={stDetails}>{`Location: ${capitalize(selectedProfile?.location)}`}</p>
                </div>
              </div>
            </>
          )}
        </main>
      )}
    </>
  );
};

export default ProfilePage;
