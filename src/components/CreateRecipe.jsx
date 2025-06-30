// screens/CreateRecipe.js
import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { supabase } from "../config/supabaseConfig";
import Toast from "react-native-toast-message";

export default function CreateRecipe({ onClose, onRecipeCreated }) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [formato, setFormato] = useState("texto");
  const [conteudo, setConteudo] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);

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
    <>
      <Text style={styles.title}>Nova Receita</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Título *</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome da receita"
          value={titulo}
          onChangeText={setTitulo}
          maxLength={50}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Descrição *</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite a descrição da receita"
          value={descricao}
          onChangeText={setDescricao}
          maxLength={100}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Conteúdo *</Text>
        <TextInput
          style={styles.input}
          placeholder="Conteúdo (texto ou link)"
          value={conteudo}
          onChangeText={setConteudo}
          maxLength={100}
          multiline
          textAlignVertical="top"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Formato *</Text>
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={formato}
            onValueChange={(itemValue) => setFormato(itemValue)}
          >
            <Picker.Item label="Texto" value="texto" />
            <Picker.Item label="Vídeo" value="video" />
            <Picker.Item label="TikTok" value="tiktok" />
            <Picker.Item label="YouTube" value="youtube" />
            <Picker.Item label="Instagram" value="instagram" />
          </Picker>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Categoria *</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={categoriaId}
            onValueChange={(value) => setCategoriaId(value)}
          >
            {categorias.map((cat) => (
              <Picker.Item key={cat.id} label={cat.nome} value={cat.id} />
            ))}
          </Picker>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.botao, loading && styles.buttonDisabled]}
          onPress={handleCreate}
          disabled={loading}
        >
          <Text style={styles.textoBotao}>
            {loading ? "Criando..." : "Criar Categoria"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botao, styles.cancelButton]}
          onPress={onClose}
          disabled={loading}
        >
          <Text style={[styles.textoBotao, styles.cancelButtonText]}>
            Cancelar
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },

  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#555",
    fontWeight: "500",
    alignSelf: "flex-start",
  },

  inputContainer: {
    marginBottom: 16,
    width: "100%",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    width: "100%",
  },

  textArea: {
    height: 80,
    textAlignVertical: "top",
  },

  buttonContainer: {
    marginTop: 20,
    gap: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  botao: {
    backgroundColor: "#3B82F6",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "45%",
  },

  cancelButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#3B82F6",
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  textoBotao: {
    color: "#fff",
    fontWeight: "700",
  },

  cancelButtonText: {
    color: "#3B82F6",
  },

  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    overflow: "hidden",
  },

  picker: {
    height: 50,
    width: "100%",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
});
