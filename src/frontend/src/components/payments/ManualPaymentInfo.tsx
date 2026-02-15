import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';

export default function ManualPaymentInfo() {
  const paymentNumber = '9911553387';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(paymentNumber);
    toast.success('Payment number copied to clipboard');
  };

  return (
    <Card className="border-amber-500/20 bg-amber-500/5">
      <CardHeader>
        <CardTitle>Manual Payment Information</CardTitle>
        <CardDescription>
          For manual payment option
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-medium text-foreground mb-2">Payment Number:</p>
          <div className="flex items-center gap-2">
            <code className="flex-1 px-4 py-2 bg-background rounded-md text-lg font-mono font-semibold">
              {paymentNumber}
            </code>
            <Button
              variant="outline"
              size="icon"
              onClick={copyToClipboard}
              className="shrink-0"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p className="font-medium text-foreground">Supported Payment Apps:</p>
          <ul className="space-y-1">
            <li>• Google Pay</li>
            <li>• PhonePe</li>
            <li>• Paytm</li>
            <li>• Any UPI App</li>
          </ul>
        </div>
        <div className="pt-2 border-t border-border">
          <p className="text-sm font-medium text-amber-600 dark:text-amber-400">
            ⚠️ Work will begin only after payment confirmation.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function Button({ children, ...props }: any) {
  return <button {...props}>{children}</button>;
}
