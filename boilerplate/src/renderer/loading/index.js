import dva from 'dva';
import router from './router';
// import './template.html';

// 1. Initialize
const app = dva({
  onError (error) {
    message.error(error.message);
  },
});

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example'));

// 4. Router
app.router(router);

// 5. Start
app.start('#root');

export default app._store; // eslint-disable-line