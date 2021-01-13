import React, { useReducer, useEffect, createContext } from 'react';
import {
  SORT_ASCENDING,
  SORT_DESCENDING,
  FETCH_PROFILES_BEGINS,
  FETCH_PROFILES_SUCCESS,
  FETCH_PROFILES_FAILURE,
  FETCH_PROFILE_BEGINS,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,
  LESS_THAN_30,
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
  let isFiltered;

  switch (action.type) {
    case SORT_ASCENDING:
      isFiltered = action.payload;
      profiles = [...state.profiles];
      filteredProfiles = [...state.filteredProfiles];

      filteredProfiles.sort((profileA, profileB) => (profileA.handle > profileB.handle ? 1 : -1));
      profiles.sort((profileA, profileB) => (profileA.handle > profileB.handle ? 1 : -1));
      return { ...state, profiles, filteredProfiles, isFiltered };

    case SORT_DESCENDING:
      isFiltered = action.payload;
      profiles = [...state.profiles];
      filteredProfiles = [...state.filteredProfiles];

      filteredProfiles.sort((profileA, profileB) => (profileA.handle < profileB.handle ? 1 : -1));
      profiles.sort((profileA, profileB) => (profileA.handle < profileB.handle ? 1 : -1));
      return { ...state, profiles, filteredProfiles, isFiltered };

    case LESS_THAN_30:
      isFiltered = action.payload;
      return { ...state, isFiltered };

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

    case FETCH_PROFILE_BEGINS:
      loading = true;
      return { ...state, loading };

    case FETCH_PROFILE_SUCCESS:
      selectedProfile = action.payload;
      return { ...state, selectedProfile };

    case FETCH_PROFILE_FAILURE:
      loading = false;
      error = action.payload;
      return { ...state, loading, error };

    default:
      throw new Error();
  }
}

const ProfilesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProfilesReducer, {
    profiles: [],
    loading: true,
    error: null,
    selectedProfile: null,
    isFiltered: false,
  });

  // Gets all the profiles
  const fetchProfiles = async () => {
    try {
      dispatch({ type: FETCH_PROFILES_BEGINS });
      const { data } = await axios.get('/api/profiles');
      dispatch({ type: FETCH_PROFILES_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: FETCH_PROFILES_FAILURE, payload: error.response.data.message });
    }
  };

  // Gets a profile by id
  const fetchProfile = async (id) => {
    try {
      dispatch({ type: FETCH_PROFILE_BEGINS });
      const { data } = await axios.get(`/api/profiles/${id}`);
      dispatch({ type: FETCH_PROFILE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: FETCH_PROFILE_FAILURE, payload: error.response.data.message });
    }
  };

  // Sort by ascending order
  const sortByAscending = (toggleFilter) => {
    console.log('lamadrid state', state);
    dispatch({ type: SORT_ASCENDING, payload: toggleFilter });
  };

  // Sort by descending order
  const sortByDescending = (toggleFilter) => {
    dispatch({ type: SORT_DESCENDING, payload: toggleFilter });
  };

  // Show less than 30 years old
  const lessThan30 = (isFiltered) => {
    dispatch({ type: LESS_THAN_30, payload: isFiltered });
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
        lessThan30,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfilesContextProvider;
