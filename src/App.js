import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import { Navigation } from './components';
import { BookEvent, ShowEvent } from './modules';

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route component={() => <BookEvent />} exact path="/" />
          <Route component={() => <ShowEvent />} exact path="/events" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
