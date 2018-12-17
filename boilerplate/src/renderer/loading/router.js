import React from 'react';
import PropTypes from 'prop-types';
import { routerRedux, Switch, Route, Redirect } from 'dva/router';
import dynamic from 'dva/dynamic';

const { ConnectedRouter } = routerRedux;

const Routers = ({ history, app }) => {
  window.app = app;

  const IndexPage = dynamic({
    app,
    component: () => import('./routes/IndexPage'),
  });

  return (
    <ConnectedRouter history={history}>
      <div>
        React Rotuer Course
        <Switch>
          <Route exact path='/' render={() => <Redirect to='/index' />} />
          <Route exact path='/index' component={IndexPage} />
        </Switch>
      </div>
    </ConnectedRouter>
  )
};

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers;