import { Trash2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { HistoryEntry } from './Calculator';

interface CalculatorHistoryProps {
  history: HistoryEntry[];
  onUseEntry: (entry: HistoryEntry) => void;
  onClear: () => void;
}

const CalculatorHistory = ({ history, onUseEntry, onClear }: CalculatorHistoryProps) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ar-EG', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <Card className="p-4 max-h-60 overflow-y-auto bg-muted/30">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium">السجل</span>
        </div>
        {history.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="p-1 h-auto text-destructive hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </div>
      
      {history.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-4">
          لا توجد عمليات سابقة
        </p>
      ) : (
        <div className="space-y-2">
          {history.map((entry, index) => (
            <div key={entry.id}>
              <button
                onClick={() => onUseEntry(entry)}
                className="w-full text-left p-2 rounded-lg hover:bg-background/80 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground font-mono">
                      {entry.expression}
                    </p>
                    <p className="text-base font-semibold font-mono">
                      = {entry.result}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground ml-2">
                    {formatTime(entry.timestamp)}
                  </span>
                </div>
              </button>
              {index < history.length - 1 && <Separator className="my-1" />}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default CalculatorHistory;