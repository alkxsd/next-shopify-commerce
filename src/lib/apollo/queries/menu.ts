import { gql } from "@apollo/client";

/**
 * Get two-level shopify storefront menu
 */
export const GET_MENU = gql `
  query GetMenu($handle: String!) {
    menu(handle: $handle) {
      items {
        title
        url
        items {
          title
          url
        }
      }
    }
  }
`;