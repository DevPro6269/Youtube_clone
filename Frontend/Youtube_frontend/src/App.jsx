import React from 'react';
import './App.css';
import Dashboard from './Dashboard'; // Import Dashboard component
import { Provider } from 'react-redux'; // Import Provider from react-redux
import store from '../src/Store/user.auth.js'; // Import your Redux store
import UserPolling from './utils/UserPolling.jsx';

function App() {
  return (
    <Provider store={store}> {/* Wrap the whole app with the Provider */}
    <UserPolling/>
      <div>
        <Dashboard /> {/* Render Dashboard */}
      </div>
    </Provider>
  );
}

export default App;
