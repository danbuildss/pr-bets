export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  const manifest = {
    frame: {
      name: 'PR BETS',
      version: '1',
      iconUrl: `${baseUrl}/icon.jpg`,
      homeUrl: baseUrl,
      imageUrl: `${baseUrl}/image.jpg`,
      splashImageUrl: `${baseUrl}/splash.jpg`,
      splashBackgroundColor: '#0A0F2C',
      webhookUrl: `${baseUrl}/api/webhook`,
      primaryCategory: 'health-fitness',
      subtitle: 'Bet on Personal Records. Win USDC.',
      description: 'A simple on-chain prediction app where you bet USDC on whether someone will hit their fitness goal (PR). Submit proof, resolve results, and winners claim the reward pool.',
    },
  };

  return Response.json(manifest, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
