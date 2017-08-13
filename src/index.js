 /**
  * @file CMS平台主文件
  * @author niyingfeng<yingfeng.ni@gmail.com>
  * @doc https://github.com/dvajs/dva/blob/master/README_zh-CN.md
  */

import './index.html';
import './index.less';
import dva from 'dva';
import { browserHistory } from 'dva/router';
import { message } from 'antd';

const ERROR_MSG_DURATION = 3; // 3 秒

// 1. Initialize
// const app = dva();
const app = dva({
  history: browserHistory,
  onError(e) {
    message.error(e.message, ERROR_MSG_DURATION);
  },
});

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
