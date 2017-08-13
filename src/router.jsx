import React, { PropTypes } from 'react';
import { Router, Route} from 'dva/router';
import IndexPage from './routes/IndexPage';

// router 路由配置 可使用链接放置参数数据
// export default function({ history }) {
//     return (
//         <Router history={history}>
//             <Route path="/admin-hw" component={IndexPage} />
//             <Route path="/admin-hw/:FeatureId(/:params)" component={IndexPage} />
//         </Router>
//     );
// };


function RouterConfig({ history, app }) {
  const routes = [
    {
      path: '/admin-hw',
      name: 'IndexPage',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('./routes/IndexPage'));
        });
      },
    },
    {
      path: '/admin-hw/:FeatureId(/:params)',
      name: 'FeaturePage',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
        //   registerModel(app, require('./models/users'));
            cb(null, require('./routes/IndexPage'));   
        });
      },
    },
  ];

  return <Router history={history} routes={routes} />;
}

export default RouterConfig;