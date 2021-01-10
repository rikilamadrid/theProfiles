import React from 'react';
import SearchPage from './pages/SearchPage';
import ProfilePage from './pages/ProfilePage';
import ProfilesContextProvider from './components/ProfilesContextProvider';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './styles.css';

function App() {
  return (
    <ProfilesContextProvider>
      <Router>
        <Route path="/" component={SearchPage} exact />
        <Route path="/profiles/:id" component={ProfilePage} exact />
      </Router>
    </ProfilesContextProvider>
  );
}

export default App;
