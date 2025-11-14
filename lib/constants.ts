export const CHAIN_ID = 84532; // Base Sepolia
export const CHAIN_NAME = 'Base Sepolia';
export const RPC_URL = process.env.NEXT_PUBLIC_BASE_SEPOLIA_RPC || 'https://sepolia.base.org';
export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '';
export const USDC_ADDRESS = process.env.NEXT_PUBLIC_USDC_ADDRESS || '';
export const ADMIN_ADDRESS = process.env.NEXT_PUBLIC_ADMIN_ADDRESS || '';

export const TOAST_DURATION = 4000;

export const CONTRACT_ABI = [
  {
    name: 'getBet',
    type: 'function',
    inputs: [{ name: 'betId', type: 'uint256' }],
    outputs: [
      { name: 'creator', type: 'address' },
      { name: 'title', type: 'string' },
      { name: 'description', type: 'string' },
      { name: 'deadline', type: 'uint256' },
      { name: 'totalPool', type: 'uint256' },
      { name: 'yesPool', type: 'uint256' },
      { name: 'noPool', type: 'uint256' },
      { name: 'resolved', type: 'bool' },
      { name: 'outcome', type: 'bool' },
    ],
  },
  {
    name: 'getAllBets',
    type: 'function',
    inputs: [],
    outputs: [{ name: '', type: 'uint256[]' }],
  },
  {
    name: 'getUserBets',
    type: 'function',
    inputs: [{ name: 'user', type: 'address' }],
    outputs: [{ name: '', type: 'uint256[]' }],
  },
  {
    name: 'createBet',
    type: 'function',
    inputs: [
      { name: 'title', type: 'string' },
      { name: 'description', type: 'string' },
      { name: 'deadline', type: 'uint256' },
      { name: 'proofInstructions', type: 'string' },
    ],
    outputs: [{ name: 'betId', type: 'uint256' }],
  },
  {
    name: 'placeBet',
    type: 'function',
    inputs: [
      { name: 'betId', type: 'uint256' },
      { name: 'side', type: 'bool' },
      { name: 'amount', type: 'uint256' },
    ],
  },
  {
    name: 'submitProof',
    type: 'function',
    inputs: [
      { name: 'betId', type: 'uint256' },
      { name: 'proofUrl', type: 'string' },
    ],
  },
  {
    name: 'resolveBet',
    type: 'function',
    inputs: [
      { name: 'betId', type: 'uint256' },
      { name: 'outcome', type: 'bool' },
    ],
  },
  {
    name: 'claimWinnings',
    type: 'function',
    inputs: [{ name: 'betId', type: 'uint256' }],
  },
] as const;

export const USDC_ABI = [
  {
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', type: 'bool' }],
    type: 'function',
  },
  {
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', type: 'bool' }],
    type: 'function',
  },
  {
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    type: 'function',
    stateMutability: 'view',
  },
] as const;

export const BET_STATES = {
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED',
  RESOLVED: 'RESOLVED',
  CLAIMED: 'CLAIMED',
} as const;
