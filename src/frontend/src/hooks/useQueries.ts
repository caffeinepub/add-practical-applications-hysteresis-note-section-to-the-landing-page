import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { setActorInstance } from '@/lib/backendClient';
import { useEffect } from 'react';
import type { Contact } from '../backend';

export function useGetAllContacts() {
  const { actor, isFetching } = useActor();

  // Update cached actor instance
  useEffect(() => {
    if (actor) {
      setActorInstance(actor);
    }
  }, [actor]);

  return useQuery<Contact[]>({
    queryKey: ['contacts'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllContacts();
    },
    enabled: !!actor && !isFetching,
  });
}
