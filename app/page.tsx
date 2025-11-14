'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import type { Context } from '@farcaster/miniapp-core';
import { useGetAllBets } from '@/hooks/usePRBet';
import { BetCard } from '@/components/bet-card';
import { Loader } from '@/components/loader';
import { Bet } from '@/lib/types';

export default function HomePage() {
  const { isConnected } = useAccount();
  const { bets, loading, fetchBets } = useGetAllBets();
  const [displayBets, setDisplayBets] = useState<Bet[]>([]);
  const [context, setContext] = useState<Context.FrameContext>();

  useEffect(() => {
    fetchBets();
    
    const loadContext = async () => {
      try {
        const sdk = await import('@farcaster/miniapp-sdk');
        if (sdk?.default?.context) {
          const frameContext = await sdk.default.context;
          setContext(frameContext);
          console.log('[v0] Farcaster context loaded:', frameContext);
        }
      } catch (error) {
        console.log('[v0] Not running in Farcaster frame');
      }
    };
    
    loadContext();
  }, []);

  useEffect(() => {
    setDisplayBets(bets.slice(0, 3));
  }, [bets]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Predict Personal Records
        </h1>
        <p className="text-xl text-white/70 mb-8 max-w-2xl">
          Bet on fitness goals with the community. Winner takes all from the losing side's pool. Zero protocol risk, pure prediction market.
        </p>
        
        {!isConnected ? (
          <div className="inline-block bg-blue-600/20 border border-blue-500/30 rounded-lg p-4 mb-8">
            <p className="text-white mb-2">Connect your wallet to get started</p>
          </div>
        ) : (
          <Link href="/create">
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
              Create a Bet
            </button>
          </Link>
        )}
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">Featured Bets</h2>
        {loading ? (
          <div className="py-12">
            <Loader />
          </div>
        ) : displayBets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayBets.map((bet) => (
              <BetCard key={bet.id} bet={bet} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-white/60">
            <p>No bets available yet. Be the first to create one!</p>
          </div>
        )}
      </div>

      <div className="text-center">
        <Link href="/bets">
          <button className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
            View All Bets
          </button>
        </Link>
      </div>
    </div>
  );
}
