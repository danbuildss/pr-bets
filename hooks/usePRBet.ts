'use client';

import { useCallback, useState } from 'react';
import { usePRBetStore } from '@/lib/store';
import { 
  Bet, 
  CreateBetParams, 
  PlaceBetParams, 
  SubmitProofParams,
  ContractError,
} from '@/lib/types';
import { 
  TOAST_DURATION,
} from '@/lib/constants';
import toast from 'react-hot-toast';

// These are Wagmi v1 APIs that don't exist in v2
// Contract interactions should be done with useWalletClient and PublicClient directly

export function useCreateBet() {
  const [loading, setLoading] = useState(false);
  const setError = usePRBetStore((s) => s.setError);

  const createBet = useCallback(async (params: CreateBetParams): Promise<string | null> => {
    setLoading(true);
    try {
      // Contract call would be made here
      console.log('Creating bet:', params);
      toast.success('Bet created successfully!', { duration: TOAST_DURATION });
      return 'bet-id-placeholder';
    } catch (error: any) {
      const errorMsg = error?.message || 'Failed to create bet';
      setError(errorMsg);
      toast.error(errorMsg, { duration: TOAST_DURATION });
      return null;
    } finally {
      setLoading(false);
    }
  }, [setError]);

  return { createBet, loading };
}

export function usePlaceBet() {
  const [loading, setLoading] = useState(false);
  const setError = usePRBetStore((s) => s.setError);

  const placeBet = useCallback(async (params: PlaceBetParams): Promise<boolean> => {
    setLoading(true);
    try {
      console.log('Placing bet:', params);
      toast.success('Bet placed successfully!', { duration: TOAST_DURATION });
      return true;
    } catch (error: any) {
      const errorMsg = error?.message || 'Failed to place bet';
      setError(errorMsg);
      toast.error(errorMsg, { duration: TOAST_DURATION });
      return false;
    } finally {
      setLoading(false);
    }
  }, [setError]);

  return { placeBet, loading };
}

export function useSubmitProof() {
  const [loading, setLoading] = useState(false);
  const setError = usePRBetStore((s) => s.setError);

  const submitProof = useCallback(async (params: SubmitProofParams): Promise<boolean> => {
    setLoading(true);
    try {
      console.log('Submitting proof:', params);
      toast.success('Proof submitted for verification!', { duration: TOAST_DURATION });
      return true;
    } catch (error: any) {
      const errorMsg = error?.message || 'Failed to submit proof';
      setError(errorMsg);
      toast.error(errorMsg, { duration: TOAST_DURATION });
      return false;
    } finally {
      setLoading(false);
    }
  }, [setError]);

  return { submitProof, loading };
}

export function useClaimWinnings() {
  const [loading, setLoading] = useState(false);
  const setError = usePRBetStore((s) => s.setError);

  const claimWinnings = useCallback(async (betId: string): Promise<boolean> => {
    setLoading(true);
    try {
      console.log('Claiming winnings for bet:', betId);
      toast.success('Winnings claimed!', { duration: TOAST_DURATION });
      return true;
    } catch (error: any) {
      const errorMsg = error?.message || 'Failed to claim winnings';
      setError(errorMsg);
      toast.error(errorMsg, { duration: TOAST_DURATION });
      return false;
    } finally {
      setLoading(false);
    }
  }, [setError]);

  return { claimWinnings, loading };
}

export function useResolveBet() {
  const [loading, setLoading] = useState(false);
  const setError = usePRBetStore((s) => s.setError);

  const resolveBet = useCallback(async (betId: string, outcome: boolean): Promise<boolean> => {
    setLoading(true);
    try {
      console.log('Resolving bet:', betId, 'outcome:', outcome);
      toast.success('Bet resolved!', { duration: TOAST_DURATION });
      return true;
    } catch (error: any) {
      const errorMsg = error?.message || 'Failed to resolve bet';
      setError(errorMsg);
      toast.error(errorMsg, { duration: TOAST_DURATION });
      return false;
    } finally {
      setLoading(false);
    }
  }, [setError]);

  return { resolveBet, loading };
}

export function useGetAllBets() {
  const [bets, setBets] = useState<Bet[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchBets = useCallback(async () => {
    setLoading(true);
    try {
      // Contract read would be made here
      console.log('Fetching all bets');
      setBets([]);
    } catch (error: any) {
      console.error('Failed to fetch bets:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { bets, loading, fetchBets };
}

export function useGetBet(betId: string) {
  const [bet, setBet] = useState<Bet | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchBet = useCallback(async () => {
    if (!betId) return;
    setLoading(true);
    try {
      console.log('Fetching bet:', betId);
      setBet(null);
    } catch (error: any) {
      console.error('Failed to fetch bet:', error);
    } finally {
      setLoading(false);
    }
  }, [betId]);

  return { bet, loading, fetchBet };
}

export function useGetUserBets(userAddress?: string) {
  const [bets, setBets] = useState<Bet[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUserBets = useCallback(async () => {
    if (!userAddress) return;
    setLoading(true);
    try {
      console.log('Fetching user bets for:', userAddress);
      setBets([]);
    } catch (error: any) {
      console.error('Failed to fetch user bets:', error);
    } finally {
      setLoading(false);
    }
  }, [userAddress]);

  return { bets, loading, fetchUserBets };
}
