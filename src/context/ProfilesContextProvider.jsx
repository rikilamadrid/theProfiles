import React, { useReducer, useEffect, createContext } from 'react';
import {
  SORT_ASCENDING,
  SORT_DESCENDING,
  FETCH_PROFILES_BEGINS,
  FETCH_PROFILES_SUCCESS,
  FETCH_PROFILES_FAILURE,
  FETCH_PROFILE,
} from './constants/profileConstants';
import axios from 'axios';

export const ProfileContext = createContext({
  profiles: [],
});

function ProfilesReducer(state, action) {
  let profiles;
  let loading;
  let selectedProfile;
  let error;
  let filteredProfiles;

  switch (action.type) {
    case SORT_ASCENDING:
      profiles = [...state.profiles];
      profiles.sort((profileA, profileB) => (profileA.handle > profileB.handle ? 1 : -1));
      return { ...state, profiles };

    case SORT_DESCENDING:
      profiles = [...state.profiles];
      profiles.sort((profileA, profileB) => (profileA.handle < profileB.handle ? 1 : -1));
      return { ...state, profiles };

    case FETCH_PROFILES_BEGINS:
      loading = true;
      return { ...state, loading };

    case FETCH_PROFILES_SUCCESS:
      loading = false;
      profiles = action.payload;
      filteredProfiles = profiles.filter((profile) => profile.age < 30);
      return { ...state, loading, profiles, filteredProfiles };

    case FETCH_PROFILES_FAILURE:
      loading = false;
      error = action.payload;
      return { ...state, loading, error };

    case FETCH_PROFILE:
      selectedProfile = action.payload;
      return { ...state, selectedProfile };

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

  // Gets all the profiles
  const fetchProfiles = async () => {
    dispatch({ type: FETCH_PROFILES_BEGINS });
    const { data } = await axios.get('/api/profiles');
    // Error handling
    dispatch({ type: FETCH_PROFILES_SUCCESS, payload: data });
  };

  // Gets a profiles by id
  const fetchProfile = async (id) => {
    const { data } = await axios.get(`/api/profiles/${id}`);
    // error handling
    dispatch({ type: FETCH_PROFILE, payload: data });
  };

  // Sort by ascending order
  const sortByAscending = () => {
    dispatch({ type: SORT_ASCENDING });
  };

  // Sort by descending order
  const sortByDescending = () => {
    dispatch({ type: SORT_DESCENDING });
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        ...state,
        dispatch,
        fetchProfiles,
        fetchProfile,
        sortByAscending,
        sortByDescending,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfilesContextProvider;
