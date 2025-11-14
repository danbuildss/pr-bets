export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatUSDC(amount: bigint): string {
  const usdcAmount = Number(amount) / 1e6;
  return usdcAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function calculateOdds(poolAmount: bigint, totalPool: bigint): number {
  if (totalPool === 0n) return 0;
  return (Number(poolAmount) / Number(totalPool)) * 100;
}

export function isDeadlinePassed(deadline: number): boolean {
  return Date.now() > deadline * 1000;
}

export function formatDeadline(deadline: number): string {
  const date = new Date(deadline * 1000);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function timeUntilDeadline(deadline: number): string {
  const now = Date.now();
  const deadlineMs = deadline * 1000;
  const diffMs = deadlineMs - now;

  if (diffMs <= 0) return 'Ended';

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);

  if (days > 0) return `${days}d ${hours}h left`;
  if (hours > 0) return `${hours}h left`;

  const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
  return `${minutes}m left`;
}

export const formatDate = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const getTimeRemaining = (deadline: number): string => {
  const now = Math.floor(Date.now() / 1000);
  const remaining = deadline - now;
  
  if (remaining <= 0) return 'Expired';
  if (remaining < 3600) return `${Math.floor(remaining / 60)}m`;
  if (remaining < 86400) return `${Math.floor(remaining / 3600)}h`;
  return `${Math.floor(remaining / 86400)}d`;
};
