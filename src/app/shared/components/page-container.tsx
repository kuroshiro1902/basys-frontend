import { useSidebarStore } from '@/app/layout/sidebar/sidebar.store';
import { forwardRef, useEffect } from 'react';

type PageContainerProps = {
  pageTitle?: string;
  activeSidebarItemId?: string;
  children?: React.ReactNode;
};

const PageContainer = forwardRef<HTMLDivElement, PageContainerProps>(
  ({ pageTitle, activeSidebarItemId, children }, ref) => {
    const activeItemId = useSidebarStore((state) => state.currentActiveItem);
    const setActiveItem = useSidebarStore((state) => state.setActiveItem);

    useEffect(() => {
      pageTitle && (document.title = pageTitle);
      if (activeSidebarItemId && activeSidebarItemId !== activeItemId) {
        setActiveItem(activeSidebarItemId);
      }
    }, []);

    return (
      <div 
        ref={ref}
        data-page-title={pageTitle ?? ''} 
        className={`w-full p-2 bg-foreground/10`}
      >
        {children}
      </div>
    );
  }
);

PageContainer.displayName = 'PageContainer';

export default PageContainer;
