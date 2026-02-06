import { useActor } from '@/hooks/useActor';

let cachedActor: ReturnType<typeof useActor>['actor'] = null;

// Helper to get actor instance
export function setActorInstance(actor: ReturnType<typeof useActor>['actor']) {
  cachedActor = actor;
}

export async function submitContactForm(name: string, email: string, message: string): Promise<void> {
  if (!cachedActor) {
    throw new Error('Backend actor not initialized. Please try again.');
  }

  try {
    await cachedActor.submitContact(name, email, message);
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error('Failed to submit contact form. Please try again later.');
  }
}
