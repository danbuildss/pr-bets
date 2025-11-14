import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  const manifest = {
    name: 'PR Bet',
    icon: `${baseUrl}/icon.svg`,
    logo: `${baseUrl}/icon.svg`,
    logoDark: `${baseUrl}/icon.svg`,
    description: 'Predict and bet on personal record achievements with the community',
    homepage: baseUrl,
    splashImageUrl: `${baseUrl}/og-image.jpg`,
    splashBackgroundColor: '#000000',
    website: baseUrl,
    terms: baseUrl,
    privacy: baseUrl,
    requiredFrameAnnouncements: [],
    optionalFrameAnnouncements: [],
    webhookUrl: null,
  };

  return NextResponse.json(manifest);
}
