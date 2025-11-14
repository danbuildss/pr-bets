import type { Metadata } from 'next';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  return {
    title: `Bet #${id} - PR Bet`,
    description: `Join this prediction market bet on Base. Predict outcomes and earn rewards.`,
    openGraph: {
      title: `Bet #${id} - PR Bet`,
      description: `Join this prediction market bet on Base. Predict outcomes and earn rewards.`,
      url: `${baseUrl}/bets/${id}`,
      type: 'website',
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
        },
      ],
    },
    other: {
      'fc:miniapp:version': '1.2.0',
      'fc:miniapp:image': `${baseUrl}/og-image.jpg`,
      'fc:miniapp:image:aspect_ratio': '1.91:1',
      'fc:miniapp:action': `View Bet #${id}`,
      'fc:miniapp:image:alt': `PR Bet #${id} - Join now`,
    },
  };
}

export default function BetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
