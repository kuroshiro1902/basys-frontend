import { useEffect, useMemo, useState } from 'react';
import PageContainer from '../shared/components/page-container';
import useGetAllUsers from '@/app/user-management/hooks/use-get-all-users.query';
import { Table, Button, Image } from 'antd';
import { TUser } from '@/core/user/models/user.model';
import { ColumnsType } from 'antd/es/table';
import CreateUser from './components/CreateUser';
import { throttle } from '@/utils/throttle.util';
import { useAuthStore } from '@/core/auth/auth.store';
import { ROUTE } from '@/router/routes.const';
import { useNavigate } from 'react-router';
import { EPermission } from '@/core/permission/constants/permission.const';
const columns: ColumnsType<TUser> = [
  {
    title: 'STT',
    dataIndex: 'index',
    render: (_: any, __: any, index: number) => index + 1,
  },
  {
    title: 'Tên',
    dataIndex: 'name',
    render: (_, record) => (
      <div className="flex items-center gap-2" style={record.bgImg ? { backgroundImage: `url(${record.bgImg})` } : {}}>
        <Image className="rounded-full border-1 border-gray-300" src={record.avatarImg} width={32} height={32} />{' '}
        {record.name}
      </div>
    ),
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Quyền hạn',
    dataIndex: 'permissions',
    render: (_, record) => record.permissions?.join(', '),
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'created_at',
    render: (value: TUser['created_at']) => (value ? new Date(value).toLocaleString() : 'Unknown'),
  },
  {
    title: 'Lần cập nhật cuối',
    dataIndex: 'updated_at',
    render: (value: TUser['updated_at']) => (value ? new Date(value).toLocaleString() : 'Unknown'),
  },
  // {
  //   title: 'Trạng thái',
  //   dataIndex: 'status',
  //   render: (_, record) => record.status ? 'Hoạt động' : 'Không hoạt động',
  // },
];

function UserManagement() {
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();
  const [pageIndex, setPageIndex] = useState(1);
  const { data, isLoading, isFetching, isPending, refetch } = useGetAllUsers(pageIndex);
  const disabled = isFetching || isPending;

  const handleRefetch = useMemo(() => throttle(() => refetch(), 3000), [refetch]);

  useEffect(() => {
    console.log(user?.permissions?.includes(EPermission.admin));
    if (!user?.permissions?.includes(EPermission.admin)) {
      navigate(ROUTE.INDEX, { replace: true });
    }
  }, [!!user?.permissions?.includes(EPermission.admin)]);

  return (
    <PageContainer pageTitle="Quản lý tài khoản" activeSidebarItemId="user-management-main">
      <h2 className="text-2xl font-bold mb-2">Quản lý tài khoản</h2>
      <div className="max-w-[1200px] mx-auto overflow-x-auto">
        <div className="flex justify-between mb-2">
          <CreateUser onSuccess={() => refetch()} />
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
          }}
        />
      </div>
    </PageContainer>
  );
}

export default UserManagement;
