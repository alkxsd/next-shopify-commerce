import { gql } from '@apollo/client';

export const GET_HERO_BANNER = gql`
  query GetHeroBanner($handle: String!) {
    metaobject(handle: { handle: $handle, type: "hero_banner" }) {
      fields {
        key
        value
        reference {
          ... on MediaImage {
            image {
              url
              altText
              width
              height
            }
          }
        }
      }
    }
  }
`;
