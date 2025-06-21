import "react-native-url-polyfill/auto";
import { useState, useEffect } from "react";
import { supabase } from "../../config/supabaseConfig";
import Auth from "./../../components/Auth";
import { View, Text } from "react-native";

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
    <View>
      <Auth />
      {session && session.user && <Text>{session.user.id}</Text>}
    </View>
  );
}
