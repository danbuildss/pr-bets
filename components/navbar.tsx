'use client';

import Link from 'next/link';
import { WalletButton } from './wallet-button';

export function NavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-white">
          PR Bet
        </Link>
        
        <div className="flex items-center gap-6">
          <Link 
            href="/bets" 
            className="text-sm text-white/70 hover:text-white transition-colors"
          >
            Bets
          </Link>
          <Link 
            href="/create" 
            className="text-sm text-white/70 hover:text-white transition-colors"
          >
            Create
          </Link>
          <Link 
            href="/profile" 
            className="text-sm text-white/70 hover:text-white transition-colors"
          >
            Profile
          </Link>
          <WalletButton />
        </div>
      </div>
    </nav>
  );
}
