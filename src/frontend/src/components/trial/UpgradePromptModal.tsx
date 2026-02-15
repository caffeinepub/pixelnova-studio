import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';

interface UpgradePromptModalProps {
  open: boolean;
  onClose: () => void;
}

export default function UpgradePromptModal({ open, onClose }: UpgradePromptModalProps) {
  const navigate = useNavigate();

  const handleUpgrade = () => {
    onClose();
    navigate({ to: '/pricing' });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upgrade to Premium</DialogTitle>
          <DialogDescription>
            Upgrade to Premium to Unlock Full Website & Remove Watermark
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            Your free trial has been claimed! To get the full website without watermarks and with all premium features, upgrade to our Premium package.
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Maybe Later
          </Button>
          <Button onClick={handleUpgrade}>
            View Premium Plans
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
