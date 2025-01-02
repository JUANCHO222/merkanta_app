import { gql } from "@apollo/client";

export const GET_RECOMMENDATIONS = gql`
  query GetProductRecommendations($id: ID!) {
    productRecommendations(productId: $id, intent: RELATED) {
      id
      title
      description
      images(first: 1) {
        edges {
          node {
            src
          }
        }
      }
      variants(first: 1) {
        edges {
          node {
            id
            priceV2 {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;
