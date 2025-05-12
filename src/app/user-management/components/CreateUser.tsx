import { useMemo, useState } from 'react';
import { Modal, Button, Input, Form, message } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZUserCreateInput, TUserCreateInput } from '@/core/user/models/user.model';
import { throttle } from '@/utils/throttle.util';
import useSignupMutation from '@/app/auth/hooks/use-signup.mutation';

type props = {
  onSuccess?: () => void;
};

function CreateUser({ onSuccess }: props) {
  const [isOpen, setIsOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const {
    control,
    handleSubmit: submit,
    reset,
    formState: { errors },
  } = useForm<TUserCreateInput>({
    resolver: zodResolver(ZUserCreateInput),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { mutate: createUser, isPending } = useSignupMutation({
    onSuccess: () => {
      messageApi.success('Tạo tài khoản thành công');
      reset({ name: '', email: '', password: '', confirmPassword: '' });
      setIsOpen(false);
      onSuccess?.();
    },
    onError: (error: any) => {
      messageApi.error(error?.message ?? 'Đã xảy ra lỗi. Vui lòng thử lại sau.');
    },
  });

  const handleSubmit = useMemo(() => throttle((data: TUserCreateInput) => createUser(data), 1000), [createUser]);

  const handleClose = () => {
    setIsOpen(false);
    reset();
  };

  return (
    <div>
      {contextHolder}
      <Button type="primary" onClick={() => setIsOpen(true)}>
        Tạo tài khoản
      </Button>

      <Modal title="Tạo tài khoản mới" open={isOpen} onCancel={handleClose} footer={null} maskClosable={false}>
        <Form disabled={isPending} layout="vertical" onFinish={submit(handleSubmit)} className="mt-4">
          <Form.Item
            label="Tên người dùng"
            validateStatus={errors.name ? 'error' : ''}
            help={errors.name?.message}
            required
          >
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Nhập tên người dùng" autoComplete="off" disabled={isPending} />
              )}
            />
          </Form.Item>

          <Form.Item label="Email" validateStatus={errors.email ? 'error' : ''} help={errors.email?.message} required>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input {...field} type="email" placeholder="Nhập email" autoComplete="off" disabled={isPending} />
              )}
            />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            validateStatus={errors.password ? 'error' : ''}
            help={errors.password?.message}
            required
          >
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  placeholder="Nhập mật khẩu"
                  autoComplete="new-password"
                  disabled={isPending}
                />
              )}
            />
          </Form.Item>

          <Form.Item
            label="Xác nhận mật khẩu"
            validateStatus={errors.confirmPassword ? 'error' : ''}
            help={errors.confirmPassword?.message}
            required
          >
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  placeholder="Nhập lại mật khẩu"
                  autoComplete="new-password"
                  disabled={isPending}
                />
              )}
            />
          </Form.Item>

          <Form.Item className="mb-0 flex justify-end gap-2">
            <Button onClick={handleClose}>Hủy</Button>
            <Button type="primary" htmlType="submit" loading={isPending}>
              Tạo tài khoản
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default CreateUser;
