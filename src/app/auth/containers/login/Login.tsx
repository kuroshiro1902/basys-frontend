import PageContainer from '@/app/shared/components/page-container';
import { useNavigate, useSearchParams } from 'react-router';
import { REDIRECT_PARAM } from '../../constants/redirect-param.const';
import { LoginForm } from '../login-form';

function Login() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const redirectParam = searchParams.get(REDIRECT_PARAM) || '/';

  const onSuccess = () => {
    setTimeout(() => {
      navigate(redirectParam);
    }, 500);
  };

  return (
    <PageContainer pageTitle="Login">
      <LoginForm onSuccess={onSuccess} />
    </PageContainer>
  );
}

export default Login;
