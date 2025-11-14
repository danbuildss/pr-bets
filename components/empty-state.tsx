interface EmptyStateProps {
  title: string;
  description?: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="text-white/40 mb-4">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 36c-8.84 0-16-7.16-16-16s7.16-16 16-16 16 7.16 16 16-7.16 16-16 16zm3.5-9h-7v-2h7v2zm0-4h-7v-2h7v2zm0-4h-7v-2h7v2z" fill="currentColor"/>
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      {description && <p className="text-white/60 text-sm text-center max-w-sm">{description}</p>}
    </div>
  );
}
