# PR Bet - Base Mini App

A lightweight prediction market for personal record achievements built on Base.

## Features

- **Create PR Bets** - Set fitness goals with deadlines and verification methods
- **Community Betting** - Users stake USDC on YES/NO outcomes
- **Proof Submission** - Submit verification (Twitter links, etc.)
- **Winner Rewards** - Winners claim proportional share of loser pool
- **Mobile First** - Fully responsive Base Mini app

## Getting Started

### Prerequisites

- Node.js 18+
- Wallet with Base Sepolia testnet
- Testnet USDC

### Installation

\`\`\`bash
npm install
\`\`\`

### Environment Setup

Create a `.env.local` file:

\`\`\`
NEXT_PUBLIC_CONTRACT_ADDRESS=0x... # Your deployed PRBetMarket contract
NEXT_PUBLIC_USDC_ADDRESS=0x...     # Base Sepolia USDC address
NEXT_PUBLIC_BASE_SEPOLIA_RPC=https://sepolia.base.org
NEXT_PUBLIC_ADMIN_ADDRESS=0x...    # Admin address for resolving bets
NEXT_PUBLIC_WALLET_CONNECT_ID=...  # WalletConnect project ID
NEXT_PUBLIC_BASE_URL=http://localhost:3000
\`\`\`

### Development

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

\`\`\`
app/
├── page.tsx              # Home page
├── bets/
│   ├── page.tsx          # All bets listing
│   └── [id]/page.tsx     # Bet detail page
├── create/page.tsx       # Create bet page
├── profile/page.tsx      # User profile & bets
├── layout.tsx            # Root layout
├── globals.css           # Tailwind styles
├── providers.tsx         # Wagmi/Rainbow Kit setup
└── wagmi.config.ts       # Wagmi chain config

components/
├── navbar.tsx            # Navigation bar
├── wallet-button.tsx     # Connect wallet button
├── bet-card.tsx          # Bet card component
├── bet-pool.tsx          # Pool visualization
├── bet-form.tsx          # Create bet form
├── button.tsx            # Reusable button
├── modal.tsx             # Modal wrapper
├── join-bet-modal.tsx    # Place bet modal
├── submit-proof-modal.tsx # Submit proof modal
├── claim-winnings-modal.tsx # Claim winnings modal
├── loader.tsx            # Loading spinner
├── empty-state.tsx       # Empty state component
└── modals-wrapper.tsx    # All modals container

hooks/
└── usePRBet.ts           # Contract interaction hooks

lib/
├── types.ts              # TypeScript interfaces
├── constants.ts          # Contract ABI & constants
├── contract.ts           # Contract utilities
├── store.ts              # Zustand state store
└── utils.ts              # Helper functions
\`\`\`

## Contract Integration

Update the contract interaction functions in `hooks/usePRBet.ts` with actual contract calls once your `PRBetMarket.sol` is deployed.

Replace these placeholders:
- `useCreateBet()` - Call `contract.createBet()`
- `usePlaceBet()` - Call `contract.placeBet()`
- `useSubmitProof()` - Call `contract.submitProof()`
- `useClaimWinnings()` - Call `contract.claimWinnings()`
- `useGetAllBets()` - Call `contract.getAllBets()`
- `useGetBet()` - Call `contract.getBet()`
- `useGetUserBets()` - Call `contract.getUserBets()`

## Deployment

\`\`\`bash
npm run build
npm start
\`\`\`

Deploy to Vercel:

\`\`\`bash
vercel deploy
\`\`\`

## Key Configuration

### Chain
- **Network**: Base Sepolia (84532)
- **RPC**: https://sepolia.base.org

### Wallet Integration
- **RainbowKit** - Multi-wallet support
- **Wagmi** - React hooks for Ethereum
- **Viem** - Contract interactions

### State Management
- **Zustand** - User bets cache, modals, loading states

## Design

- **Theme**: Dark mode (black/white/blue)
- **Mobile First**: Responsive on all devices
- **Components**: Tailwind CSS utility-first
- **Icons**: Minimal SVG

## Development Tips

1. **Skeleton Loaders** - Replace `Loader` component with skeletons
2. **Error Handling** - All contract calls use toast notifications
3. **Contract Placeholders** - ABI is configured in `lib/constants.ts`
4. **TypeScript**: Full type safety for contract parameters

## License

MIT

## Support

For Base MiniKit documentation, visit [base.org/minikit](https://base.org/minikit)
