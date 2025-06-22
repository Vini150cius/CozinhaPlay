import "react-native-url-polyfill/auto";
import { useState, useEffect } from "react";
import { supabase } from "../../config/supabaseConfig";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { styles } from "./styles";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function SignIn({ navigation }) {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
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
        <Text style={styles.subtitle}>Bem vindo de volta!!</Text>
        <Text style={styles.title}>Entrar</Text>
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
          <TouchableOpacity
            style={styles.forgetPasswordButton}
            onPress={() => navigation.navigate("ForgetPassword")}
          >
            <Text style={styles.forgetPasswordText}>Esqueci minha senha</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
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
        <View style={styles.divisor}>
          <View style={styles.line} />
          <Text style={styles.divisorText}>ou</Text>
          <View style={styles.line} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.googleButton, loading && styles.buttonDisabled]}
            disabled={loading}
            onPress={() => console.log("Login com Google")}
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
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text style={styles.buttonTextSignUp}>
              Não tem uma conta? Cadastre-se
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
