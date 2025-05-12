import { useEffect, useMemo, useState } from 'react';
import { Modal, Button, message } from 'antd';
import { throttle } from '@/utils/throttle.util';
import { Trash } from 'lucide-react';
import { useDeleteCollectionMutation } from '../hooks/use-delete-collection.mutation';
import { TCollection } from '@/core/collection/collection.model';

type props = {
  collection: TCollection;
  onSuccess?: () => void;
};

function DeleteCollection({ collection, onSuccess }: props) {
  const [isOpen, setIsOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const { mutateAsync: deleteCollection, isPending } = useDeleteCollectionMutation(collection.id);

  const handleDeleteCollection = async () => {
    try {
      await deleteCollection();
      messageApi.success('Xóa bộ sưu tập thành công');
      setIsOpen(false);
      onSuccess?.();
    } catch (error: any) {
      messageApi.error(error?.message ?? 'Đã xảy ra lỗi. Vui lòng thử lại sau.');
    }
  };

  const handleSubmit = useMemo(() => throttle(() => handleDeleteCollection(), 1000), []);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      {contextHolder}
      <Button danger type="dashed" size="small" onClick={() => setIsOpen(true)}>
        <Trash size={14} />
      </Button>
      <Modal
        title={
          <span>
            Xóa - <b>{collection.name}</b>
          </span>
        }
        open={isOpen}
        onCancel={handleClose}
        footer={null}
        maskClosable={false}
      >
        <p>Bạn có chắc chắn muốn xóa bộ sưu tập này?</p>
        <div className="flex justify-end gap-2">
          <Button onClick={handleClose}>Hủy</Button>
          <Button type="primary" htmlType="submit" loading={isPending} onClick={handleSubmit}>
            Xóa
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default DeleteCollection;
