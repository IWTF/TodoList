import dva from 'dva';
import './index.css';

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model， 如果不在这里注册model，改仓库不会生效
app.model(require('./models/example').default);
app.model(require('./models/ListItem').default);
app.model(require('./models/noteItems').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
