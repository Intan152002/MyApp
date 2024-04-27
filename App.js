import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Button, Image } from 'react-native';
import styled from 'styled-components/native';

// Styled-components untuk komponen kustom
const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #ffffff;
`;

const Heading = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ProductItem = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
`;

const CartItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
`;

const Total = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
  align-self: center;
`;

// Komponen utama
const MainScreen = () => {
  const [cart, setCart] = useState([]);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState(require('./default-product-image.png')); // Gambar default

  const products = [
    { id: '1', name: 'Produk 1', price: 10 },
    { id: '2', name: 'Produk 2', price: 20 },
    { id: '3', name: 'Produk 3', price: 30 },
  ];

  const addToCart = () => {
    const newProduct = { id: String(Date.now()), name: productName, price: parseFloat(productPrice), image: productImage };
    setCart([...cart, newProduct]);
    setProductName('');
    setProductPrice('');
    setProductImage(require('./default-product-image.png')); // Reset gambar ke gambar default setelah ditambahkan
  };

  const calculateTotal = () => {
    return cart.reduce((total, product) => total + product.price, 0);
  };

  return (
    <Container>
      <Heading>Daftar Produk</Heading>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductItem onPress={() => { setProductName(item.name); setProductPrice(item.price) }}>
            <Text>{item.name}</Text>
            <Text>${item.price}</Text>
          </ProductItem>
        )}
      />
      <Heading>Keranjang Belanja</Heading>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CartItem>
            <Image source={item.image} style={{ width: 50, height: 50 }} />
            <Text>{item.name}</Text>
            <Text>${item.price}</Text>
          </CartItem>
        )}
      />
      <Total>Total Belanja: ${calculateTotal()}</Total>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
        <TextInput
          placeholder="Nama Produk"
          value={productName}
          onChangeText={(text) => setProductName(text)}
          style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, width: '45%' }}
        />
        <TextInput
          placeholder="Harga"
          value={productPrice}
          onChangeText={(text) => setProductPrice(text)}
          keyboardType="numeric"
          style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, width: '45%' }}
        />
      </View>
      <TouchableOpacity onPress={addToCart} style={{ backgroundColor: 'green', padding: 10, borderRadius: 5, alignItems: 'center', marginTop: 10 }}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Tambah Produk</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => alert('Checkout')} style={{ backgroundColor: 'blue', padding: 15, borderRadius: 5, alignItems: 'center', marginTop: 10 }}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Checkout</Text>
      </TouchableOpacity>
    </Container>
  );
};

export default MainScreen;