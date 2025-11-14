'use client';

import Link from 'next/link';
import { Bet } from '@/lib/types';
import { formatUSDC, timeUntilDeadline, isDeadlinePassed } from '@/lib/utils';

interface BetCardProps {
  bet: Bet;
}

export function BetCard({ bet }: BetCardProps) {
  const isEnded = isDeadlinePassed(bet.deadline);
  const timeRemaining = timeUntilDeadline(bet.deadline);
  const yesOdds = Number(bet.yesPool) / (Number(bet.yesPool) + Number(bet.noPool)) * 100;

  return (
    <Link href={`/bets/${bet.id}`}>
      <div className="bg-white/5 border border-white/10 rounded-lg p-6 hover:border-blue-600/50 hover:bg-white/10 transition-all cursor-pointer">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-white line-clamp-2">{bet.title}</h3>
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
            isEnded ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
          }`}>
            {isEnded ? 'Ended' : 'Active'}
          </span>
        </div>

        <p className="text-sm text-white/70 line-clamp-2 mb-4">{bet.description}</p>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-white/60">Total Pool</span>
            <span className="text-white">${formatUSDC(BigInt(bet.totalStaked))}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/60">YES Odds</span>
            <span className="text-blue-400">{yesOdds.toFixed(1)}%</span>
          </div>
        </div>

        <div className="pt-3 border-t border-white/10 text-xs text-white/60">
          {timeRemaining}
        </div>
      </div>
    </Link>
  );
}
