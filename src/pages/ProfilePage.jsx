import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { ProfileContext } from '../context/ProfilesContextProvider';
import Button from '../components/Button';
import SkeletonProfile from '../skeletons/SkeletonProfile';

/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';

const ProfilePage = ({ match }) => {
  const [loading, setLoading] = useState(false);
  const { selectedProfile, dispatch, fetchProfile } = useContext(ProfileContext);
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
    text-align: center;
  `;

  const goBackHandler = () => {
    history.goBack();
  };

  useEffect(() => {
    const fetchingProfile = async () => {
      await fetchProfile(match.params.id);
    };

    if (history.action === 'POP' && !selectedProfile) {
      setLoading(true);
      fetchingProfile();
      setLoading(false);
    }
  }, [selectedProfile, history]);

  return (
    <main css={stPageContainer}>
      <Button label="back" onClick={goBackHandler} />
      {loading ? (
        <SkeletonProfile />
      ) : (
        <>
          <img css={stImage} src={selectedProfile?.photoUrl} alt="selected date" />
          <div css={stDetailsContainer}>
            <h1>{selectedProfile?.handle}</h1>
            <p>{selectedProfile?.age}</p>
          </div>
        </>
      )}
    </main>
  );
};

export default ProfilePage;
