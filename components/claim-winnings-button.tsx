'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { usePRBetStore } from '@/lib/store';

interface ClaimWinningsButtonProps {
  betId: string;
  disabled?: boolean;
}

export function ClaimWinningsButton({ betId, disabled = false }: ClaimWinningsButtonProps) {
  const [loading, setLoading] = useState(false);
  const openModal = usePRBetStore((s) => s.openClaimWinningsModal);

  const handleClick = () => {
    if (!disabled && !loading) {
      openModal(betId);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || loading}
      className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
        disabled || loading
          ? 'bg-white/10 text-white/40 cursor-not-allowed'
          : 'bg-blue-600 hover:bg-blue-700 text-white'
      }`}
    >
      {loading ? 'Claiming...' : 'Claim Winnings'}
    </button>
  );
}
