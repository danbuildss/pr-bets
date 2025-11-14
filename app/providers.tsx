'use client';

import { ReactNode } from 'react';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { wagmiConfig } from './wagmi.config.ts';
import { NavBar } from '@/components/navbar';
import { ModalsWrapper } from '@/components/modals-wrapper';
import { MiniKitProvider } from '@/components/minikit-provider';

const queryClient = new QueryClient();

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig}>
        <RainbowKitProvider>
          <Toaster position="top-right" />
          <MiniKitProvider />
          <NavBar />
          <ModalsWrapper />
          <main className="pt-16 min-h-screen bg-black">
            {children}
          </main>
        </RainbowKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
}
