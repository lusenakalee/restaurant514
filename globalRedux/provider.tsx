"use client"

import { store } from '@/lib/store';
// provider.tsx
import { ReactNode } from 'react';
import { Provider } from 'react-redux';

interface ReduxProvidersProps {
  children: ReactNode;
}

export function ReduxProviders({ children }: ReduxProvidersProps) {
  return <Provider store={store}>{children}</Provider>;
}