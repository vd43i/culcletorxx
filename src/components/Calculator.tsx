import { useState, useEffect } from 'react';
import { Calculator as CalculatorIcon, History, Palette, Moon, Sun, FunctionSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import CalculatorDisplay from './CalculatorDisplay';
import CalculatorButton from './CalculatorButton';
import CalculatorHistory from './CalculatorHistory';
import ThemeSelector from './ThemeSelector';
import AdvancedCalculator from './AdvancedCalculator';

export interface HistoryEntry {
  id: string;
  expression: string;
  result: string;
  timestamp: Date;
}

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('theme-blue');
  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    // Check system preference for dark mode
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(darkModeQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => setIsDark(e.matches);
    darkModeQuery.addEventListener('change', handleChange);
    
    return () => darkModeQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    document.documentElement.className = document.documentElement.className
      .replace(/theme-\w+/g, '') + ` ${currentTheme}`;
  }, [currentTheme]);

  const addToHistory = (expression: string, result: string) => {
    const entry: HistoryEntry = {
      id: Date.now().toString(),
      expression,
      result,
      timestamp: new Date()
    };
    setHistory(prev => [entry, ...prev.slice(0, 19)]); // Keep last 20 entries
  };

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const clearEntry = () => {
    setDisplay('0');
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(String(inputValue));
    } else if (operator) {
      const currentValue = previousValue || '0';
      const prevValue = parseFloat(currentValue);
      let result = 0;

      switch (operator) {
        case '+':
          result = prevValue + inputValue;
          break;
        case '-':
          result = prevValue - inputValue;
          break;
        case '×':
          result = prevValue * inputValue;
          break;
        case '÷':
          result = inputValue !== 0 ? prevValue / inputValue : 0;
          break;
        case '=':
          result = inputValue;
          break;
        default:
          return;
      }

      const resultString = String(result);
      const expression = `${currentValue} ${operator} ${display}`;
      
      if (nextOperator === '=') {
        addToHistory(expression, resultString);
      }
      
      setDisplay(resultString);
      setPreviousValue(resultString);
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const calculate = () => {
    if (operator && previousValue !== null) {
      performOperation('=');
      setOperator(null);
      setPreviousValue(null);
      setWaitingForOperand(true);
    }
  };

  const copyResult = () => {
    navigator.clipboard.writeText(display);
  };

  const useHistoryEntry = (entry: HistoryEntry) => {
    setDisplay(entry.result);
    setShowHistory(false);
  };

  const buttons = [
    ['C', 'CE', '±', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=']
  ];

  const getButtonVariant = (btn: string) => {
    if (btn === 'C' || btn === 'CE') return 'clear';
    if (['+', '-', '×', '÷'].includes(btn)) return 'operator';
    if (btn === '=') return 'equals';
    return 'number';
  };

  const handleButtonClick = (btn: string) => {
    switch (btn) {
      case 'C':
        clear();
        break;
      case 'CE':
        clearEntry();
        break;
      case '±':
        setDisplay(String(parseFloat(display) * -1));
        break;
      case '.':
        inputDecimal();
        break;
      case '=':
        calculate();
        break;
      case '+':
      case '-':
      case '×':
      case '÷':
        performOperation(btn);
        break;
      default:
        if (/\d/.test(btn)) {
          inputDigit(btn);
        }
        break;
    }
  };

  if (showAdvanced) {
    return (
      <AdvancedCalculator
        onClose={() => setShowAdvanced(false)}
        display={display}
        setDisplay={setDisplay}
        addToHistory={addToHistory}
        isDark={isDark}
        currentTheme={currentTheme}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm mx-auto">
        <Card className="p-6 space-y-4 bg-background border-border/50">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <CalculatorIcon className="w-6 h-6 text-primary" />
              <h1 className="text-lg font-semibold">آلة حاسبة</h1>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAdvanced(true)}
                className="p-2"
              >
                <FunctionSquare className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowHistory(!showHistory)}
                className="p-2"
              >
                <History className="w-4 h-4" />
              </Button>
              <ThemeSelector 
                currentTheme={currentTheme}
                onThemeChange={setCurrentTheme}
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsDark(!isDark)}
                className="p-2"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          <Separator />

          {/* Display */}
          <CalculatorDisplay 
            value={display} 
            onCopy={copyResult}
          />

          {/* History Panel */}
          {showHistory && (
            <CalculatorHistory
              history={history}
              onUseEntry={useHistoryEntry}
              onClear={() => setHistory([])}
            />
          )}

          {/* Button Grid */}
          <div className="space-y-3">
            {buttons.map((row, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-4 gap-3">
                {row.map((btn) => (
                  <CalculatorButton
                    key={btn}
                    variant={getButtonVariant(btn)}
                    onClick={() => handleButtonClick(btn)}
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

export default Calculator;