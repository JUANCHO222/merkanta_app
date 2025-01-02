import { gql } from '@apollo/client';

// Definimos la consulta para obtener productos por categoría
export const GET_ALL_PRODUCTS_BY_CATEGORY = gql`
  query GetProductsByCategory($first: Int!, $collectionHandle: String!, $after: String) {
    collectionByHandle(handle: $collectionHandle) {
      id
      title
        image {
          id
          src
          altText
        }
      products(first: $first, after: $after, filters: { available: true}) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
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
`;
