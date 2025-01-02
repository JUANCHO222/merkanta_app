import React, { useState, useEffect } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

export default function Prueba() {
  const [productos, setProductos] = useState([]); // Estado para almacenar los productos
  const [loading, setLoading] = useState(true); // Estado para manejar el estado de carga
  const [error, setError] = useState(null); // Estado para manejar posibles errores

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch(
          "https://ffd7-2806-2f0-9281-fc87-3813-aa6b-aeb9-615b.ngrok-free.app/api/Producto"
        );
        if (!response.ok) {
          throw new Error("No se pudo obtener los datos de los productos.");
        }

        const data = await response.json();
        setProductos(data); // Guardar los datos en el estado
      } catch (err) {
        console.error("Error:", err.message);
        setError("Error al obtener productos. Por favor, inténtelo más tarde.");
      } finally {
        setLoading(false); // Cambiar el estado de carga
      }
    };

    fetchProductos(); // Llamar a la función al cargar el componente
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    ); // Indicador de carga
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    ); // Mensaje de error
  }

  return (
    <FlatList
      data={productos} // Pasar los datos a FlatList
      keyExtractor={(item) => item.idProducto.toString()} // Cambié 'id' a 'idProducto'
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.productName}>{item.nombre}</Text>
          <Text style={styles.productReference}>Referencia: {item.descripcion}</Text>
          <Text style={styles.productPrice}>Precio: ${item.precio}</Text>
          <Text style={styles.productCategory}>Categoría: {item.idCategoria}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  productReference: {
    fontSize: 16,
    color: "#555",
  },
  productPrice: {
    fontSize: 16,
    color: "green",
  },
  productCategory: {
    fontSize: 14,
    color: "#777",
  },
});
