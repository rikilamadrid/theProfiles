import React, { useReducer, useEffect, createContext } from 'react';
import axios from 'axios';

export const ProfileContext = createContext({
  profiles: [],
});

function ProfilesReducer(state, action) {
  let profiles;
  let loading;
  let selectedProfile;

  switch (action.type) {
    case 'ascending':
      profiles = [...state.profiles];
      profiles.sort((profileA, profileB) => (profileA.handle > profileB.handle ? 1 : -1));
      return { profiles };

    case 'descending':
      profiles = [...state.profiles];
      profiles.sort((profileA, profileB) => (profileA.handle < profileB.handle ? 1 : -1));
      return { profiles };

    case 'fetchingProfiles':
      loading = true;
      return { loading };

    case 'fetchedProfiles':
      loading = false;
      profiles = action.payload;
      return { loading, profiles };

    case 'selectedProfile':
      selectedProfile = action.payload;
      return { selectedProfile };

    default:
      throw new Error();
  }
}

const ProfilesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProfilesReducer, {
    profiles: [],
    loading: true,
    selectedProfile: null,
  });

  const fetchProfiles = async () => {
    dispatch({ type: 'fetchingProfiles' });
    const { data } = await axios.get('/api/profiles');
    dispatch({ type: 'fetchedProfiles', payload: data });
  };

  const fetchProfile = async (id) => {
    const { data } = await axios.get(`/api/profiles/${id}`);
    dispatch({ type: 'selectedProfile', payload: data });
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  return (
    <ProfileContext.Provider value={{ ...state, dispatch, fetchProfiles, fetchProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfilesContextProvider;
