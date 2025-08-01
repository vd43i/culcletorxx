import { Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ThemeSelectorProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

const themes = [
  { id: 'theme-blue', name: 'أزرق', color: '220, 60%, 55%' },
  { id: 'theme-purple', name: 'بنفسجي', color: '260, 60%, 55%' },
  { id: 'theme-green', name: 'أخضر', color: '140, 60%, 50%' },
  { id: 'theme-orange', name: 'برتقالي', color: '25, 85%, 55%' },
  { id: 'theme-pink', name: 'وردي', color: '330, 60%, 55%' },
];

const ThemeSelector = ({ currentTheme, onThemeChange }: ThemeSelectorProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="p-2">
          <Palette className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32">
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme.id}
            onClick={() => onThemeChange(theme.id)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div
              className="w-4 h-4 rounded-full border border-border/50"
              style={{ backgroundColor: `hsl(${theme.color})` }}
            />
            <span className="text-sm">{theme.name}</span>
            {currentTheme === theme.id && (
              <span className="text-xs text-primary">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSelector;