// screens/CreateRecipe.js
import { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { supabase } from "../config/supabaseConfig";
import Toast from "react-native-toast-message";

export default function CreateRecipe() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [formato, setFormato] = useState("texto");
  const [conteudo, setConteudo] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    async function loadCategorias() {
      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData.session.user;

      const { data, error } = await supabase
        .from("categorias")
        .select("*")
        .eq("user_id", user.id);

      if (!error && data.length > 0) {
        setCategorias(data);
        setCategoriaId(data[0].id);
      }
    }

    loadCategorias();
  }, []);

  async function handleCreate() {
    const { data: sessionData } = await supabase.auth.getSession();
    const user = sessionData.session.user;

    if (!categoriaId) {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Selecione uma categoria válida!",
      });
      return;
    }

    const { error } = await supabase.from("receitas").insert([
      {
        titulo,
        descricao,
        formato,
        conteudo,
        categoria_id: categoriaId,
        user_id: user.id,
      },
    ]);

    if (error) {
      Toast.show({ type: "error", text1: "Erro", text2: error.message });
    } else {
      Toast.show({
        type: "success",
        text1: "Sucesso",
        text2: "Receita criada!",
      });
      setTitulo("");
      setDescricao("");
      setConteudo("");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova Receita</Text>
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
      />
      <TextInput
        style={styles.input}
        placeholder="Conteúdo (texto ou link)"
        value={conteudo}
        onChangeText={setConteudo}
      />

      <Text style={styles.label}>Formato</Text>
      <Picker
        selectedValue={formato}
        onValueChange={(itemValue) => setFormato(itemValue)}
      >
        <Picker.Item label="Texto" value="texto" />
        <Picker.Item label="Vídeo" value="video" />
        <Picker.Item label="TikTok" value="tiktok" />
        <Picker.Item label="YouTube" value="youtube" />
        <Picker.Item label="Instagram" value="instagram" />
      </Picker>

      <Text style={styles.label}>Categoria</Text>
      <Picker
        selectedValue={categoriaId}
        onValueChange={(value) => setCategoriaId(value)}
      >
        {categorias.map((cat) => (
          <Picker.Item key={cat.id} label={cat.nome} value={cat.id} />
        ))}
      </Picker>

      <TouchableOpacity style={styles.button} onPress={handleCreate}>
        <Text style={styles.buttonText}>Criar Receita</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#333",
  },

  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#555",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
  },

  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  googleButton: {
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },

  buttonTextGoogle: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },

  divisor: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },

  divisorText: {
    marginHorizontal: 10,
    color: "#999",
    fontSize: 14,
  },

  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
    padding: 10,
    zIndex: 10,
  },

  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 4,
  },

  contentContainer: {
    flex: 1,
    justifyContent: "center",
  },

  inputContainer: {
    marginBottom: 12,
  },

  buttonContainer: {
    marginVertical: 6,
  },

  buttonTextSignUp: {
    color: "#007AFF",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
});
