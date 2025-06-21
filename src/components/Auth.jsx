import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { supabase } from "../config/supabaseConfig";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, styles.mt20]}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize="none"
          keyboardType="email-address"
          autoComplete="email"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize="none"
          autoComplete="password"
        />
      </View>

      <View style={[styles.buttonContainer, styles.mt20]}>
        <TouchableOpacity
          style={[
            styles.button,
            styles.signInButton,
            loading && styles.buttonDisabled,
          ]}
          disabled={loading}
          onPress={signInWithEmail}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.buttonText}>Entrar</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            styles.signUpButton,
            loading && styles.buttonDisabled,
          ]}
          disabled={loading}
          onPress={signUpWithEmail}
        >
          {loading ? (
            <ActivityIndicator color="#007AFF" />
          ) : (
            <Text style={[styles.buttonText, styles.signUpButtonText]}>
              Cadastrar
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  inputContainer: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  button: {
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 50,
  },
  signInButton: {
    backgroundColor: "#007AFF",
  },
  signUpButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
  signUpButtonText: {
    color: "#007AFF",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  mt20: {
    marginTop: 20,
  },
});
