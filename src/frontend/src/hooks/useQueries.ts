import { useActor } from './useActor';
import { setActorInstance } from '@/lib/backendClient';
import { useEffect } from 'react';

// Update cached actor instance whenever actor changes
export function useActorCache() {
  const { actor } = useActor();

  useEffect(() => {
    if (actor) {
      setActorInstance(actor);
    }
  }, [actor]);
}
