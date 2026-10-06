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

import { cadastrar } from "../services/auth";

export default function Cadastro({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] =
    useState("");

  const [mostrarSenha, setMostrarSenha] =
    useState(false);

  const [mostrarConfirmacao, setMostrarConfirmacao] =
    useState(false);

  const [carregando, setCarregando] =
    useState(false);

  async function handleCadastro() {
    if (
      !nome.trim() ||
      !email.trim() ||
      !senha ||
      !confirmarSenha
    ) {
      Alert.alert(
        "Atenção",
        "Preencha todos os campos."
      );
      return;
    }

    if (senha.length < 6) {
      Alert.alert(
        "Senha inválida",
        "A senha precisa ter pelo menos 6 caracteres."
      );
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert(
        "Senhas diferentes",
        "As senhas digitadas não são iguais."
      );
      return;
    }

    try {
      setCarregando(true);

      await cadastrar(
        nome.trim(),
        email.trim(),
        senha
      );

      Alert.alert(
        "Conta criada!",
        "Seu cadastro foi realizado com sucesso.",
        [
          {
            text: "Continuar",
            onPress: () =>
              navigation.navigate("Login"),
          },
        ]
      );
    } catch (error) {
      let mensagem =
        "Não foi possível criar sua conta.";

      if (
        error.code ===
        "auth/email-already-in-use"
      ) {
        mensagem =
          "Este e-mail já está cadastrado.";
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
        "auth/weak-password"
      ) {
        mensagem =
          "A senha escolhida é muito fraca.";
      }

      Alert.alert(
        "Erro no cadastro",
        mensagem
      );
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
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Pressable
          style={styles.backButton}
          onPress={() =>
            navigation.goBack()
          }
        >
          <Ionicons
            name="arrow-back"
            size={22}
            color="#55467E"
          />
        </Pressable>

        <View style={styles.header}>
          <View style={styles.iconCircle}>
            <Ionicons
              name="paw"
              size={31}
              color="#FFFFFF"
            />
          </View>

          <Text style={styles.title}>
            Criar conta
          </Text>

          <Text style={styles.subtitle}>
            Crie seu perfil para cuidar ainda melhor
            do seu pet.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>
            Nome
          </Text>

          <View style={styles.inputContainer}>
            <Ionicons
              name="person-outline"
              size={20}
              color="#8B7BC5"
            />

            <TextInput
              style={styles.input}
              placeholder="Seu nome"
              placeholderTextColor="#AAA4B9"
              value={nome}
              onChangeText={setNome}
              autoCapitalize="words"
            />
          </View>

          <Text style={styles.label}>
            E-mail
          </Text>

          <View style={styles.inputContainer}>
            <Ionicons
              name="mail-outline"
              size={20}
              color="#8B7BC5"
            />

            <TextInput
              style={styles.input}
              placeholder="seuemail@email.com"
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
              size={20}
              color="#8B7BC5"
            />

            <TextInput
              style={styles.input}
              placeholder="Mínimo de 6 caracteres"
              placeholderTextColor="#AAA4B9"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry={!mostrarSenha}
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

          <Text style={styles.label}>
            Confirmar senha
          </Text>

          <View style={styles.inputContainer}>
            <Ionicons
              name="shield-checkmark-outline"
              size={20}
              color="#8B7BC5"
            />

            <TextInput
              style={styles.input}
              placeholder="Digite novamente"
              placeholderTextColor="#AAA4B9"
              value={confirmarSenha}
              onChangeText={
                setConfirmarSenha
              }
              secureTextEntry={
                !mostrarConfirmacao
              }
            />

            <Pressable
              onPress={() =>
                setMostrarConfirmacao(
                  !mostrarConfirmacao
                )
              }
            >
              <Ionicons
                name={
                  mostrarConfirmacao
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
            onPress={handleCadastro}
            disabled={carregando}
          >
            <Text style={styles.buttonText}>
              {carregando
                ? "Criando conta..."
                : "Criar minha conta"}
            </Text>
          </Pressable>

          <Pressable
            style={styles.loginLink}
            onPress={() =>
              navigation.navigate("Login")
            }
          >
            <Text style={styles.loginText}>
              Já tenho uma conta
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F0FF",
  },

  content: {
    paddingHorizontal: 23,
    paddingVertical: 35,
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
    elevation: 2,
  },

  header: {
    alignItems: "center",
    marginBottom: 25,
  },

  iconCircle: {
    width: 65,
    height: 65,
    borderRadius: 33,
    backgroundColor: "#83C4EC",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#42375F",
  },

  subtitle: {
    textAlign: "center",
    color: "#827C91",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 6,
    maxWidth: 310,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    padding: 22,
    shadowColor: "#635B87",
    shadowOpacity: 0.12,
    shadowRadius: 17,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    elevation: 6,
  },

  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#5B4F7D",
    marginBottom: 8,
    marginTop: 8,
  },

  inputContainer: {
    height: 53,
    borderRadius: 14,
    backgroundColor: "#F8F6FF",
    borderWidth: 1,
    borderColor: "#E5DFFA",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: "#40384E",
  },

  button: {
    height: 54,
    backgroundColor: "#7861C8",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 23,
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 15.5,
    fontWeight: "800",
  },

  loginLink: {
    alignItems: "center",
    marginTop: 18,
  },

  loginText: {
    color: "#715DB5",
    fontWeight: "700",
  },
});