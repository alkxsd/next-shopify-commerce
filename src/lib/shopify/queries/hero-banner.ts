export const getHeroBannerQuery = /* GraphQL */ `
  query getHeroBanner($handle: String!) {
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
