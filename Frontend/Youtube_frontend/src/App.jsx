import React from 'react';
import './App.css';
import Dashboard from './Dashboard'; // Import Dashboard component
import { Provider } from 'react-redux'; // Import Provider from react-redux
import store from '../src/Store/user.auth.js'; // Import your Redux store
import UserPolling from './utils/UserPolling.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Important: Include this CSS for the toast styles
import ProgressBar from './utils/ProgressBar.jsx';
import Navbar from './components/Navbar.jsx';


function App() {
  return (
    <Provider store={store}> {/* Wrap the whole app with the Provider */}
    <UserPolling/>
     
      <ToastContainer
        position="top-right" // You can choose top-left, bottom-right, etc.
        autoClose={5000} // Auto-close after 5 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* <Navbar/> */}
        <Dashboard /> 
    
    </Provider>
  );
}

export default App;
