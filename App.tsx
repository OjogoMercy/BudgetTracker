import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import general from "./src/constants/General";
import {
  Colors,
  FONTS,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  Sizes,
  Theme,
} from "./src/constants/Theme";
import CustomInput from "./src/components/CustomInput";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function App() {
  const [amount, setAmount] = useState("");
  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");

  const data = [
    { name: "Puff Puff", price: 200 },
    { name: "Notebook", price: 500 },
    { name: "Transport", price: 1000 },
  ];

  return (
    <View style={[general.container, { backgroundColor: Colors.background }]}>
      <Text style={{ ...FONTS.h1, color: Colors.primary }}> Budget Demo</Text>
      <Text style={[general.boldText, { marginVertical: SCREEN_WIDTH * 0.03 }]}>
        Enter Budget Amount
      </Text>
      <CustomInput
        value={amount}
        onChangeText={setAmount}
        placeholder="Enter Budget..."
        inputStyle={{ backgroundColor: Colors.white }}
        iconName=""
      />
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <View
              style={[
                general.input,
                {
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginVertical: SCREEN_WIDTH * 0.01,
                },
              ]}
            >
              <Text>{item.name}</Text>
              <Text>₦{item.price}</Text>
            </View>
          );
        }}
      />
      <KeyboardAvoidingView
        style={[
          styles.starsRow,
          {
            alignSelf: "baseline",
            backgroundColor: Theme.lightTheme.inputBackground,
          },
        ]}
        behavior="padding"
      >
        <View>
          <TextInput
            placeholder="Enter Item..."
            placeholderTextColor={Colors.chocolate}
            style={[
              styles.inputcontainer,
              { backgroundColor: Theme.lightTheme.inputBackground },
            ]}
          />
          <View style={{ backgroundColor:Colors.gray4, width: "90%", height: 1 }} />
          <TextInput
            placeholder="Enter Price..."
            placeholderTextColor={Colors.chocolate}
            style={[
              styles.inputcontainer,
              { backgroundColor: Theme.lightTheme.inputBackground },
            ]}
          />
        </View>

        <TouchableOpacity activeOpacity={0.7} style={styles.float1}>
          <Ionicons name="add" size={20} color="white" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  starsRow: {
    flexDirection: "row",
    marginBottom: SCREEN_HEIGHT * 0.01,
    borderColor: "#ccc",
    borderRadius: SCREEN_WIDTH * 0.06,
    borderWidth: 2,
    padding: SCREEN_HEIGHT * 0.015,
    alignSelf: "center",
    alignItems:'center'
  },
  float1: {
    height: SCREEN_HEIGHT * 0.06,
    width: SCREEN_WIDTH * 0.12,
    borderRadius: SCREEN_WIDTH * 0.055,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  inputcontainer: {
    padding: SCREEN_HEIGHT * 0.01,
    width: SCREEN_WIDTH * 0.72,
    alignSelf: "center",
    marginTop: Sizes.base * 0.5,
  },
});
