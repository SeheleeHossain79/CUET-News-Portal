// frontend/screens/RegisterScreen.js
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import api from "../api/api";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      await api.post("/auth/register", { email, password });
      alert("Registered successfully! Please login.");
      navigation.navigate("Login");
    } catch (err) {
      console.log(err?.response?.data || err.message);
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={{ marginBottom: 12 }}>Register</Text>
      <TextInput label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput label="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button mode="contained" onPress={handleRegister} loading={loading} style={{ marginTop: 12 }}>
        Register
      </Button>
      <Button onPress={() => navigation.navigate("Login")}>Already have an account?</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1, justifyContent: "center" }
});
