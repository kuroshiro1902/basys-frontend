import PageContainer from "../shared/components/page-container";
import { useSidebarStore } from "../layout/sidebar/sidebar.store";
import { useEffect } from "react";
function Home() {
  useEffect(() => {
    useSidebarStore.setState({ currentActiveItem: 'home' });
    document.title = 'Trang chủ';
  }, []);
  return (
    <PageContainer pageTitle="Trang chủ">
      <div>
        Home component
      </div>
    </PageContainer>
  )
};

export default Home;
