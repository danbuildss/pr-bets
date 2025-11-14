import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile - PR Bet',
  description: 'View your betting history and statistics',
  openGraph: {
    title: 'Profile - PR Bet',
    description: 'View your betting history and statistics on PR Bet',
    type: 'website',
  },
  other: {
    'fc:miniapp:version': '1.2.0',
    'fc:miniapp:image': `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/og-image.jpg`,
    'fc:miniapp:image:aspect_ratio': '1.91:1',
    'fc:miniapp:action': 'View Profile',
    'fc:miniapp:image:alt': 'Your PR Bet profile',
  },
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
