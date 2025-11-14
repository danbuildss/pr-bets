import type { Metadata } from 'next';
import { GeistSans, GeistMono } from 'geist/font';
import './globals.css';
import Providers from './providers';

const farcasterFrameAction = {
  version: 'next',
  imageUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/og-image.jpg`,
  button: {
    title: 'Launch PR Bet',
    action: {
      type: 'launch_frame',
      name: 'PR Bet',
      url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}`,
      splashImageUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/icon.svg`,
      splashBackgroundColor: '#000000',
    },
  },
};

export const metadata: Metadata = {
  title: 'PR Bet - Base Mini App',
  description: 'Predict and bet on personal record achievements with the community',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    userScalable: false,
    themeColor: '#000000',
  },
  openGraph: {
    title: 'PR Bet - Prediction Market',
    description: 'Bet on personal record achievements with friends and earn rewards',
    type: 'website',
    url: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/og-image.jpg`,
        width: 1200,
        height: 630,
      },
    ],
  },
  other: {
    'fc:frame': JSON.stringify(farcasterFrameAction),
    'fc:miniapp:version': '1.2.0',
    'fc:miniapp:image': `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/og-image.jpg`,
    'fc:miniapp:image:aspect_ratio': '1.91:1',
  },
    generator: 'v0.app'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="mobile-web-app-capable" content="yes" />
        <script
          src="https://cdn.jsdelivr.net/npm/@farcaster/miniapp-sdk@latest/dist/index.min.js"
          async
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
