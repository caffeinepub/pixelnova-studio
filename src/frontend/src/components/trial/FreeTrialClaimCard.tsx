import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useClaimFreeTrial } from '../../hooks/useQueries';
import { toast } from 'sonner';
import UpgradePromptModal from './UpgradePromptModal';
import { CheckCircle2 } from 'lucide-react';

interface FreeTrialClaimCardProps {
  alreadyClaimed: boolean;
}

export default function FreeTrialClaimCard({ alreadyClaimed }: FreeTrialClaimCardProps) {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const claimTrial = useClaimFreeTrial();

  const handleClaim = async () => {
    try {
      await claimTrial.mutateAsync();
      toast.success('Free trial claimed successfully!');
      setShowUpgradeModal(true);
    } catch (error: any) {
      if (error.message?.includes('already claimed')) {
        toast.error('You have already claimed your free trial');
      } else {
        toast.error('Failed to claim free trial');
      }
      console.error(error);
    }
  };

  if (alreadyClaimed) {
    return (
      <Card className="border-green-500/20 bg-green-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            Free Trial Claimed
          </CardTitle>
          <CardDescription>
            You've already claimed your one-time free website trial
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <>
      <Card className="border-chart-1/40 bg-chart-1/5">
        <CardHeader>
          <CardTitle>🆓 1 Free Website Trial</CardTitle>
          <CardDescription>One-Time Only Offer</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• 1-page demo website</li>
            <li>• Basic layout</li>
            <li>• Delivered within 24 hours</li>
            <li>• Watermarked: "Demo by PixelNova Studio"</li>
            <li>• No source file access</li>
          </ul>
          <Button
            onClick={handleClaim}
            disabled={claimTrial.isPending}
            className="w-full"
            size="lg"
          >
            {claimTrial.isPending ? 'Claiming...' : '🆓 Claim Free Trial'}
          </Button>
        </CardContent>
      </Card>

      <UpgradePromptModal
        open={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
      />
    </>
  );
}
