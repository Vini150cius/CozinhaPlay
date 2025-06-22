import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f3f3",
  },
  header: {
    height: "20%",
    backgroundColor: "#2F4858",
    justifyContent: "center",
    borderBottomRightRadius: 150,
  },
  backButton: {
    paddingLeft: 10,
    marginVertical: 10,
    },

  title: {
    fontWeight: "bold",
    fontSize: 32,
    color: "#fff",
    paddingLeft: 20,

  },
  subtitle: {
    color: "#fff",
    fontSize: 16,
    paddingLeft: 20,

  },
  contentContainer: {
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  forgetPasswordButton: {
    marginTop: 10,
    alignItems: "flex-end",
  },
  forgetPasswordText: {
    color: "#2F4858",
    fontSize: 14,
    fontWeight: "600",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#2F4858",
  },
  input: {
    borderRadius: 20,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#ECECEC",
  },
  buttonContainer: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  button: {
    borderRadius: 30,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 50,
  },
  signInButton: {
    backgroundColor: "#2F4858",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
  buttonDisabled: {
    opacity: 0.6,
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
    fontSize: 16,
  },
  googleButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 30,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTextGoogle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2F4858",
    alignSelf: "center",
    marginLeft: 8,
  },
});
