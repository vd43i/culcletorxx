import { ArrowLeft, Calculator as CalculatorIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import CalculatorDisplay from './CalculatorDisplay';
import CalculatorButton from './CalculatorButton';
import { HistoryEntry } from './Calculator';

interface AdvancedCalculatorProps {
  onClose: () => void;
  display: string;
  setDisplay: (value: string) => void;
  addToHistory: (expression: string, result: string) => void;
  isDark: boolean;
  currentTheme: string;
}

const AdvancedCalculator = ({ 
  onClose, 
  display, 
  setDisplay, 
  addToHistory,
  isDark,
  currentTheme 
}: AdvancedCalculatorProps) => {
  
  const scientificFunctions = [
    ['sin', 'cos', 'tan', 'log'],
    ['√', 'x²', 'xʸ', '1/x'],
    ['π', 'e', '(', ')'],
  ];

  const basicButtons = [
    ['C', 'CE', '±', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=']
  ];

  const handleScientificFunction = (func: string) => {
    const currentValue = parseFloat(display);
    let result = 0;
    let expression = '';

    switch (func) {
      case 'sin':
        result = Math.sin(currentValue * Math.PI / 180);
        expression = `sin(${display}°)`;
        break;
      case 'cos':
        result = Math.cos(currentValue * Math.PI / 180);
        expression = `cos(${display}°)`;
        break;
      case 'tan':
        result = Math.tan(currentValue * Math.PI / 180);
        expression = `tan(${display}°)`;
        break;
      case 'log':
        result = Math.log10(currentValue);
        expression = `log(${display})`;
        break;
      case '√':
        result = Math.sqrt(currentValue);
        expression = `√${display}`;
        break;
      case 'x²':
        result = currentValue * currentValue;
        expression = `${display}²`;
        break;
      case '1/x':
        result = 1 / currentValue;
        expression = `1/${display}`;
        break;
      case 'π':
        setDisplay(Math.PI.toString());
        return;
      case 'e':
        setDisplay(Math.E.toString());
        return;
      case '(':
        setDisplay(display === '0' ? '(' : display + '(');
        return;
      case ')':
        setDisplay(display + ')');
        return;
      default:
        return;
    }

    addToHistory(expression, result.toString());
    setDisplay(result.toString());
  };

  const handleBasicFunction = (btn: string) => {
    // Basic calculator logic here (same as main calculator)
    // Simplified for brevity
    if (/\d/.test(btn)) {
      setDisplay(display === '0' ? btn : display + btn);
    } else if (btn === 'C') {
      setDisplay('0');
    } else if (btn === '.') {
      if (display.indexOf('.') === -1) {
        setDisplay(display + '.');
      }
    }
  };

  const getButtonVariant = (btn: string) => {
    if (btn === 'C' || btn === 'CE') return 'clear';
    if (['+', '-', '×', '÷'].includes(btn)) return 'operator';
    if (btn === '=') return 'equals';
    return 'number';
  };

  const copyResult = () => {
    navigator.clipboard.writeText(display);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <Card className="p-6 space-y-4 bg-background border-border/50">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-2">
              <CalculatorIcon className="w-6 h-6 text-primary" />
              <h1 className="text-lg font-semibold">حاسبة علمية</h1>
            </div>
            <div className="w-8" /> {/* Spacer */}
          </div>

          <Separator />

          {/* Display */}
          <CalculatorDisplay 
            value={display} 
            onCopy={copyResult}
          />

          {/* Scientific Functions */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">دوال علمية</h3>
            {scientificFunctions.map((row, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-4 gap-2">
                {row.map((func) => (
                  <Button
                    key={func}
                    onClick={() => handleScientificFunction(func)}
                    className="calc-btn bg-accent hover:bg-accent-foreground/10 text-accent-foreground text-sm font-medium h-10 rounded-lg"
                  >
                    {func}
                  </Button>
                ))}
              </div>
            ))}
          </div>

          <Separator />

          {/* Basic Calculator */}
          <div className="space-y-3">
            {basicButtons.map((row, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-4 gap-3">
                {row.map((btn) => (
                  <CalculatorButton
                    key={btn}
                    variant={getButtonVariant(btn)}
                    onClick={() => handleBasicFunction(btn)}
                    className={btn === '0' ? 'col-span-2' : ''}
                  >
                    {btn}
                  </CalculatorButton>
                ))}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdvancedCalculator;