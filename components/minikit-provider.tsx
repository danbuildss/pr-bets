'use client';

import { useEffect, useState } from 'react';
import type { Context } from '@farcaster/miniapp-core';

export function MiniKitProvider() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [context, setContext] = useState<Context.FrameContext>();

  useEffect(() => {
    const load = async () => {
      try {
        const sdk = await import('@farcaster/miniapp-sdk');
        if (sdk) {
          const frameContext = await sdk.default.context;
          setContext(frameContext);
          sdk.default.actions.ready();
        }
      } catch (error) {
        console.error('[v0] Failed to initialize Farcaster SDK:', error);
      }
    };

    if (!isSDKLoaded) {
      setIsSDKLoaded(true);
      load();
    }
  }, [isSDKLoaded]);

  return null;
}
