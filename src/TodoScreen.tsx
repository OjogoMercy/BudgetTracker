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
    const dispatch = useDispatch();
    const todo = useSelector((state) => state.Todo);
    const handleSubmit = () => {
      if (!item.trim()) return;

      if (editingIndex !== null) {
        dispatch(editTodo({ index: editingIndex, name: item }));
        setEditingIndex(null);
      } else {
        dispatch(addTodo({ name: item }));
      }

      setItem("");
    };

  return (
    <View style={[general.container, { backgroundColor: Colors.background }]}>
      <Text style={{ ...FONTS.h1, color: Colors.primary }}>Todo-App</Text>
      <FlatList
        data={todo}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View
            style={[general.input,{flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: SCREEN_WIDTH * 0.01,
              },
            ]}
          >
            <Text>{item.name}</Text>
            <TouchableOpacity
              activeOpacity={0.5} >
              <Feather
                name="edit"
                size={Sizes.h3}
                style={{ marginLeft: Sizes.base }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5} >
              <Feather
                name="trash-2"
                size={Sizes.h3}
                style={{ marginLeft: Sizes.base }}
              />
            </TouchableOpacity>
          </View>
        )}
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
            value={item}
            onChangeText={setItem}
            style={[
              styles.inputcontainer,
              { backgroundColor: Theme.lightTheme.inputBackground },
            ]}
          />
           </View>

        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.float1, { opacity: item ? 1 : 0.5 }]}
          onPress={handleSubmit}        >
          <Ionicons
            name={editingIndex !== null ? "checkmark" : "add"}
            size={Sizes.h1}
            color="white"
          />
        </TouchableOpacity>
      </KeyboardAvoidingView>
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
