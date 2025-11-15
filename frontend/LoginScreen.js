// frontend/screens/LoginScreen.js
import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import api from "../api/api";
import { AuthContext } from "../navigation/AppNavigator";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useContext(AuthContext);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      const { access_token, user } = res.data; // backend should return token + role
      signIn({ token: access_token, role: user?.role || "student" });
    } catch (err) {
      console.log(err?.response?.data || err.message);
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={{ marginBottom: 12 }}>Login</Text>
      <TextInput label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput label="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button mode="contained" onPress={handleLogin} loading={loading} style={{ marginTop: 12 }}>
        Login
      </Button>
      <Button onPress={() => navigation.navigate("Register")}>Create an account</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1, justifyContent: "center" }
});
