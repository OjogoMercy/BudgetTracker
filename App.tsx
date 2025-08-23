import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import general from './src/constants/General';
import { Colors ,FONTS} from './src/constants/Theme';
import CustomInput from './src/components/CustomInput';
import React, { useState } from "react";

export default function App() {
  const [amount, setAmount] = useState('')

const data = [
  { name: "Puff Puff", price: 200 },
  { name: "Notebook", price: 500 },
  { name: "Transport", price: 1000 },
];
  
  return (
    <View style={[general.container, {backgroundColor:Colors.background}]}>
      <Text style={{ ...FONTS.h1, color: Colors.primary }}> Budget Demo</Text>
      <Text style={general.boldText}>Enter Budget Amount</Text>
      <CustomInput value={amount} onChangeText={setAmount} placeholder='Enter Amount...' />
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <View style={general.input}>
              <Text>{ item.name}</Text>
            </View>
          )
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({

});
