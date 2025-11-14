'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { Modal } from './modal';
import { Button } from './button';
import { usePRBetStore } from '@/lib/store';
import { usePlaceBet } from '@/hooks/usePRBet';
import { BetSide } from '@/lib/types';

interface JoinBetModalProps {
  betId?: string;
}

export function JoinBetModal({ betId }: JoinBetModalProps) {
  const { modalState, closeJoinBetModal } = usePRBetStore();
  const { placeBet, loading } = usePlaceBet();
  const [amount, setAmount] = useState('');
  const [side, setSide] = useState<BetSide>('YES');

  const isOpen = modalState.joinBet.open && modalState.joinBet.betId === betId;

  const handlePlaceBet = async () => {
    if (!amount || !modalState.joinBet.betId) {
      toast.error('Please enter an amount');
      return;
    }

    const success = await placeBet({
      betId: modalState.joinBet.betId,
      side,
      amountUSDC: amount,
    });

    if (success) {
      setAmount('');
      closeJoinBetModal();
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={closeJoinBetModal}
      title="Place Your Bet"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            Bet Side
          </label>
          <div className="grid grid-cols-2 gap-2">
            {(['YES', 'NO'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSide(s)}
                className={`py-2 px-3 rounded-lg font-medium transition-colors ${
                  side === s
                    ? s === 'YES'
                      ? 'bg-green-600 text-white'
                      : 'bg-red-600 text-white'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            Amount (USDC)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            min="0"
            step="0.01"
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-blue-600"
          />
        </div>

        <div className="pt-2">
          <Button
            onClick={handlePlaceBet}
            loading={loading}
            className="w-full"
          >
            Place Bet
          </Button>
        </div>
      </div>
    </Modal>
  );
}
