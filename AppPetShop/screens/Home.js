import React, { useState } from "react";

import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { auth } from "../config/firebase";

import {
  enviarNotificacao,
} from "../services/notification";

export default function Home() {
  const usuario = auth.currentUser;

  const nome =
    usuario?.displayName?.split(" ")[0] ||
    "amigo";

  const [enviando, setEnviando] =
    useState(false);

  async function agendar(
    tipo,
    icone
  ) {
    try {
      setEnviando(true);

      let titulo = "";
      let mensagem = "";

      
      if (tipo === "banho") {
        titulo = "🛁 Banho agendado!";
        mensagem =
          "O atendimento de banho do seu pet foi solicitado com sucesso.";
      }

      if (tipo === "tosa") {
        titulo = "✂️ Tosa agendada!";
        mensagem =
          "O atendimento de tosa do seu pet foi solicitado com sucesso.";
      }

      if (tipo === "consulta") {
        titulo = "🩺 Consulta agendada!";
        mensagem =
          "A consulta veterinária do seu pet foi solicitada com sucesso.";
      }

      const resultado =
        await enviarNotificacao(
          titulo,
          mensagem
        );

      if (!resultado) {
        Alert.alert(
          "Notificações desativadas",
          "Ative as notificações do aplicativo nas configurações do seu dispositivo."
        );

        return;
      }

      Alert.alert(
        "Tudo certo! 🐾",
        mensagem
      );
    } catch (error) {
      Alert.alert(
        "Erro",
        "Não foi possível realizar a solicitação."
      );
    } finally {
      setEnviando(false);
    }
  }

  function produtos() {
    Alert.alert(
      "Pet Shop",
      "Nossa loja de produtos estará disponível em breve! 🐾"
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.content
        }
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>
              Olá, {nome}! 👋
            </Text>

            <Text style={styles.headerTitle}>
              Como podemos cuidar do seu pet?
            </Text>
          </View>

          <View style={styles.headerIcon}>
            <Ionicons
              name="paw"
              size={25}
              color="#FFFFFF"
            />
          </View>
        </View>

        <View style={styles.banner}>
          <View style={styles.bannerText}>
            <Text style={styles.bannerSmall}>
              CUIDADO COM CARINHO
            </Text>

            <Text style={styles.bannerTitle}>
              Seu pet merece{"\n"}
              o melhor cuidado.
            </Text>

            <Text style={styles.bannerDescription}>
              Agende um serviço de forma rápida
              e prática.
            </Text>
          </View>

          <View style={styles.bannerPaw}>
            <Ionicons
              name="paw"
              size={70}
              color="#FFFFFF"
            />
          </View>
        </View>

        <Text style={styles.sectionTitle}>
          Nossos serviços
        </Text>

        <Text style={styles.sectionSubtitle}>
          Escolha o cuidado que seu pet precisa
        </Text>

        <View style={styles.servicesGrid}>
          <Pressable
            style={styles.serviceCard}
            onPress={() =>
              agendar("banho")
            }
            disabled={enviando}
          >
            <View
              style={[
                styles.serviceIcon,
                {
                  backgroundColor:
                    "#DDF4FF",
                },
              ]}
            >
              <Ionicons
                name="water-outline"
                size={28}
                color="#579CCB"
              />
            </View>

            <Text style={styles.serviceTitle}>
              Banho
            </Text>

            <Text style={styles.serviceDescription}>
              Higiene e cuidado
            </Text>

            <View style={styles.arrow}>
              <Ionicons
                name="arrow-forward"
                size={16}
                color="#7861C8"
              />
            </View>
          </Pressable>

          <Pressable
            style={styles.serviceCard}
            onPress={() =>
              agendar("tosa")
            }
            disabled={enviando}
          >
            <View
              style={[
                styles.serviceIcon,
                {
                  backgroundColor:
                    "#EEE7FF",
                },
              ]}
            >
              <Ionicons
                name="cut-outline"
                size={28}
                color="#8069C5"
              />
            </View>

            <Text style={styles.serviceTitle}>
              Tosa
            </Text>

            <Text style={styles.serviceDescription}>
              Beleza e conforto
            </Text>

            <View style={styles.arrow}>
              <Ionicons
                name="arrow-forward"
                size={16}
                color="#7861C8"
              />
            </View>
          </Pressable>

          <Pressable
            style={styles.serviceCard}
            onPress={() =>
              agendar("consulta")
            }
            disabled={enviando}
          >
            <View
              style={[
                styles.serviceIcon,
                {
                  backgroundColor:
                    "#E2F5F2",
                },
              ]}
            >
              <Ionicons
                name="medkit-outline"
                size={28}
                color="#57A997"
              />
            </View>

            <Text style={styles.serviceTitle}>
              Consulta
            </Text>

            <Text style={styles.serviceDescription}>
              Saúde e prevenção
            </Text>

            <View style={styles.arrow}>
              <Ionicons
                name="arrow-forward"
                size={16}
                color="#7861C8"
              />
            </View>
          </Pressable>

          <Pressable
            style={styles.serviceCard}
            onPress={produtos}
          >
            <View
              style={[
                styles.serviceIcon,
                {
                  backgroundColor:
                    "#FFF0F7",
                },
              ]}
            >
              <Ionicons
                name="bag-handle-outline"
                size={28}
                color="#C67FA5"
              />
            </View>

            <Text style={styles.serviceTitle}>
              Produtos
            </Text>

            <Text style={styles.serviceDescription}>
              Tudo para seu pet
            </Text>

            <View style={styles.arrow}>
              <Ionicons
                name="arrow-forward"
                size={16}
                color="#7861C8"
              />
            </View>
          </Pressable>
        </View>

        <View style={styles.tipCard}>
          <View style={styles.tipIcon}>
            <Ionicons
              name="heart"
              size={21}
              color="#7861C8"
            />
          </View>

          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>
              Dica PetCare
            </Text>

            <Text style={styles.tipText}>
              Manter os cuidados do seu pet em dia
              ajuda a garantir mais saúde e
              qualidade de vida.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F5FC",
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 35,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 23,
  },

  greeting: {
    color: "#8B839A",
    fontSize: 14,
    marginBottom: 5,
  },

  headerTitle: {
    color: "#41375A",
    fontSize: 21,
    fontWeight: "800",
    maxWidth: 290,
    lineHeight: 27,
  },

  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#8068C7",
    alignItems: "center",
    justifyContent: "center",
  },

  banner: {
    backgroundColor: "#82C5EB",
    borderRadius: 24,
    padding: 22,
    minHeight: 170,
    flexDirection: "row",
    overflow: "hidden",
    marginBottom: 27,
  },

  bannerText: {
    flex: 1,
    zIndex: 2,
  },

  bannerSmall: {
    color: "#EAF8FF",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.2,
    marginBottom: 8,
  },

  bannerTitle: {
    color: "#FFFFFF",
    fontSize: 23,
    lineHeight: 29,
    fontWeight: "800",
  },

  bannerDescription: {
    color: "#EAF8FF",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 9,
    maxWidth: 230,
  },

  bannerPaw: {
    position: "absolute",
    right: -12,
    bottom: -8,
    width: 125,
    height: 125,
    borderRadius: 63,
    backgroundColor: "#9BD3F0",
    alignItems: "center",
    justifyContent: "center",
    transform: [
      {
        rotate: "-12deg",
      },
    ],
  },

  sectionTitle: {
    fontSize: 20,
    color: "#44395E",
    fontWeight: "800",
  },

  sectionSubtitle: {
    color: "#8C8698",
    fontSize: 13,
    marginTop: 3,
    marginBottom: 17,
  },

  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  serviceCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 21,
    padding: 16,
    marginBottom: 14,
    minHeight: 177,
    shadowColor: "#5E547C",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 3,
  },

  serviceIcon: {
    width: 51,
    height: 51,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 13,
  },

  serviceTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#463C5A",
  },

  serviceDescription: {
    fontSize: 11.5,
    color: "#96909F",
    marginTop: 4,
  },

  arrow: {
    position: "absolute",
    right: 13,
    bottom: 13,
    width: 29,
    height: 29,
    borderRadius: 10,
    backgroundColor: "#F0ECFF",
    alignItems: "center",
    justifyContent: "center",
  },

  tipCard: {
    backgroundColor: "#EEE9FF",
    borderRadius: 20,
    padding: 17,
    marginTop: 7,
    flexDirection: "row",
    alignItems: "center",
  },

  tipIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  tipContent: {
    flex: 1,
  },

  tipTitle: {
    color: "#59488D",
    fontWeight: "800",
    fontSize: 14,
    marginBottom: 4,
  },

  tipText: {
    color: "#766E87",
    fontSize: 11.5,
    lineHeight: 17,
  },
});