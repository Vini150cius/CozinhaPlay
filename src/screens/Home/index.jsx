import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./styles";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { supabase } from "../../config/supabaseConfig";
import Toast from "react-native-toast-message";

export default function Home({ navigation }) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [numero, setNumero] = useState("");
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    read();
    const interval = setInterval(() => {
      read();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Função para criar dados no Supabase
  async function create() {
    if (!nome || !descricao || !numero) {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Preencha todos os campos!",
      });
      return;
    }

    const { error } = await supabase.from("pessoas").insert([
      {
        nome: nome,
        descricao: descricao,
        numero: numero,
      },
    ]);

    if (error) {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Erro ao enviar dados!",
      });
    } else {
      setNome("");
      setDescricao("");
      setNumero("");
      read();
      Toast.show({
        type: "success",
        text1: "Sucesso",
        text2: "Dados enviados com sucesso!",
      });
    }
  }

  // Função para ler dados do Supabase
  async function read() {
    const { data, error } = await supabase
      .from("pessoas")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.log("Erro ao ler dados:", error);
      return;
    }

    setFeed(data);
  }

  const Pessoa = ({ data }) => (
    <View style={styles.areaPessoa}>
      <Text style={styles.textoPessoa}>Nome: {data.nome}</Text>
      <Text style={styles.textoPessoa}>Descrição: {data.descricao}</Text>
      <Text style={styles.textoPessoa}>Número: {data.numero}</Text>
    </View>
  );

  const renderItem = ({ item }) => <Pessoa data={item} />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={styles.menuIcon}
        >
          <Feather name="menu" size={24} color="white" />
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar..."
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.searchIcon}>
          <Ionicons name="notifications" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Cadastro de Pessoas</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.input}
          placeholder="Descrição"
          value={descricao}
          onChangeText={setDescricao}
        />
        <TextInput
          style={styles.input}
          placeholder="Número"
          value={numero}
          onChangeText={setNumero}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.button} onPress={create}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.listContainer}>
        <FlatList
          data={feed}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listaContainer}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhum dado encontrado</Text>
          }
        />
      </View>
    </SafeAreaView>
  );
}
