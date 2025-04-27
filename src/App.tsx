import { Button, ConfigProvider } from 'antd';
import theme from './antd.config';
import Router from './router/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BootstrapContext } from './app/contexts/bootstrap.context';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false, gcTime: 5 * 60 * 1000 } },
});

function App() {
  return (
    <ConfigProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <BootstrapContext>
          <Router />
        </BootstrapContext>
      </QueryClientProvider>
    </ConfigProvider>
  );
}

export default App;
