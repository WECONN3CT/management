'use client';

import { use } from 'react';

export default function StoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return (
    <div>
      <h1 className="text-3xl font-bold">Story Detail</h1>
      <p className="text-muted-foreground mt-2">
        Story ID: {id}
      </p>
      <p className="text-muted-foreground">
        Story detail view will be implemented in Story 7.1
      </p>
    </div>
  );
}
