import React, { useState } from "react";

import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { entrar } from "../services/auth";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] =
    useState(false);
  const [carregando, setCarregando] =
    useState(false);

  async function handleLogin() {
    if (!email.trim() || !senha) {
      Alert.alert(
        "Atenção",
        "Preencha o e-mail e a senha."
      );
      return;
    }

    try {
      setCarregando(true);

      await entrar(
        email.trim(),
        senha
      );

    } catch (error) {
      let mensagem =
        "Não foi possível entrar. Verifique seus dados.";

      if (
        error.code ===
        "auth/invalid-credential"
      ) {
        mensagem =
          "E-mail ou senha incorretos.";
      }

      if (
        error.code ===
        "auth/invalid-email"
      ) {
        mensagem =
          "Digite um e-mail válido.";
      }

      if (
        error.code ===
        "auth/user-not-found"
      ) {
        mensagem =
          "Usuário não encontrado.";
      }

      Alert.alert("Erro no login", mensagem);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : undefined
      }
    >
      <ScrollView
        contentContainerStyle={
          styles.scrollContent
        }
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topDecoration} />

        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Ionicons
              name="paw"
              size={42}
              color="#FFFFFF"
            />
          </View>

          <Text style={styles.logoText}>
            Pet<span>Care</span>
          </Text>

          <Text style={styles.subtitle}>
            Cuidando de quem faz parte da família
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>
            Bem-vindo!
          </Text>

          <Text style={styles.description}>
            Entre na sua conta para continuar.
          </Text>

          <Text style={styles.label}>
            E-mail
          </Text>

          <View style={styles.inputContainer}>
            <Ionicons
              name="mail-outline"
              size={21}
              color="#8B7BC5"
            />

            <TextInput
              style={styles.input}
              placeholder="Digite seu e-mail"
              placeholderTextColor="#AAA4B9"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <Text style={styles.label}>
            Senha
          </Text>

          <View style={styles.inputContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={21}
              color="#8B7BC5"
            />

            <TextInput
              style={styles.input}
              placeholder="Digite sua senha"
              placeholderTextColor="#AAA4B9"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry={!mostrarSenha}
              autoCapitalize="none"
            />

            <Pressable
              onPress={() =>
                setMostrarSenha(
                  !mostrarSenha
                )
              }
            >
              <Ionicons
                name={
                  mostrarSenha
                    ? "eye-off-outline"
                    : "eye-outline"
                }
                size={21}
                color="#8B7BC5"
              />
            </Pressable>
          </View>

          <Pressable
            style={[
              styles.button,
              carregando &&
                styles.buttonDisabled,
            ]}
            onPress={handleLogin}
            disabled={carregando}
          >
            <Text style={styles.buttonText}>
              {carregando
                ? "Entrando..."
                : "Entrar"}
            </Text>

            {!carregando && (
              <Ionicons
                name="arrow-forward"
                size={21}
                color="#FFFFFF"
              />
            )}
          </Pressable>

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />

            <Text style={styles.dividerText}>
              ou
            </Text>

            <View style={styles.divider} />
          </View>

          <Text style={styles.registerText}>
            Ainda não possui uma conta?
          </Text>

          <Pressable
            style={styles.outlineButton}
            onPress={() =>
              navigation.navigate("Cadastro")
            }
          >
            <Text
              style={styles.outlineButtonText}
            >
              Criar minha conta
            </Text>
          </Pressable>
        </View>

        <Text style={styles.footer}>
          Seu pet merece todo esse carinho 🐾
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F0FF",
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 35,
  },

  topDecoration: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "#DDF4FF",
    top: -100,
    right: -80,
  },

  logoContainer: {
    alignItems: "center",
    marginBottom: 26,
  },

  logoCircle: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: "#7DBBE8",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#6C63A8",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },

  logoText: {
    fontSize: 30,
    fontWeight: "800",
    color: "#62529E",
  },

  subtitle: {
    marginTop: 5,
    fontSize: 13,
    color: "#77718A",
    textAlign: "center",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 26,
    padding: 24,
    shadowColor: "#635B87",
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 7,
  },

  title: {
    fontSize: 27,
    fontWeight: "800",
    color: "#42375F",
  },

  description: {
    marginTop: 5,
    marginBottom: 23,
    color: "#8A8498",
    fontSize: 14,
  },

  label: {
    color: "#5B4F7D",
    fontWeight: "700",
    marginBottom: 8,
    marginTop: 8,
  },

  inputContainer: {
    height: 54,
    borderRadius: 15,
    backgroundColor: "#F8F6FF",
    borderWidth: 1,
    borderColor: "#E7E0FA",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 7,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    color: "#413A50",
    fontSize: 15,
  },

  button: {
    height: 55,
    borderRadius: 16,
    backgroundColor: "#7861C8",
    marginTop: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    shadowColor: "#7861C8",
    shadowOpacity: 0.25,
    shadowRadius: 9,
    elevation: 4,
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },

  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#E8E4EF",
  },

  dividerText: {
    marginHorizontal: 12,
    color: "#A19BAE",
  },

  registerText: {
    textAlign: "center",
    color: "#777180",
    marginBottom: 12,
  },

  outlineButton: {
    height: 51,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: "#8D79D2",
    justifyContent: "center",
    alignItems: "center",
  },

  outlineButtonText: {
    color: "#6E58B8",
    fontWeight: "800",
    fontSize: 15,
  },

  footer: {
    textAlign: "center",
    color: "#898298",
    marginTop: 22,
    fontSize: 12,
  },
});