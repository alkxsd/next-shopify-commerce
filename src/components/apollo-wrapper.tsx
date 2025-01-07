'use client';

import { getApolloClient } from '@/lib/apollo/client';
import { ApolloProvider } from '@apollo/client';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const ApolloWrapper = ({ children }: Props) => {
  return <ApolloProvider client={getApolloClient}>{children}</ApolloProvider>;
};
