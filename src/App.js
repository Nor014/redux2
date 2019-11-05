import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import ServiceList from './components/ServiceList/ServiceList';
import Home from './components/Home/Home';
import ServiceEditor from './components/ServiceEditor/ServiceEditor';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';

import './components/ServiceList/ServiceList.css'
import './components/Error/Error.css'
import './components/Preloader/Preloader.css'
import './components/ServiceEditor/ServiceEditor.css'


function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <div>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/services' component={ServiceList} />
              <Route exact path='/services/:id' component={ServiceEditor} />
            </Switch>
          </div>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
