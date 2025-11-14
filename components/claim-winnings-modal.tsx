'use client';

import toast from 'react-hot-toast';
import { useState } from 'react';
import { Modal } from './modal';
import { Button } from './button';
import { usePRBetStore } from '@/lib/store';
import { useClaimWinnings } from '@/hooks/usePRBet';

interface ClaimWinningsModalProps {
  betId?: string;
}

export function ClaimWinningsModal({ betId }: ClaimWinningsModalProps) {
  const { modalState, closeClaimWinningsModal } = usePRBetStore();
  const { claimWinnings, loading } = useClaimWinnings();
  const [claimed, setClaimed] = useState(false);

  const isOpen = modalState.claimWinnings.open && modalState.claimWinnings.betId === betId;

  const handleClaim = async () => {
    if (!modalState.claimWinnings.betId) {
      toast.error('Bet ID not found');
      return;
    }

    const success = await claimWinnings(modalState.claimWinnings.betId);
    if (success) {
      setClaimed(true);
      setTimeout(() => {
        closeClaimWinningsModal();
      }, 1500);
    }
  };

  const handleClose = () => {
    setClaimed(false);
    closeClaimWinningsModal();
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      title={claimed ? 'Winnings Claimed!' : 'Claim Your Winnings'}
    >
      <div className="space-y-4">
        {claimed ? (
          <div className="text-center py-4">
            <p className="text-green-400 font-semibold mb-2">Your winnings have been sent to your wallet!</p>
          </div>
        ) : (
          <>
            <p className="text-white/70 text-sm">
              Congratulations! You predicted correctly. Click below to claim your winnings.
            </p>
            <Button
              onClick={handleClaim}
              loading={loading}
              className="w-full"
            >
              Claim Winnings
            </Button>
          </>
        )}
      </div>
    </Modal>
  );
}
