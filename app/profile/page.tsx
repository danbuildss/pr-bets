'use client';

import { useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useGetUserBets } from '@/hooks/usePRBet';
import { BetCard } from '@/components/bet-card';
import { Loader } from '@/components/loader';
import { EmptyState } from '@/components/empty-state';
import { formatAddress } from '@/lib/utils';

export default function ProfilePage() {
  const { address, isConnected } = useAccount();
  const { bets, loading, fetchUserBets } = useGetUserBets(address);

  useEffect(() => {
    if (isConnected && address) {
      fetchUserBets();
    }
  }, [isConnected, address]);

  if (!isConnected) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-8 text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Connect Your Wallet</h1>
          <p className="text-white/70">Connect your wallet to view your profile and bets.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Your Profile</h1>
        {address && (
          <p className="text-white/70 font-mono text-sm">
            {formatAddress(address)}
          </p>
        )}
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Your Bets</h2>
        {loading ? (
          <div className="py-12">
            <Loader />
          </div>
        ) : bets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bets.map((bet) => (
              <BetCard key={bet.id} bet={bet} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No bets yet"
            description="Create or join bets to see them here"
          />
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
          <p className="text-white/60 text-sm mb-1">Total Bets</p>
          <p className="text-2xl font-bold text-white">{bets.length}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
          <p className="text-white/60 text-sm mb-1">Active</p>
          <p className="text-2xl font-bold text-white">
            {bets.filter((b) => b.status === 'ACTIVE').length}
          </p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
          <p className="text-white/60 text-sm mb-1">Resolved</p>
          <p className="text-2xl font-bold text-white">
            {bets.filter((b) => b.status === 'RESOLVED' || b.status === 'COMPLETED').length}
          </p>
        </div>
      </div>
    </div>
  );
}
