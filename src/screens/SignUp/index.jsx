import "react-native-url-polyfill/auto";
import { useState, useEffect } from "react";
import { supabase } from "../../config/supabaseConfig";
import Auth from "../../components/Auth";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { styles } from "./styles";
import AntDesign from "react-native-vector-icons/AntDesign";
import Toast from "react-native-toast-message";

export default function SignUp({ navigation }) {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (session && session.user) {
      navigation.navigate("DrawerApp");
    }
  }, [session]);

  async function signUpWithEmail() {
    setLoading(true);

    if (password !== confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "As senhas não coincidem!",
      });
      setLoading(false);
      return;
    }

    const { error: signUpError } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (signUpError) {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: signUpError.message,
      });
      setLoading(false);
      return;
    }

    // Tentar login após cadastro
    const {
      data: { session },
      error: signInError,
    } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (signInError) {
      Toast.show({
        type: "info",
        text1: "Verifique seu email",
        text2: "Confirmar seu cadastro antes de entrar.",
      });
      navigation.navigate("SignIn");
      setLoading(false);
      return;
    }

    if (session) {
      navigation.navigate("DrawerApp"); // tela principal
    }

    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("InitScreen")}
        >
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.subtitle}>Bem vindo!!</Text>
        <Text style={styles.title}>Cadastrar</Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.inputContainer}>
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
          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholder="Insira sua senha"
            autoCapitalize="none"
            autoComplete="password"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirmar senha</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPassword}
            secureTextEntry={true}
            placeholder="Confirme sua senha"
            autoCapitalize="none"
            autoComplete="password"
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              styles.signInButton,
              loading && styles.buttonDisabled,
            ]}
            disabled={loading}
            onPress={signUpWithEmail}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.buttonText}>Cadastrar</Text>
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.divisor}>
          <View style={styles.line} />
          <Text style={styles.divisorText}>ou</Text>
          <View style={styles.line} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.googleButton, loading && styles.buttonDisabled]}
            disabled={loading}
            onPress={() =>
              Toast.show({
                type: "info",
                text1: "Funcionalidade em desenvolvimento",
              })
            }
          >
            {loading ? (
              <ActivityIndicator color="#007AFF" />
            ) : (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <AntDesign name="google" size={20} color="#000000" />
                <Text style={styles.buttonTextGoogle}>Entrar com Google</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            disabled={loading}
            onPress={() => navigation.navigate("SignIn")}
          >
            <Text style={styles.buttonTextSignUp}>
              Já possui uma conta? Entrar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
