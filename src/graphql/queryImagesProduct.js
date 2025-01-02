import { gql } from "@apollo/client";

export const GET_PRODUCT_IMAGES = gql`
  query GetProductImages($id: ID!) {
    product(id: $id) {
      id
      title
      images(first: 10) {
        edges {
          node {
            id
            src
            altText
          }
        }
      }
    }
  }
`;
