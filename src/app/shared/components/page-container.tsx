import { useSidebarStore } from '@/app/layout/sidebar/sidebar.store';
import clsx from 'clsx';
import { forwardRef, useEffect } from 'react';

interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  pageTitle?: string;
  activeSidebarItemId?: string;
  children?: React.ReactNode;
}

const PageContainer = forwardRef<HTMLDivElement, PageContainerProps>(
  ({ pageTitle, activeSidebarItemId, children, className }, ref) => {
    const activeItemId = useSidebarStore((state) => state.currentActiveItem);
    const setActiveItem = useSidebarStore((state) => state.setActiveItem);

    useEffect(() => {
      pageTitle && (document.title = pageTitle);
      if (activeSidebarItemId && activeSidebarItemId !== activeItemId) {
        setActiveItem(activeSidebarItemId);
      }
    }, [pageTitle, activeSidebarItemId]);

    return (
      <div ref={ref} data-page-title={pageTitle ?? ''} className={clsx(`w-full bg-foreground/5`, className)}>
        {children}
      </div>
    );
  },
);

PageContainer.displayName = 'PageContainer';

export default PageContainer;
