import React from 'react';
import {
  Route,
  NavLink,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import Home from './components/Home';
import Viewer from './containers/Viewer';
import NotFound from './components/NotFound';
import { ReactComponent as Logo } from './ukb-logo.svg';

const routing = (
  <Router>
    <nav className="navigation">
      <NavLink
        exact
        className="navigation__item"
        activeClassName="navigation__item--active"
        to={`${process.env.PUBLIC_URL}/`}
      >
        Home
      </NavLink>
      <NavLink
        className="navigation__item"
        activeClassName="navigation__item--active"
        to={`${process.env.PUBLIC_URL}/viewer`}
      >
        Viewer
      </NavLink>
      <img src="https://www.dzne.de/typo3conf/ext/fe_website/Resources/Public/dist/Images/dzne_logo.svg" alt="" className="navigation__logo"/>
      <Logo className="navigation__logo_right"/>
    </nav>
    <Switch>
      <Route exact path={`${process.env.PUBLIC_URL}/`} component={Home} />
      <Route
        exact
        path={`${process.env.PUBLIC_URL}/viewer`}
        component={Viewer}
      />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default routing;
