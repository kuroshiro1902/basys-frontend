import PageContainer from '../shared/components/page-container';
import { useSidebarStore } from '../layout/sidebar/sidebar.store';
import { useEffect } from 'react';
function Home() {
  const setActiveItem = useSidebarStore((state) => state.setActiveItem);
  useEffect(() => {
    setActiveItem('home');
    document.title = 'Trang chủ';
  }, []);
  return (
    <PageContainer pageTitle="Trang chủ">
      <div>Home component</div>
    </PageContainer>
  );
}

export default Home;
