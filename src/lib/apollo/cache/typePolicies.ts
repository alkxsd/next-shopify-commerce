import { TypePolicies } from "@apollo/client";

export const typePolicies: TypePolicies = {
  Menu: {
    fields: {
      items: {
        merge(_existing, incoming) {
          return incoming;
        },
      },
    },
  },
};