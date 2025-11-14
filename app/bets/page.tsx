'use client';

import { useEffect, useState } from 'react';
import { useGetAllBets } from '@/hooks/usePRBet';
import { BetCard } from '@/components/bet-card';
import { Loader } from '@/components/loader';
import { EmptyState } from '@/components/empty-state';
import { Bet } from '@/lib/types';

export default function BetsPage() {
  const { bets, loading, fetchBets } = useGetAllBets();
  const [filteredBets, setFilteredBets] = useState<Bet[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'resolved'>('all');

  useEffect(() => {
    fetchBets();
  }, []);

  useEffect(() => {
    let filtered = bets;
    
    if (filter === 'active') {
      filtered = bets.filter(b => b.status === 'ACTIVE');
    } else if (filter === 'resolved') {
      filtered = bets.filter(b => b.status === 'RESOLVED' || b.status === 'COMPLETED');
    }

    setFilteredBets(filtered);
  }, [bets, filter]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-6">All Bets</h1>

        <div className="flex gap-2">
          {(['all', 'active', 'resolved'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                filter === f
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/10 hover:bg-white/20 text-white/70'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="py-12">
          <Loader />
        </div>
      ) : filteredBets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBets.map((bet) => (
            <BetCard key={bet.id} bet={bet} />
          ))}
        </div>
      ) : (
        <EmptyState
          title={filter === 'all' ? 'No bets yet' : `No ${filter} bets`}
          description="Check back soon or create the first one!"
        />
      )}
    </div>
  );
}
