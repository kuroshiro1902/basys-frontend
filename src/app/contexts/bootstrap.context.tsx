import { useEffect, useState } from 'react';
import { apiService } from '../shared/services/api.service';

export const BootstrapContext = ({ children }: any) => {
  const [isBootstrapped, setIsBootstrapped] = useState(false);

  useEffect(() => {
    apiService.verifyAccessToken().finally(() => setIsBootstrapped(true));
  }, []);

  if (!isBootstrapped) return <div>Loading...</div>;

  return <>{children}</>;
};
