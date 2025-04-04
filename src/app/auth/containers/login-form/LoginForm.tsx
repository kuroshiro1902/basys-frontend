import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input, Button, Form } from 'antd';
import { TUser, UserInputSchema } from '@/app/auth/models/user.model';
import { authService } from '../../auth.service';
import { useAuthStore } from '../../auth.store';
import { useShallow } from 'zustand/react/shallow';
import { useEffect } from 'react';

const loginSchema = UserInputSchema.pick({ email: true, password: true });

type LoginFormValues = z.infer<typeof loginSchema>;

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
  } = authService.useLoginMutation({
    onSuccess: (data) => {
      setUser(data.user, data.access_token);
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
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
  const onSubmit = (data: LoginFormValues) => {
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
