import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },
  buttonAddCategory: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    gap: 10,
    margin: 20,
    padding: 35,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    elevation: 5,
  },
  text: {
    textAlign: "justify",
  },
  botao: {
    backgroundColor: "#3B82F6",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  textoBotao: {
    color: "#fff",
    fontWeight: 700,
  },
  categoryContent: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 16,
    padding: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: "hidden",
  },

  categoryItem: {
    // Para efeito de toque
  },

  categoryImageContainer: {
    width: "100%",
    height: 120,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },

  categoryDetailsContainer: {
    padding: 16,
    paddingTop: 12,
  },

  categoryTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },

  categoryDescription: {
    fontSize: 14,
    color: "#999",
    lineHeight: 20,
  },

  categoriesContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "#f8f9fa",
  },

  listaContainer: {
    paddingVertical: 8,
    paddingBottom: 20,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },

  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#666",
    marginBottom: 8,
    textAlign: "center",
  },

  emptySubText: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },
});

export default styles;
