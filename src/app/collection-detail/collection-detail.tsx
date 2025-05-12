import PageContainer from '../shared/components/page-container';
import { useNavigate, useParams, Link } from 'react-router';
import { useGetCollectionById } from './hooks/use-get-collection-by-id.query';
import { useEffect, useState } from 'react';
import { ROUTE } from '@/router/routes.const';
import { ChevronRight, Info } from 'lucide-react';
import { message, Tooltip } from 'antd';
import UpdateCollection from './components/update-collection';
import DeleteCollection from './components/delete-collection';

function CollectionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: collection, isPending } = useGetCollectionById(Number(id));

  const [isDeleted, setIsDeleted] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (!id) {
      navigate(ROUTE.COLLECTION);
    }
  }, [id, navigate]);

  useEffect(() => {
    if (isDeleted) {
      messageApi.info('Bộ sưu tập đã bị xóa!');
      setTimeout(() => {
        navigate(ROUTE.COLLECTION);
      }, 1500);
    }
  }, [isDeleted]);

  if (!id) {
    return <div> Loading...</div>;
  }

  if (isDeleted) {
    return <div> {contextHolder}Bộ sưu tập đã bị xóa! Đang chuyển hướng...</div>;
  }

  return (
    <PageContainer pageTitle={`Bộ sưu tập - ${collection?.name ?? ''}`} activeSidebarItemId="collection">
      {isPending ? (
        <div>Loading...</div>
      ) : collection ? (
        <>
          <div data-role="header" className="p-2 bg-foreground/5">
            <h3 className="text-xl flex gap-2 items-center">
              <Link className="text-primary" to={ROUTE.COLLECTION}>
                Bộ sưu tập
              </Link>
              <ChevronRight size={16} /> {collection.name}
              <div className="flex-1 flex justify-between" data-role="actions">
                <UpdateCollection collection={collection} />
                <DeleteCollection
                  collection={collection}
                  onSuccess={() => {
                    setIsDeleted(true);
                  }}
                />
              </div>
            </h3>
            <div>
              <time className="text-sm text-foreground/50">
                <span>Lần cập nhật cuối: {new Date(collection.updated_at).toLocaleString('vi-VN')} </span>
                <Tooltip
                  title={
                    <span>
                      <time className="text-xs text-foreground/80">
                        Ngày tạo: {new Date(collection.created_at).toLocaleString('vi-VN')}
                      </time>
                      <br />
                      <time className="text-xs text-foreground/80">
                        Lần cập nhật cuối: {new Date(collection.updated_at).toLocaleString('vi-VN')}
                      </time>
                    </span>
                  }
                >
                  <Info className="inline" size={16} />
                </Tooltip>
              </time>
            </div>
            <p className="text-sm mt-4">
              <i>{collection.description}</i>
            </p>
          </div>
          <div data-role="content">
            <div className="p-2">{/* <h4>Tên bộ sưu tập</h4> */}</div>
          </div>
        </>
      ) : (
        <div>Không tìm thấy bộ sưu tập</div>
      )}
    </PageContainer>
  );
}

export default CollectionDetail;
