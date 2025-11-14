'use client';

import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useParams } from 'next/navigation';
import { useGetBet } from '@/hooks/usePRBet';
import { BetPool } from '@/components/bet-pool';
import { Button } from '@/components/button';
import { Loader } from '@/components/loader';
import { Bet } from '@/lib/types';
import { formatDate, getTimeRemaining, isDeadlinePassed } from '@/lib/utils';
import { usePRBetStore } from '@/lib/store';

export default function BetDetailPage() {
  const { id } = useParams();
  const { address, isConnected } = useAccount();
  const { bet, loading, fetchBet } = useGetBet(id as string);
  const [isCreator, setIsCreator] = useState(false);
  const openJoinModal = usePRBetStore((s) => s.openJoinBetModal);
  const openProofModal = usePRBetStore((s) => s.openSubmitProofModal);

  useEffect(() => {
    fetchBet();
  }, []);

  useEffect(() => {
    if (bet && address) {
      setIsCreator(bet.creator.toLowerCase() === address.toLowerCase());
    }
  }, [bet, address]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Loader />
      </div>
    );
  }

  if (!bet) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">Bet not found</h1>
        </div>
      </div>
    );
  }

  const isPassed = isDeadlinePassed(bet.deadline);
  const timeRemaining = getTimeRemaining(bet.deadline);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{bet.title}</h1>
            <p className="text-white/70">{bet.description}</p>
          </div>
          <span className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
            isPassed ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
          }`}>
            {isPassed ? 'Ended' : 'Active'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6 bg-white/5 border border-white/10 rounded-lg p-4">
          <div>
            <p className="text-white/60 text-sm mb-1">Deadline</p>
            <p className="text-white font-semibold">{formatDate(bet.deadline)}</p>
          </div>
          <div>
            <p className="text-white/60 text-sm mb-1">Time Remaining</p>
            <p className="text-white font-semibold">{timeRemaining}</p>
          </div>
          <div>
            <p className="text-white/60 text-sm mb-1">Creator</p>
            <p className="text-white/80 font-mono text-sm">{bet.creator}</p>
          </div>
          <div>
            <p className="text-white/60 text-sm mb-1">Status</p>
            <p className="text-white font-semibold capitalize">{bet.status}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">Verification Instructions</h2>
            <p className="text-white/70 leading-relaxed">{bet.proofInstructions}</p>
          </div>

          {isCreator && !isPassed && (
            <Button
              onClick={() => openProofModal(bet.id)}
              className="w-full mb-4"
            >
              Submit Proof
            </Button>
          )}

          {bet.proofUrl && (
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-6">
              <h3 className="text-sm font-semibold text-white/60 mb-2">Submitted Proof</h3>
              <a
                href={bet.proofUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 break-all"
              >
                {bet.proofUrl}
              </a>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <BetPool bet={bet} />

          {!isCreator && isConnected && !isPassed && (
            <Button
              onClick={() => openJoinModal(bet.id)}
              className="w-full"
            >
              Place Bet
            </Button>
          )}

          {!isConnected && (
            <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-4">
              <p className="text-white text-sm">Connect wallet to place a bet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
