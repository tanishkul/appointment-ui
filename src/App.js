import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Navigation, Footer } from './components';
import { BookEvent, ShowEvent } from './modules';

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route component={() => <BookEvent />} exact path="/" />
          <Route component={() => <ShowEvent />} exact path="/event" />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
