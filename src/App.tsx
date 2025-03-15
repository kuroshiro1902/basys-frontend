import { Button, ConfigProvider } from 'antd';
import theme from './antd.config';
import Router from './router/router';

function App() {
  return (
    <ConfigProvider theme={theme}>
      <Router />
    </ConfigProvider>
  );
}

export default App;
