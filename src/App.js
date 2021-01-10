import React from 'react';
import SearchPage from './pages/SearchPage';
import ProfilePage from './pages/ProfilePage';
import Header from './components/Header';
import ProfilesContextProvider from './context/ProfilesContextProvider';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './styles.css';

function App() {
  return (
    <ProfilesContextProvider>
      <Header />
      <Router>
        <Route path="/" component={SearchPage} exact />
        <Route path="/profiles/:id" component={ProfilePage} />
      </Router>
    </ProfilesContextProvider>
  );
}

export default App;
