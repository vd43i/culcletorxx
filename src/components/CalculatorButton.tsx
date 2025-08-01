import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CalculatorButtonProps {
  children: React.ReactNode;
  variant: 'number' | 'operator' | 'equals' | 'clear';
  onClick: () => void;
  className?: string;
}

const CalculatorButton = ({ children, variant, onClick, className }: CalculatorButtonProps) => {
  const getButtonStyles = () => {
    const baseClasses = 'calc-btn text-xl font-semibold h-14 rounded-xl border-0 select-none touch-manipulation';
    
    switch (variant) {
      case 'number':
        return `${baseClasses} bg-btn-number hover:bg-btn-number-hover text-btn-number-text`;
      case 'operator':
        return `${baseClasses} bg-btn-operator hover:bg-btn-operator-hover text-btn-operator-text font-bold`;
      case 'equals':
        return `${baseClasses} bg-btn-equals hover:bg-btn-equals-hover text-btn-equals-text font-bold`;
      case 'clear':
        return `${baseClasses} bg-btn-clear hover:bg-btn-clear-hover text-btn-clear-text text-lg`;
      default:
        return baseClasses;
    }
  };

  return (
    <Button
      onClick={onClick}
      className={cn(getButtonStyles(), className)}
    >
      {children}
    </Button>
  );
};

export default CalculatorButton;