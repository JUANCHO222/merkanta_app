import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';

const categories = [
    { id: '1', name: 'Categoría 1', image: require('../../assets/adaptive-icon.png') },
    { id: '2', name: 'Categoría 2', image: require('../../assets/adaptive-icon.png') }, // No image provided
    { id: '3', name: 'Categoría 3', image: require('../../assets/adaptive-icon.png') },
    { id: '4', name: 'Categoría 4', image: require('../../assets/adaptive-icon.png') },
    { id: '5', name: 'Categoría 5', image: require('../../assets/adaptive-icon.png') }, // No image provided
    { id: '6', name: 'Categoría 6', image: require('../../assets/adaptive-icon.png') },
];

const numColumns = 2; // Number of columns in the grid

export default function CardCategories() {
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.categoryCard}>
            <Image 
                source={item.image ? item.image : require('../../assets/adaptive-icon.png')}
                style={styles.categoryImage} 
            />
            <Text style={styles.categoryText}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.card}>
            <Text style={styles.title}>Categorías</Text>
            <View style={styles.categoriesContainer}>
                <FlatList
                    data={categories}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
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
        marginBottom:20
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
        backgroundColor: '#f0f0f0',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
    categoryImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginBottom: 5,
    },
    categoryText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    row: {
        justifyContent: 'space-between',
    },
});