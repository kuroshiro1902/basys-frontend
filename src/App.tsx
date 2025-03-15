import { Button, ConfigProvider } from 'antd';
import theme from './antd.config';

function App() {
  return (
    <ConfigProvider theme={theme}>
      <Button className="bg-primary">Button</Button>
    </ConfigProvider>
  );
}

export default App;
