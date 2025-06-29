import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { supabase } from "../config/supabaseConfig";
import Toast from "react-native-toast-message";

export default function CreateCategory({ onClose, onCategoryCreated }) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCreate() {
    if (!nome.trim()) {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Nome da categoria é obrigatório",
      });
      return;
    }

    if (!descricao.trim()) {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Descrição da categoria é obrigatória",
      });
      return;
    }

    setLoading(true);

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData?.session?.user;

      if (!user) {
        Toast.show({
          type: "error",
          text1: "Erro",
          text2: "Usuário não autenticado",
        });
        return;
      }

      const { error } = await supabase.from("categorias").insert([
        {
          nome: nome.trim(),
          descricao: descricao.trim(),
          user_id: user.id,
        },
      ]);

      if (error) {
        Toast.show({
          type: "error",
          text1: "Erro ao criar categoria",
          text2: error.message,
        });
      } else {
        Toast.show({
          type: "success",
          text1: "Categoria criada com sucesso!",
        });

        setNome("");
        setDescricao("");

        if (onCategoryCreated) {
          onCategoryCreated();
        }
        if (onClose) {
          onClose();
        }
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro inesperado",
        text2: "Tente novamente mais tarde",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Text style={styles.title}>Nova Categoria</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nome *</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome da categoria"
          value={nome}
          onChangeText={setNome}
          maxLength={50}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Descrição *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Digite a descrição da categoria"
          value={descricao}
          onChangeText={setDescricao}
          multiline
          numberOfLines={3}
          maxLength={200}
        />
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
  },

  botao: {
    backgroundColor: "#3B82F6",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
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
});
