'use client';

import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';
import { useCreateBet } from '@/hooks/usePRBet';
import { BetForm } from '@/components/bet-form';
import { CreateBetParams } from '@/lib/types';
import toast from 'react-hot-toast';

export default function CreatePage() {
  const router = useRouter();
  const { isConnected, address } = useAccount();
  const { createBet, loading } = useCreateBet();

  if (!isConnected) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-8 text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Connect Your Wallet</h1>
          <p className="text-white/70">You need to connect your wallet to create a bet.</p>
        </div>
      </div>
    );
  }

  const handleCreateBet = async (params: CreateBetParams) => {
    const betId = await createBet(params);
    if (betId) {
      router.push(`/bets/${betId}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Create a New Bet</h1>
        <p className="text-white/70">
          Set up a prediction market for your personal record goal. Community members can bet on whether you'll achieve it.
        </p>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-lg p-8">
        <BetForm onSubmit={handleCreateBet} loading={loading} />
      </div>

      <div className="mt-8 bg-white/5 border border-white/10 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-white mb-4">How it works</h2>
        <ul className="space-y-3 text-white/70 text-sm">
          <li className="flex gap-3">
            <span className="text-blue-400 font-bold flex-shrink-0">1.</span>
            <span>Set a clear PR goal with a deadline</span>
          </li>
          <li className="flex gap-3">
            <span className="text-blue-400 font-bold flex-shrink-0">2.</span>
            <span>Community members bet YES or NO on whether you'll achieve it</span>
          </li>
          <li className="flex gap-3">
            <span className="text-blue-400 font-bold flex-shrink-0">3.</span>
            <span>Submit proof when you achieve your goal</span>
          </li>
          <li className="flex gap-3">
            <span className="text-blue-400 font-bold flex-shrink-0">4.</span>
            <span>Winners claim their share from the losing side's pool</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
