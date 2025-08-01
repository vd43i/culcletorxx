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
    switch (variant) {
      case 'number':
        return 'calc-btn bg-btn-number hover:bg-btn-number-hover text-btn-number-text text-xl font-semibold h-14';
      case 'operator':
        return 'calc-btn bg-btn-operator hover:bg-btn-operator-hover text-btn-operator-text text-xl font-bold h-14';
      case 'equals':
        return 'calc-btn bg-btn-equals hover:bg-btn-equals-hover text-btn-equals-text text-xl font-bold h-14';
      case 'clear':
        return 'calc-btn bg-btn-clear hover:bg-btn-clear-hover text-btn-clear-text text-lg font-semibold h-14';
      default:
        return 'calc-btn h-14';
    }
  };

  return (
    <Button
      onClick={onClick}
      className={cn(
        getButtonStyles(),
        'rounded-xl border-0 select-none touch-manipulation',
        className
      )}
      style={{
        background: `hsl(var(--btn-${variant === 'number' ? 'number' : 
                    variant === 'operator' ? 'operator' : 
                    variant === 'equals' ? 'equals' : 'clear'}))`,
        color: `hsl(var(--btn-${variant === 'number' ? 'number' : 
                variant === 'operator' ? 'operator' : 
                variant === 'equals' ? 'equals' : 'clear'}-text))`
      }}
    >
      {children}
    </Button>
  );
};

export default CalculatorButton;