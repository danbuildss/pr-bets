'use client';

import { useState } from 'react';
import { Button } from './button';
import { CreateBetParams } from '@/lib/types';

interface BetFormProps {
  onSubmit: (params: CreateBetParams) => Promise<void>;
  loading?: boolean;
}

export function BetForm({ onSubmit, loading }: BetFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
    proofInstructions: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.deadline || !formData.proofInstructions) {
      alert('Please fill in all fields');
      return;
    }

    const deadlineTimestamp = Math.floor(new Date(formData.deadline).getTime() / 1000);

    await onSubmit({
      title: formData.title,
      description: formData.description,
      deadline: deadlineTimestamp,
      proofInstructions: formData.proofInstructions,
    });

    setFormData({
      title: '',
      description: '',
      deadline: '',
      proofInstructions: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">
          Bet Title
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g., I will bench press 225 lbs"
          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-blue-600"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Details about your PR goal"
          rows={3}
          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-blue-600"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">
          Deadline
        </label>
        <input
          type="datetime-local"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-600"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">
          Proof Instructions
        </label>
        <textarea
          name="proofInstructions"
          value={formData.proofInstructions}
          onChange={handleChange}
          placeholder="How will you prove you achieved this? (e.g., post on Twitter with video, bring receipt, etc.)"
          rows={3}
          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-blue-600"
          required
        />
      </div>

      <Button
        type="submit"
        loading={loading}
        className="w-full py-3"
      >
        Create Bet
      </Button>
    </form>
  );
}
