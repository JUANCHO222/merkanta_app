import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';

const numColumns = 2;

export default function CrdCategorie({onPress}) {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCategories = async () => {
        try {
            const response = await fetch('https://sought-dassie-partly.ngrok-free.app/api/Categoria/listar'); // Cambia esta URL por la correcta
            const result = await response.json();
            console.log(result); // Verifica la estructura de los datos en la consola
            if (response.ok) {
                setCategories(result.categorias || []);
            } else {
                setError(result.message || 'Error al obtener las categorías');
            }
        } catch (err) {
            setError('No se pudo conectar con el servidor.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.categoryCard} onPress={()=>{}}>
            <Image 
                source={{ uri: item.imagenUrl }} 
                style={styles.categoryImage} 
                resizeMode="cover" // Asegúrate de que la imagen cubra todo el espacio
            />
            {/* Texto superpuesto sobre la imagen */}
            <View style={styles.overlay}>
                <Text style={styles.categoryText}>{item.nombre}</Text>
            </View>
        </TouchableOpacity>
    );

    if (loading) {
        return <ActivityIndicator size="large" color="#2fd896" style={{ marginTop: 20 }} />;
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.card}>
            <Text style={styles.title}>Categorías</Text>
            <View style={styles.categoriesContainer}>
                <FlatList
                    data={categories}
                    renderItem={renderItem}
                    keyExtractor={item => item.idCategoria.toString()}
                    numColumns={numColumns}
                    columnWrapperStyle={styles.row}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 20,
    },
    title: {
        backgroundColor: "#2fd896",
        width: "100%",
        padding: 10,
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    categoriesContainer: {
        flex: 1,
        borderTopWidth: 1,
        borderColor: '#ccc',
    },
    categoryCard: {
        flex: 1,
        margin: 5,
        height: 150, // Altura fija para las tarjetas
        borderRadius: 8,
        overflow: 'hidden', // Asegúrate de que la imagen no se salga del contenedor
    },
    categoryImage: {
        width: '100%',
        height: '100%', // Ocupa todo el espacio del contenedor
    },
    overlay: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semi-transparente
        padding: 5,
        alignItems: 'center',
    },
    categoryText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    row: {
        justifyContent: 'space-between',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
