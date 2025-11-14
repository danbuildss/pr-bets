'use client';

import { Bet } from '@/lib/types';
import { formatUSDC } from '@/lib/utils';

interface BetPoolProps {
  bet: Bet;
}

export function BetPool({ bet }: BetPoolProps) {
  const yesAmount = BigInt(bet.yesPool);
  const noAmount = BigInt(bet.noPool);
  const total = yesAmount + noAmount;
  const yesPercent = total === 0n ? 0 : (Number(yesAmount) / Number(total)) * 100;
  const noPercent = 100 - yesPercent;

  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-4">
      <h3 className="font-semibold text-white">Bet Pool</h3>

      <div className="space-y-2">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-green-400 font-medium">YES</span>
          <span className="text-white">${formatUSDC(yesAmount)}</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-green-500 transition-all"
            style={{ width: `${yesPercent}%` }}
          />
        </div>
        <div className="text-xs text-white/60 text-right">{yesPercent.toFixed(1)}%</div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-red-400 font-medium">NO</span>
          <span className="text-white">${formatUSDC(noAmount)}</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-red-500 transition-all"
            style={{ width: `${noPercent}%` }}
          />
        </div>
        <div className="text-xs text-white/60 text-right">{noPercent.toFixed(1)}%</div>
      </div>

      <div className="pt-3 border-t border-white/10">
        <div className="flex justify-between text-sm">
          <span className="text-white/60">Total Pool</span>
          <span className="text-white font-semibold">${formatUSDC(total)}</span>
        </div>
      </div>
    </div>
  );
}
