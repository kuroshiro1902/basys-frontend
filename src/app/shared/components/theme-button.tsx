import { forwardRef, useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Button } from 'antd';
import clsx from 'clsx';

type ThemeButtonProps = React.ComponentPropsWithoutRef<typeof Button> & { isExpanded?: boolean; label?: string };

const ThemeButton = forwardRef<HTMLButtonElement, ThemeButtonProps>(({ isExpanded, className, label, ...props }, ref) => {
  const [theme, setTheme] = useState(
    typeof window !== 'undefined' && localStorage.getItem('theme') === 'dark' ? 'dark' : 'light',
  );

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <Button
      ref={ref}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className={clsx(
        'px-2! hover:bg-background/10! bg-background/5! text-background! border-none! transition-all flex justify-center',
        className,
      )}
      {...props}
    >
      {isExpanded && <span>{label}</span>}
      {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
    </Button>
  );
});

ThemeButton.displayName = 'ThemeButton';
export default ThemeButton;
