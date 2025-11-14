import { create } from 'zustand';
import { Bet, UserBet } from './types';

interface PRBetStore {
  userBets: UserBet[];
  allBets: Bet[];
  loading: boolean;
  error: string | null;
  modalState: {
    joinBet: { open: boolean; betId?: string };
    submitProof: { open: boolean; betId?: string };
    claimWinnings: { open: boolean; betId?: string };
  };
  setUserBets: (bets: UserBet[]) => void;
  setAllBets: (bets: Bet[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  openJoinBetModal: (betId: string) => void;
  closeJoinBetModal: () => void;
  openSubmitProofModal: (betId: string) => void;
  closeSubmitProofModal: () => void;
  openClaimWinningsModal: (betId: string) => void;
  closeClaimWinningsModal: () => void;
}

export const usePRBetStore = create<PRBetStore>((set) => ({
  userBets: [],
  allBets: [],
  loading: false,
  error: null,
  modalState: {
    joinBet: { open: false },
    submitProof: { open: false },
    claimWinnings: { open: false },
  },
  setUserBets: (bets) => set({ userBets: bets }),
  setAllBets: (bets) => set({ allBets: bets }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  openJoinBetModal: (betId) =>
    set((state) => ({
      modalState: {
        ...state.modalState,
        joinBet: { open: true, betId },
      },
    })),
  closeJoinBetModal: () =>
    set((state) => ({
      modalState: {
        ...state.modalState,
        joinBet: { open: false },
      },
    })),
  openSubmitProofModal: (betId) =>
    set((state) => ({
      modalState: {
        ...state.modalState,
        submitProof: { open: true, betId },
      },
    })),
  closeSubmitProofModal: () =>
    set((state) => ({
      modalState: {
        ...state.modalState,
        submitProof: { open: false },
      },
    })),
  openClaimWinningsModal: (betId) =>
    set((state) => ({
      modalState: {
        ...state.modalState,
        claimWinnings: { open: true, betId },
      },
    })),
  closeClaimWinningsModal: () =>
    set((state) => ({
      modalState: {
        ...state.modalState,
        claimWinnings: { open: false },
      },
    })),
}));
