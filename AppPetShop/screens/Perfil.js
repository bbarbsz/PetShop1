import React from "react";

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

import { sair } from "../services/auth";

export default function Perfil() {
  const usuario = auth.currentUser;

  const nome =
    usuario?.displayName || "Usuário";

  const email =
    usuario?.email || "E-mail não informado";

  const inicial =
    nome.charAt(0).toUpperCase();

  function confirmarSaida() {
    Alert.alert(
      "Sair da conta",
      "Tem certeza de que deseja sair?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sair",
          style: "destructive",
          onPress: async () => {
            try {
              await sair();
            } catch (error) {
              Alert.alert(
                "Erro",
                "Não foi possível sair da conta."
              );
            }
          },
        },
      ]
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
          <Text style={styles.smallTitle}>
            MINHA CONTA
          </Text>

          <Text style={styles.title}>
            Meu perfil
          </Text>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {inicial}
            </Text>
          </View>

          <Text style={styles.name}>
            {nome}
          </Text>

          <Text style={styles.email}>
            {email}
          </Text>

          <View style={styles.petBadge}>
            <Ionicons
              name="paw"
              size={15}
              color="#7861C8"
            />

            <Text style={styles.petBadgeText}>
              Tutor PetCare
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>
          Informações da conta
        </Text>

        <View style={styles.infoList}>
          <View style={styles.infoItem}>
            <View style={styles.itemIcon}>
              <Ionicons
                name="person-outline"
                size={20}
                color="#7861C8"
              />
            </View>

            <View style={styles.itemText}>
              <Text style={styles.itemLabel}>
                Nome
              </Text>

              <Text style={styles.itemValue}>
                {nome}
              </Text>
            </View>
          </View>

          <View style={styles.separator} />

          <View style={styles.infoItem}>
            <View style={styles.itemIcon}>
              <Ionicons
                name="mail-outline"
                size={20}
                color="#579CCB"
              />
            </View>

            <View style={styles.itemText}>
              <Text style={styles.itemLabel}>
                E-mail
              </Text>

              <Text style={styles.itemValue}>
                {email}
              </Text>
            </View>
          </View>

          <View style={styles.separator} />

          <View style={styles.infoItem}>
            <View style={styles.itemIcon}>
              <Ionicons
                name="shield-checkmark-outline"
                size={20}
                color="#57A997"
              />
            </View>

            <View style={styles.itemText}>
              <Text style={styles.itemLabel}>
                Conta
              </Text>

              <Text style={styles.itemValue}>
                Autenticada pelo Firebase
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.securityCard}>
          <View style={styles.securityIcon}>
            <Ionicons
              name="lock-closed"
              size={19}
              color="#7861C8"
            />
          </View>

          <View style={styles.securityContent}>
            <Text style={styles.securityTitle}>
              Seus dados estão protegidos
            </Text>

            <Text style={styles.securityText}>
              Sua autenticação é realizada pelo
              Firebase Authentication.
            </Text>
          </View>
        </View>

        <Pressable
          style={styles.logoutButton}
          onPress={confirmarSaida}
        >
          <Ionicons
            name="log-out-outline"
            size={21}
            color="#C15D78"
          />

          <Text style={styles.logoutText}>
            Sair da conta
          </Text>
        </Pressable>
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
    marginBottom: 20,
  },

  smallTitle: {
    fontSize: 10,
    fontWeight: "800",
    color: "#8D82AA",
    letterSpacing: 1.4,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#44395D",
    marginTop: 3,
  },

  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    alignItems: "center",
    paddingVertical: 25,
    paddingHorizontal: 20,
    shadowColor: "#5E547C",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 3,
  },

  avatar: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: "#B8DFF4",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  avatarText: {
    color: "#5B83A0",
    fontSize: 32,
    fontWeight: "800",
  },

  name: {
    color: "#463B59",
    fontSize: 21,
    fontWeight: "800",
  },

  email: {
    color: "#918A9C",
    fontSize: 13,
    marginTop: 4,
  },

  petBadge: {
    marginTop: 13,
    backgroundColor: "#F0ECFF",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  petBadgeText: {
    color: "#6C58AE",
    fontSize: 11,
    fontWeight: "700",
  },

  sectionTitle: {
    color: "#514662",
    fontSize: 16,
    fontWeight: "800",
    marginTop: 25,
    marginBottom: 11,
  },

  infoList: {
    backgroundColor: "#FFFFFF",
    borderRadius: 21,
    paddingHorizontal: 16,
  },

  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },

  itemIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "#F3F0FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  itemText: {
    flex: 1,
  },

  itemLabel: {
    color: "#AAA4B2",
    fontSize: 10.5,
    marginBottom: 3,
  },

  itemValue: {
    color: "#5A5168",
    fontSize: 13,
    fontWeight: "600",
  },

  separator: {
    height: 1,
    backgroundColor: "#F0EDF4",
  },

  securityCard: {
    marginTop: 15,
    backgroundColor: "#EAF7FF",
    borderRadius: 18,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
  },

  securityIcon: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },

  securityContent: {
    flex: 1,
  },

  securityTitle: {
    color: "#4C6B83",
    fontSize: 12.5,
    fontWeight: "800",
  },

  securityText: {
    color: "#7890A0",
    fontSize: 10.5,
    lineHeight: 15,
    marginTop: 3,
  },

  logoutButton: {
    height: 53,
    borderRadius: 16,
    backgroundColor: "#FFF0F3",
    borderWidth: 1,
    borderColor: "#F7D9E0",
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  logoutText: {
    color: "#C15D78",
    fontSize: 14,
    fontWeight: "800",
  },
});