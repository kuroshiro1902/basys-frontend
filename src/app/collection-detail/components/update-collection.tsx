import { useMemo, useState } from 'react';
import { Modal, Button, Input, Form, message } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TCollection, TCollectionUpdateInput, ZCollectionUpdate } from '@/core/collection/collection.model';
import { throttle } from '@/utils/throttle.util';
import { Edit2 } from 'lucide-react';
import { useUpdateCollectionMutation } from '../hooks/use-update-collection.mutation';

type props = {
  collection: TCollection;
};

function UpdateCollection({ collection }: props) {
  const [isOpen, setIsOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const {
    control,
    handleSubmit: submit,
    reset,
    formState: { errors },
  } = useForm<TCollectionUpdateInput>({
    resolver: zodResolver(ZCollectionUpdate),
    defaultValues: {
      name: collection.name,
      description: collection.description ?? undefined,
    },
  });

  const { mutateAsync: updateCollection, isPending } = useUpdateCollectionMutation(collection.id);

  const handleUpdateCollection = async (data: TCollectionUpdateInput) => {
    try {
      const updatedCollection = await updateCollection(data);
      messageApi.success('Cập nhật bộ sưu tập thành công');
      reset({ name: updatedCollection.name, description: updatedCollection.description ?? undefined });
      setIsOpen(false);
    } catch (error: any) {
      messageApi.error(error?.message ?? 'Đã xảy ra lỗi. Vui lòng thử lại sau.');
    }
  };

  const handleSubmit = useMemo(
    () => throttle((data: TCollectionUpdateInput) => handleUpdateCollection(data), 1000),
    [],
  );

  const handleClose = () => {
    setIsOpen(false);
    reset();
  };

  return (
    <div>
      {contextHolder}
      <Button type="text" size="small" onClick={() => setIsOpen(true)}>
        <Edit2 size={14} />
      </Button>
      <Modal
        title={
          <span>
            Cập nhật - <b>{collection.name}</b>
          </span>
        }
        open={isOpen}
        onCancel={handleClose}
        footer={null}
        maskClosable={false}
      >
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
            <Button type="primary" htmlType="submit" loading={isPending}>
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default UpdateCollection;
