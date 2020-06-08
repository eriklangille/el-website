import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken';
import './App.css';

import PrivateRoute from './components/PrivateRoute.js';

// Reducers
import authReducer from './reducers/authReducer';
import errorReducer from './reducers/errorReducer';
import { loginUser, setCurrentUser, logoutUser } from './actions/authActions';

// Components
import Navbar from './components/Navbar.js'
import Home from './pages/Home';
import Projects from './pages/Projects';
import Footer from './components/Footer.js';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost.js';
import Login from './pages/Login.js';
import Dashboard from './pages/Dashboard.js';
import NewPost from './pages/NewPost.js';

export const UserContext = React.createContext({});

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false
};

const ErrorInitialState = {};

const UserContextProvider = props => {
  const [state, authDispatch] = React.useReducer(authReducer, initialState);
  const [state1, errorDispatch] = React.useReducer(errorReducer, ErrorInitialState);

  const dispatch = (params) => {
    console.log("states ", state, state1);
    console.log("params ", params);
    authDispatch(params);
    errorDispatch(params);
  };

  if (localStorage.jwtToken && !state.isAuthenticated) {
    // Set auth token header auth
    const token = localStorage.jwtToken;
    console.log("token", token);
    setAuthToken(token);
    //Decode token and get user info and exp
    const decoded = jwt_decode(token);
    //Set user and isAuthenticated
    dispatch(setCurrentUser(decoded));

    //Check if the token is expired
    const currentTime = Date.now() / 1000; //convert to ms.
    if (decoded.exp < currentTime) {
      //Logout user
      dispatch(logoutUser());
      //Redirect to login screen.
      window.location.href = "./login";
    }
  }
  
  return (
    <UserContext.Provider value={{auth: state, errors: state1, handleLogin: (userData) => loginUser(userData).then(res => dispatch(res))}}>
    {props.children}
    </UserContext.Provider>
  );
};

function App() {
  
  return (
    <UserContextProvider>
      <div className='App'>
        <Router >
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/Login" exact component={Login} />
            <PrivateRoute path="/Dashboard" exact component={Dashboard} />
            <Route path="/Projects" exact component={Projects} />
            <Route path="/Blog" exact component={Blog} />
            <PrivateRoute path="/Blog/New" exact component={NewPost} />
            <Route path="/Blog/:id" exact component={BlogPost} />
          </Switch>
          <Footer />
        </Router>
      </div>
    </UserContextProvider>
  );
}

export default App;
