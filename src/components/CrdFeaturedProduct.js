import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CrdFeaturedProduct() {
    const navigation = useNavigation();
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        // Función para obtener el producto aleatorio
        const fetchProductoAleatorio = async () => {
            try {
                const response = await fetch('https://sought-dassie-partly.ngrok-free.app/api/Producto/producto-aleatorio');
                if (!response.ok) {
                    throw new Error('Error al obtener el producto');
                }
                const data = await response.json();
                console.log(data)
                setProducto(data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError(true);
                setLoading(false);
            }
        };

        fetchProductoAleatorio();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />;
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Error al cargar el producto. Intenta nuevamente más tarde.</Text>
            </View>
        );
    }

    // Verificar que el objeto producto tiene los datos necesarios
    if (!producto || !producto.precio || !producto.nombre || !producto.imagenUrl) {
        return <Text>Error en los datos del producto</Text>;
    }

    return (
        <TouchableOpacity
            style={[styles.containerPrincipal]}
            onPress={() => navigation.navigate('Producto', { idProducto: producto.idProducto })}
        >
            <View style={styles.containerImagen}>
                <Image
                    style={styles.imagenProducto}
                    source={{ uri: producto.imagenUrl || 'https://via.placeholder.com/250' }} // Placeholder si no hay imagen
                />
            </View>

            {/* Separador */}
            <View style={styles.separator} />

            <View style={styles.containerTexto}>
                <Text style={styles.estiloTitle}>{producto.nombre || 'Producto sin nombre'}</Text>
                <Text style={styles.estiloPrice}>
                    {producto.precio !== undefined ? `$${producto.precio.toFixed(2)}` : 'Precio no disponible'}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    containerPrincipal: {
        flex: 1,
        height: 415,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
    },
    containerImagen: {
        height: 300,
        alignSelf: 'center',
    },
    imagenProducto: {
        width: 250,
        height: 250,
        borderRadius: 12,
        justifyContent: 'center',
        alignContent: 'center',
    },
    containerTexto: {
        width: '100%',
        flexDirection: 'column',
    },
    estiloTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    estiloPrice: {
        fontSize: 14,
        color: '#7D7D7D',
        marginBottom: 5,
    },
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0', // Color gris claro para la línea
        marginVertical: 10, // Espacio alrededor del separador
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
    },
});
