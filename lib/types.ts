export type BetSide = 'YES' | 'NO';
export type BetStatus = 'ACTIVE' | 'COMPLETED' | 'RESOLVED' | 'CLAIMED';

export interface Bet {
  id: string;
  title: string;
  description: string;
  creator: string;
  deadline: number;
  status: BetStatus;
  yesPool: string;
  noPool: string;
  totalStaked: string;
  proofInstructions: string;
  proofUrl?: string;
  outcome?: BetSide;
  createdAt: number;
  resolvedAt?: number;
}

export interface UserBet {
  betId: string;
  user: string;
  side: BetSide;
  amount: string;
  claimed: boolean;
  winnings?: string;
}

export interface PoolInfo {
  betId: string;
  yesTotal: string;
  noTotal: string;
  yesCount: number;
  noCount: number;
}

export interface CreateBetParams {
  title: string;
  description: string;
  deadline: number;
  proofInstructions: string;
}

export interface PlaceBetParams {
  betId: string;
  side: BetSide;
  amountUSDC: string;
}

export interface SubmitProofParams {
  betId: string;
  proofUrl: string;
}

export interface ContractError extends Error {
  code?: string;
  reason?: string;
}
