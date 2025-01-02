import { gql } from '@apollo/client';

export const GET_ALL_COLLECTIONS = gql`
  query GetAllCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          handle
          title
          products(first: 50) {
            edges {
              node {
                id
                title
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
                      price {
                        amount
                        currencyCode
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
