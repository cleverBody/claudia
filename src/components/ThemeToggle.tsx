import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useThemeContext } from '@/contexts/ThemeContext';
import { useTranslation } from '@/hooks/useTranslation';

interface ThemeToggleProps {
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = 'ghost',
  size = 'sm',
  showLabel = false,
}) => {
  const { theme, setTheme, isSystemTheme } = useThemeContext();
  const { t } = useTranslation();

  const getIcon = () => {
    if (isSystemTheme) return <Monitor className="h-4 w-4" />;
    return theme === 'light' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />;
  };

  const getLabel = () => {
    if (isSystemTheme) return t('theme.system');
    return theme === 'light' ? t('theme.light') : t('theme.dark');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size} className="gap-2">
          {getIcon()}
          {showLabel && <span className="text-xs">{getLabel()}</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          <Sun className="h-4 w-4 mr-2" />
          {t('theme.light')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          <Moon className="h-4 w-4 mr-2" />
          {t('theme.dark')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => {
          localStorage.removeItem('claudia_theme');
          window.location.reload();
        }}>
          <Monitor className="h-4 w-4 mr-2" />
          {t('theme.system')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
