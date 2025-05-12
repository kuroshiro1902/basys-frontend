import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Button, Form } from 'antd';
import { TUser, TUserLoginInput, ZUserLoginInput } from '@/core/user/models/user.model';
import { useShallow } from 'zustand/react/shallow';
import { useEffect } from 'react';
import { useAuthStore } from '@/core/auth/auth.store';
import useLoginMutation from '../hooks/use-login.mutation';

type props = {
  onSuccess?: (user: TUser) => void;
};

function LoginForm({ onSuccess = () => {} }: props) {
  const { user, setUser } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
      setUser: state.setUser,
    })),
  );

  const {
    mutate: login,
    isPending,
    error,
  } = useLoginMutation({
    onSuccess: (data) => {
      setUser(data.access_token);
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TUserLoginInput>({
    resolver: zodResolver(ZUserLoginInput),
    disabled: isPending || !!user,
  });

  useEffect(() => {
    if (user) {
      onSuccess(user);
    }
  }, [user, onSuccess]);

  if (user) {
    return <></>;
  }
  const onSubmit = (data: TUserLoginInput) => {
    login(data);
  };

  return (
    <Form
      onFinish={handleSubmit(onSubmit)}
      layout="vertical"
      className="min-w-xs p-6! bg-background shadow-lg rounded-lg"
    >
      <h2 className="text-xl font-bold text-center mb-4">Đăng nhập</h2>

      <Form.Item label="Email" validateStatus={errors.email ? 'error' : ''} help={errors.email?.message}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => <Input {...field} placeholder="Nhập email" />}
        />
      </Form.Item>

      <Form.Item label="Mật khẩu" validateStatus={errors.password ? 'error' : ''} help={errors.password?.message}>
        <Controller
          name="password"
          control={control}
          render={({ field }) => <Input.Password {...field} placeholder="Nhập mật khẩu" />}
        />
      </Form.Item>

      <p className="text-red-500">{error?.message}</p>
      <Button type="primary" htmlType="submit" block loading={isPending}>
        Đăng nhập
      </Button>
    </Form>
  );
}

export default LoginForm;
