import "react-native-url-polyfill/auto";
import { useState, useEffect } from "react";
import { supabase } from "../../config/supabaseConfig";
import Auth from "./../../components/Auth";
import { View, Text, Button } from "react-native";

export default function App({ navigation }) {
  const [session, setSession] = useState(null);

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

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* <Auth /> */}
      <Text>Welcome to the Init Screen!</Text>
      <Button title="Go to Sign In" onPress={() => navigation.navigate("SignIn")} />
      <Button title="Go to Sign Up" onPress={() => navigation.navigate("SignUp")} />

      {session && session.user && <Text>{session.user.id}</Text>}
    </View>
  );
}
