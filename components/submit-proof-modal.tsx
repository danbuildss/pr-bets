'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { Modal } from './modal';
import { Button } from './button';
import { usePRBetStore } from '@/lib/store';
import { useSubmitProof } from '@/hooks/usePRBet';

interface SubmitProofModalProps {
  betId?: string;
}

export function SubmitProofModal({ betId }: SubmitProofModalProps) {
  const { modalState, closeSubmitProofModal } = usePRBetStore();
  const { submitProof, loading } = useSubmitProof();
  const [proofUrl, setProofUrl] = useState('');

  const isOpen = modalState.submitProof.open && modalState.submitProof.betId === betId;

  const handleSubmit = async () => {
    if (!proofUrl || !modalState.submitProof.betId) {
      toast.error('Please enter a proof URL');
      return;
    }

    const success = await submitProof({
      betId: modalState.submitProof.betId,
      proofUrl,
    });

    if (success) {
      setProofUrl('');
      closeSubmitProofModal();
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={closeSubmitProofModal}
      title="Submit Proof"
    >
      <div className="space-y-4">
        <p className="text-white/70 text-sm">
          Provide a Twitter/X link or other proof that you achieved your PR goal.
        </p>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            Proof URL
          </label>
          <input
            type="url"
            value={proofUrl}
            onChange={(e) => setProofUrl(e.target.value)}
            placeholder="https://twitter.com/..."
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-blue-600"
          />
        </div>

        <div className="pt-2">
          <Button
            onClick={handleSubmit}
            loading={loading}
            className="w-full"
          >
            Submit Proof
          </Button>
        </div>
      </div>
    </Modal>
  );
}
