import { useNavigate, useSearchParams } from 'react-router';
import PageContainer from '@/app/shared/components/page-container';
import LoginForm from './components/LoginForm';
import { REDIRECT_PARAM } from '@/core/auth/constants/redirect-param.const';

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
