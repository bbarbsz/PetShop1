import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@petshop_notifications";

export async function configurarNotificacoes() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("petshop", {
      name: "Pet Shop",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      sound: "default",
    });
  }

  const { status: statusExistente } =
    await Notifications.getPermissionsAsync();

  let statusFinal = statusExistente;

  if (statusExistente !== "granted") {
    const { status } =
      await Notifications.requestPermissionsAsync();

    statusFinal = status;
  }

  return statusFinal === "granted";
}

export async function salvarNotificacao(titulo, mensagem) {
  try {
    const antigas =
      await AsyncStorage.getItem(STORAGE_KEY);

    const notificacoes = antigas
      ? JSON.parse(antigas)
      : [];

    const novaNotificacao = {
      id: Date.now().toString(),
      titulo,
      mensagem,
      data: new Date().toISOString(),
    };

    const atualizadas = [
      novaNotificacao,
      ...notificacoes,
    ];

    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(atualizadas)
    );

    return novaNotificacao;
  } catch (error) {
    console.log(
      "Erro ao salvar notificação:",
      error
    );

    return null;
  }
}

export async function buscarNotificacoes() {
  try {
    const armazenadas =
      await AsyncStorage.getItem(STORAGE_KEY);

    return armazenadas
      ? JSON.parse(armazenadas)
      : [];
  } catch (error) {
    console.log(
      "Erro ao buscar notificações:",
      error
    );

    return [];
  }
}

export async function limparNotificacoes() {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.log(
      "Erro ao limpar notificações:",
      error
    );
  }
}

export async function enviarNotificacao(
  titulo,
  mensagem
) {
  const permitido =
    await configurarNotificacoes();

  if (!permitido) {
    return false;
  }

  await salvarNotificacao(
    titulo,
    mensagem
  );

  await Notifications.scheduleNotificationAsync({
    content: {
      title: titulo,
      body: mensagem,
      sound: "default",
    },
    trigger: null,
  });

  return true;
}