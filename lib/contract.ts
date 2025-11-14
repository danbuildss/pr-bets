import { 
  createPublicClient, 
  createWalletClient, 
  http, 
  getContract,
  Address,
  parseUnits,
} from 'viem';
import { baseSepolia } from 'viem/chains';
import { CONTRACT_ADDRESS, USDC_ADDRESS, CONTRACT_ABI, USDC_ABI, RPC_URL } from './constants';

const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(RPC_URL),
});

export const getContractInstance = (walletClient: any) => {
  return getContract({
    address: CONTRACT_ADDRESS as Address,
    abi: CONTRACT_ABI,
    client: { public: publicClient, wallet: walletClient },
  });
};

export const getUsdcInstance = (walletClient: any) => {
  return getContract({
    address: USDC_ADDRESS as Address,
    abi: USDC_ABI,
    client: { public: publicClient, wallet: walletClient },
  });
};

export const formatCurrency = (amount: string, decimals: number = 6): string => {
  if (!amount) return '0';
  const num = BigInt(amount);
  const divisor = BigInt(10 ** decimals);
  const whole = num / divisor;
  const remainder = num % divisor;
  const fractional = remainder.toString().padStart(decimals, '0').slice(0, 2);
  return `${whole}.${fractional}`;
};

export const parseAmount = (amount: string, decimals: number = 6): bigint => {
  return parseUnits(amount, decimals);
};
