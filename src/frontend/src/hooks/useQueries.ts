import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { UserProfile, Order, PackageType, Lead, FormLead, ChatbotLead, Product } from '../backend';

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useGetDashboard() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getDashboard();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useClaimFreeTrial() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.claimFreeTrial();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
}

export function useSubmitOrder() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      packageType: PackageType;
      notes: string;
      productPaid: boolean;
      packagePaid: boolean;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitOrder(params.packageType, params.notes, params.productPaid, params.packagePaid);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
}

export function useSubmitFormLead() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (params: { name: string; email: string; phone: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitFormLead(params.name, params.email, params.phone);
    },
  });
}

export function useSubmitChatbotLead() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      name: string;
      email: string;
      phone: string;
      chatHistory: string[] | null;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitChatbotLead(params.name, params.email, params.phone, params.chatHistory);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
}

export function useGetProducts() {
  const { actor, isFetching } = useActor();

  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsStripeConfigured() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['stripeConfigured'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isStripeConfigured();
    },
    enabled: !!actor && !isFetching,
  });
}
