import React from 'react';
import { Router, Switch, Route } from 'dva/router';
import dynamic from 'dva/dynamic';

function RouterConfig({ history, app }) {
  /* eslint-disable global-require */

  const IndexPage = dynamic({
    app,
    component: () => require('./routes/IndexPage'),
  });

  /* eslint-enable global-require */

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={IndexPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
