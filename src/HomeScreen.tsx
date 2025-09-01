import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
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
import {
  setBudgetAmount,
  addExpense,
  deleteExpense,
  editExpense,
} from "./Redux/BudgetSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  const dispatch = useDispatch();
  const budgetAmount = useSelector((state) => state.budget.budgetAmount);
  const expense = useSelector((state) => state.budget.expense);
  const totalExpenses = expense.reduce((sum, exp) => sum + exp.price, 0);
  const remainingBudget = parseInt(budgetAmount) - totalExpenses;

  const handleSubmit = () => {
    const newExpense = { name: item, price: parseInt(price) };
    const newTotal =
      editingIndex !== null
        ? totalExpenses - expense[editingIndex].price + newExpense.price
        : totalExpenses + newExpense.price;
    //For storing in AsyncS
    const storeData = async (expenses: any) => {
      try {
        const jsonValue = JSON.stringify(expenses);
        await AsyncStorage.setItem("expenses", jsonValue);
      } catch (e) {
        console.log("Error saving data");
      }
    };
    if (newTotal > parseInt(budgetAmount)) {
      Alert.alert(
        `Expense exceeds your budget! You only have ₦${remainingBudget} left.`
      );
      return;
    }
    if (editingIndex !== null) {
      const updatedExpenses = [...expense]
      updatedExpenses[editingIndex] = newExpense
      dispatch(
        editExpense({ index: editingIndex, updatedExpense: newExpense })
      ); storeData(updatedExpenses)
      setEditingIndex(null);
    } else {
      const updatedExpense = [...expense, newExpense]
      dispatch(addExpense(newExpense));
      storeData(updatedExpense)
    }
    setItem("");
    setPrice("");
  };
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("expenses");
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.log("Error reading data", e);
      return [];
    }
  };


  const handleDeleteExpense = (index) => {
    dispatch(deleteExpense(index));
  };

  return (
    <View style={[general.container, { backgroundColor: Colors.background }]}>
      <Text style={{ ...FONTS.h1, color: Colors.primary }}>Budget Demo</Text>
      <Text style={[general.boldText, { marginVertical: SCREEN_WIDTH * 0.03 }]}>
        Enter Budget Amount
      </Text>
      <CustomInput
        value={budgetAmount}
        onChangeText={(text) => dispatch(setBudgetAmount(text))}
        placeholder="Enter Budget..."
        inputStyle={{ backgroundColor: Colors.white }}
        keyboardType="numeric"
      />
      <Text style={{ ...FONTS.body3, marginVertical: 10 }}>
        Remaining Budget: ₦{isNaN(remainingBudget) ? 0 : remainingBudget}
      </Text>

      <FlatList
        data={expense}
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
          <View
            style={{ backgroundColor: Colors.gray4, width: "90%", height: 1 }}
          />
          <TextInput
            placeholder="Enter Price..."
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
            placeholderTextColor={Colors.chocolate}
            style={[
              styles.inputcontainer,
              { backgroundColor: Theme.lightTheme.inputBackground },
            ]}
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.float1, { opacity: item && price ? 1 : 0.5 }]}
          onPress={handleSubmit}
          disabled={!item || !price}
        >
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

export default HomeScreen;

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
