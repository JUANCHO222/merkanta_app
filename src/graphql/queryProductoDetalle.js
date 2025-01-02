import { gql } from '@apollo/client';

export const GET_PRODUCT_DETAILS = gql`
  query GetProductDetails($id: ID!) {
    product(id: $id) {
      id
      title
      description
      availableForSale
      totalInventory
      images(first: 10) {
        edges {
          node {
            src
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            availableForSale
            quantityAvailable  # Agregado aquí
            selectedOptions {
              name
              value
            }
          }
        }
      }
    }
  }
`;
