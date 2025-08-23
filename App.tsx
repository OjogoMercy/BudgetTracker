import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import general from './src/constants/General';
import { Colors ,FONTS} from './src/constants/Theme';
import CustomInput from './src/components/CustomInput';
import React, { useState } from "react";

export default function App() {
  const [amount, setAmount] = useState('')
  
  return (
    <View style={general.container}>
      <Text style={{ ...FONTS.h1, color: Colors.primary }}> Budget Demo</Text>
      <Text style={general.boldText}>Enter Budget Amount</Text>
      <CustomInput value={amount} onChangeText={setAmount} placeholder='Enter Amount...' />
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <View></View>
          )
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({

});
