import React from 'react';
// import mockProfiles from '../profiles.json';
import axios from 'axios';

export const ProfileContext = React.createContext({
  profiles: [],
});

function ProfilesReducer(state, action) {
  let profiles;
  let loading;

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

    default:
      throw new Error();
  }
}

function ProfilesContextProvider({ children }) {
  const [state, dispatch] = React.useReducer(ProfilesReducer, {
    profiles: [],
    loading: true,
  });

  React.useEffect(() => {
    dispatch({ type: 'fetchingProfiles' });
    const fetchProfiles = async () => {
      const { data } = await axios.get('/api/profiles');
      dispatch({ type: 'fetchedProfiles', payload: data });
    };
    fetchProfiles();
  }, []);

  return (
    <ProfileContext.Provider value={{ ...state, dispatch }}>{children}</ProfileContext.Provider>
  );
}

export default ProfilesContextProvider;
