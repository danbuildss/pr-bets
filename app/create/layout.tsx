import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Bet - PR Bet',
  description: 'Create a new prediction market bet on personal records',
  openGraph: {
    title: 'Create Bet - PR Bet',
    description: 'Create a new prediction market bet on personal records with the community',
    type: 'website',
  },
  other: {
    'fc:miniapp:version': '1.2.0',
    'fc:miniapp:image': `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/og-image.jpg`,
    'fc:miniapp:image:aspect_ratio': '1.91:1',
    'fc:miniapp:action': 'Create a Bet',
    'fc:miniapp:image:alt': 'Create a prediction market on PR Bet',
  },
};

export default function CreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
