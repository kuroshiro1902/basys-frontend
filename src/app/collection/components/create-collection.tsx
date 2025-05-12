import { useMemo, useState } from 'react';
import { Modal, Button, Input, Form, message } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TCollectionCreateInput, ZCollectionCreate } from '@/core/collection/collection.model';
import { throttle } from '@/utils/throttle.util';
import { collectionService } from '@/core/collection/collection.service';

type props = {
  onSuccess?: () => void;
};

function CreateCollection({ onSuccess }: props) {
  const [isOpen, setIsOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const {
    control,
    handleSubmit: submit,
    reset,
    formState: { errors },
  } = useForm<TCollectionCreateInput>({
    resolver: zodResolver(ZCollectionCreate),
    defaultValues: {
      name: '',
    },
  });

  const handleCreateCollection = async (data: TCollectionCreateInput) => {
    try {
      await collectionService.createCollection(data);
      messageApi.success('Tạo bộ sưu tập thành công');
      reset({ name: '', description: '' });
      setIsOpen(false);
      onSuccess?.();
    } catch (error: any) {
      messageApi.error(error?.message ?? 'Đã xảy ra lỗi. Vui lòng thử lại sau.');
    }
  };

  const handleSubmit = useMemo(
    () => throttle((data: TCollectionCreateInput) => handleCreateCollection(data), 1000),
    [],
  );

  const handleClose = () => {
    setIsOpen(false);
    reset();
  };

  return (
    <div>
      {contextHolder}
      <Button type="primary" onClick={() => setIsOpen(true)}>
        Tạo bộ sưu tập
      </Button>

      <Modal title="Tạo bộ sưu tập mới" open={isOpen} onCancel={handleClose} footer={null} maskClosable={false}>
        <Form layout="vertical" onFinish={submit(handleSubmit)} className="mt-4">
          <Form.Item
            label="Tên bộ sưu tập"
            validateStatus={errors.name ? 'error' : ''}
            help={errors.name?.message}
            required
          >
            <Controller
              name="name"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Nhập tên bộ sưu tập" autoComplete="off" />}
            />
          </Form.Item>

          <Form.Item
            label="Mô tả"
            validateStatus={errors.description ? 'error' : ''}
            help={errors.description?.message}
          >
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Input.TextArea {...field} placeholder="Nhập mô tả bộ sưu tập" autoComplete="off" />
              )}
            />
          </Form.Item>

          <Form.Item className="mb-0 flex justify-end gap-2">
            <Button onClick={handleClose}>Hủy</Button>
            <Button type="primary" htmlType="submit">
              Tạo bộ sưu tập
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default CreateCollection;
