import { useState } from 'react';
import PageContainer from '../shared/components/page-container';
import { Table, Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useGetCollections } from './hooks/use-get-collections.query';
import { TCollection } from '@/core/collection/collection.model';
import { throttle } from '@/utils/throttle.util';
import { useMemo } from 'react';
import CreateCollection from './components/create-collection';
import { ROUTE } from '@/router/routes.const';
import { Link } from 'react-router';

const columns: ColumnsType<TCollection> = [
  {
    title: 'STT',
    dataIndex: 'index',
    render: (_: any, __: any, index: number) => index + 1,
  },
  {
    title: 'Tên',
    dataIndex: 'name',
  },
  {
    title: 'Mô tả',
    dataIndex: 'description',
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'created_at',
    render: (value: TCollection['created_at']) => (value ? new Date(value).toLocaleString('vi-VN') : 'Unknown'),
  },
  {
    title: 'Lần cập nhật cuối',
    dataIndex: 'updated_at',
    render: (value: TCollection['updated_at']) => (value ? new Date(value).toLocaleString('vi-VN') : 'Unknown'),
  },
  {
    title: '',
    dataIndex: 'action',
    render: (_: any, record: TCollection) => (
      <div className="flex justify-end">
        <Link to={`${ROUTE.COLLECTION}/${record.id}`}>
          <Button type="link">Chi tiết</Button>
        </Link>
      </div>
    ),
  },
];

function Collection() {
  const [pageIndex, setPageIndex] = useState(1);
  const { data, isLoading, isFetching, isPending, refetch } = useGetCollections({
    pageIndex,
  });
  const disabled = isFetching || isPending;

  const handleRefetch = useMemo(() => throttle(() => refetch(), 3000), [refetch]);

  return (
    <PageContainer pageTitle="Bộ sưu tập" activeSidebarItemId="collection" className="p-2">
      <h2 className="text-2xl font-bold mb-2">Bộ sưu tập</h2>
      <div className="max-w-[1200px] mx-auto overflow-x-auto">
        <div className="flex justify-between mb-2">
          <CreateCollection onSuccess={() => refetch()} />
          <Button disabled={disabled} onClick={handleRefetch}>
            Reload
          </Button>
        </div>
        <Table
          rowKey={(record) => record.id}
          dataSource={data?.data}
          columns={columns}
          loading={isLoading}
          showHeader
          pagination={{
            current: pageIndex,
            total: data?.pageInfo.totalPage,
            onChange: (page) => setPageIndex(page),
            // TODO: Handle pagination from params
          }}
        />
      </div>
    </PageContainer>
  );
}
export default Collection;
