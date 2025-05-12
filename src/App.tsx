import { Button, ConfigProvider, message } from 'antd';
import theme from './antd.config';
import Router from './router/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BootstrapContext } from './app/contexts/bootstrap.context';
import { queryClient } from './query-client';

function App() {
  const [_, contextHolder] = message.useMessage();

  return (
    <ConfigProvider theme={theme}>
      {contextHolder}
      <QueryClientProvider client={queryClient}>
        <BootstrapContext>
          <Router />
        </BootstrapContext>
      </QueryClientProvider>
    </ConfigProvider>
  );
}

export default App;
