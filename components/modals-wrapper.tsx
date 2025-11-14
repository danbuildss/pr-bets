'use client';

import { JoinBetModal } from './join-bet-modal';
import { SubmitProofModal } from './submit-proof-modal';
import { ClaimWinningsModal } from './claim-winnings-modal';

export function ModalsWrapper() {
  return (
    <>
      <JoinBetModal />
      <SubmitProofModal />
      <ClaimWinningsModal />
    </>
  );
}
