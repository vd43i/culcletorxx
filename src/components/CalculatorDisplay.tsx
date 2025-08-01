import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface CalculatorDisplayProps {
  value: string;
  onCopy: () => void;
}

const CalculatorDisplay = ({ value, onCopy }: CalculatorDisplayProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="calc-display bg-calc-display border border-border/50 rounded-xl p-4 min-h-[80px] flex items-center justify-between">
      <div className="flex-1 text-right">
        <div className="text-3xl font-mono font-medium text-calc-display-text break-all">
          {value}
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleCopy}
        className="ml-2 p-2 opacity-70 hover:opacity-100"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-500" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </Button>
    </div>
  );
};

export default CalculatorDisplay;