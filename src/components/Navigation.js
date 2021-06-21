import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const Navigation = (props) => {
  const { location: { pathname } } = props;
  return (
    <div className="navigation">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
          <Link class="navbar-brand" to="/">
            Appointment Booking Website
          </Link>

          <div>
            <ul className="navbar-nav ml-auto">
              <li
                className={`nav-item  ${
                  pathname === '/' ? 'active' : ''
                }`}
              >
                <Link class="nav-link" to="/">
                  Book an Appointment
                  <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li
                className={`nav-item  ${
                  pathname === '/event' ? 'active' : ''
                }`}
              >
                <Link class="nav-link" to="/event">
                  View Appointment
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Navigation);
