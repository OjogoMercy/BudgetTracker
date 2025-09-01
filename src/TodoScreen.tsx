import {  FlatList,  KeyboardAvoidingView,  StyleSheet,  Text,  TextInput,  TouchableOpacity,  View,} from "react-native";
import {
  Colors,
  FONTS,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  Sizes,
  Theme,
} from "../src/constants/Theme";
import CustomInput from "../src/components/CustomInput";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import general from "./constants/General";
import { useDispatch, useSelector } from "react-redux";
import { setTodo,addTodo,removeTodo,editTodo } from "./Redux/TodoSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TodoScreen = () => {
    const [item, setItem] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
    const dispatch = useDispatch()
    



  return (
    <View style={[general.container, { backgroundColor: Colors.background }]}>
      <Text style={{ ...FONTS.h1, color: Colors.primary }}>Todo-App</Text>
      <FlatList
        data={todo}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
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
            <Text style={{ marginLeft: "auto" }}>₦{item.price}</Text>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                setItem(item.name);
                setPrice(item.price.toString());
                setEditingIndex(index);
              }}
            >
              <Feather
                name="edit"
                size={Sizes.h3}
                style={{ marginLeft: Sizes.base }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => handleDeleteExpense(index)}
            >
              <Feather
                name="trash-2"
                size={Sizes.h3}
                style={{ marginLeft: Sizes.base }}
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({
  starsRow: {
    flexDirection: "row",
    marginBottom: SCREEN_HEIGHT * 0.01,
    borderColor: "#ccc",
    borderRadius: SCREEN_WIDTH * 0.06,
    borderWidth: 2,
    padding: SCREEN_HEIGHT * 0.015,
    alignSelf: "center",
    alignItems: "center",
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
    marginVertical: Sizes.base * 0.5,
  },
});
