import React, { useState } from "react";
import { Text, View, FlatList } from "react-native";
import { Footer, ProductoDestacado, Categoria, ProductoPorCategoria, Carrusel } from "../components";
import { GlobalStyles } from "../styles/GlobalStyles";

import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const navigation = useNavigation();

  const [refreshing, setRefreshing] = useState(false);

  // Función para recargar todos los productos en la pantalla
  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      // TODO: Aquí puedes hacer el refetch de las consultas o cualquier acción de recarga que quieras
    } catch (error) {
      console.error("Error al recargar:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const data = [1]; // Datos de ejemplo

  return (
    <View style={GlobalStyles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => `item-${index}`} // Usa un identificador único para cada elemento
        renderItem={() => (
          <>
            <View style={GlobalStyles.content}>
              <ProductoPorCategoria idCategoria={1} onPress={() => console.log("Ver más productos")} />
                <Categoria/>
              <ProductoDestacado />
            </View>
          </>
        )}
        refreshing={refreshing} // Muestra el estado de refresco
        onRefresh={handleRefresh} // Llama a la función de recarga cuando el usuario hace Pull to Refresh
      />
    </View>
  );
}
