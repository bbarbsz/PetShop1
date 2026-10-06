import React, {
    useCallback,
    useEffect,
    useState,
  } from "react";
  
  import {
    Alert,
    Pressable,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    View,
  } from "react-native";
  
  import { Ionicons } from "@expo/vector-icons";
  
  import {
    buscarNotificacoes,
    limparNotificacoes,
  } from "../services/notification";
  
  export default function Notificacoes() {
    const [notificacoes, setNotificacoes] =
      useState([]);
  
    const [atualizando, setAtualizando] =
      useState(false);
  
    const carregarNotificacoes =
      useCallback(async () => {
        const dados =
          await buscarNotificacoes();
  
        setNotificacoes(dados);
      }, []);
  
    useEffect(() => {
      carregarNotificacoes();
    }, [carregarNotificacoes]);
  
    async function atualizar() {
      setAtualizando(true);
  
      await carregarNotificacoes();
  
      setAtualizando(false);
    }
  
    function formatarData(data) {
      const dataObj = new Date(data);
  
      return dataObj.toLocaleString(
        "pt-BR",
        {
          day: "2-digit",
          month: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }
      );
    }
  
    function confirmarLimpeza() {
      if (notificacoes.length === 0) {
        return;
      }
  
      Alert.alert(
        "Limpar notificações",
        "Deseja apagar todas as notificações?",
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Apagar",
            style: "destructive",
            onPress: async () => {
              await limparNotificacoes();
              setNotificacoes([]);
            },
          },
        ]
      );
    }
  
    return (
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={atualizando}
              onRefresh={atualizar}
              tintColor="#7861C8"
            />
          }
          contentContainerStyle={
            styles.content
          }
        >
          <View style={styles.header}>
            <View>
              <Text style={styles.smallTitle}>
                CENTRAL
              </Text>
  
              <Text style={styles.title}>
                Notificações
              </Text>
            </View>
  
            {notificacoes.length > 0 && (
              <Pressable
                style={styles.clearButton}
                onPress={confirmarLimpeza}
              >
                <Ionicons
                  name="trash-outline"
                  size={19}
                  color="#8069C5"
                />
              </Pressable>
            )}
          </View>
  
          <View style={styles.infoCard}>
            <View style={styles.infoIcon}>
              <Ionicons
                name="notifications"
                size={23}
                color="#7861C8"
              />
            </View>
  
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>
                Tudo em um só lugar
              </Text>
  
              <Text style={styles.infoText}>
                Aqui você encontra as confirmações e
                avisos relacionados aos serviços do
                seu pet.
              </Text>
            </View>
          </View>
  
          {notificacoes.length === 0 ? (
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIcon}>
                <Ionicons
                  name="notifications-off-outline"
                  size={42}
                  color="#A59ACB"
                />
              </View>
  
              <Text style={styles.emptyTitle}>
                Nenhuma notificação
              </Text>
  
              <Text style={styles.emptyText}>
                Quando você agendar um serviço,
                as notificações aparecerão aqui.
              </Text>
            </View>
          ) : (
            <View style={styles.list}>
              {notificacoes.map(
                (notificacao) => (
                  <View
                    key={notificacao.id}
                    style={styles.notificationCard}
                  >
                    <View
                      style={styles.notificationIcon}
                    >
                      <Ionicons
                        name="paw"
                        size={20}
                        color="#FFFFFF"
                      />
                    </View>
  
                    <View
                      style={
                        styles.notificationContent
                      }
                    >
                      <View
                        style={
                          styles.notificationHeader
                        }
                      >
                        <Text
                          style={
                            styles.notificationTitle
                          }
                        >
                          {notificacao.titulo}
                        </Text>
  
                        <Text
                          style={
                            styles.notificationDate
                          }
                        >
                          {formatarData(
                            notificacao.data
                          )}
                        </Text>
                      </View>
  
                      <Text
                        style={
                          styles.notificationMessage
                        }
                      >
                        {notificacao.mensagem}
                      </Text>
                    </View>
                  </View>
                )
              )}
            </View>
          )}
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
      flexGrow: 1,
    },
  
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
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
  
    clearButton: {
      width: 43,
      height: 43,
      borderRadius: 14,
      backgroundColor: "#EEE9FF",
      alignItems: "center",
      justifyContent: "center",
    },
  
    infoCard: {
      backgroundColor: "#E9F7FF",
      borderRadius: 20,
      padding: 16,
      flexDirection: "row",
      marginBottom: 22,
    },
  
    infoIcon: {
      width: 45,
      height: 45,
      borderRadius: 14,
      backgroundColor: "#FFFFFF",
      alignItems: "center",
      justifyContent: "center",
      marginRight: 12,
    },
  
    infoContent: {
      flex: 1,
    },
  
    infoTitle: {
      fontSize: 14,
      fontWeight: "800",
      color: "#4C6C86",
      marginBottom: 4,
    },
  
    infoText: {
      color: "#718496",
      fontSize: 11.5,
      lineHeight: 17,
    },
  
    emptyContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 30,
      paddingVertical: 65,
    },
  
    emptyIcon: {
      width: 92,
      height: 92,
      borderRadius: 46,
      backgroundColor: "#EEE9FF",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 20,
    },
  
    emptyTitle: {
      color: "#514566",
      fontSize: 18,
      fontWeight: "800",
    },
  
    emptyText: {
      color: "#938C9F",
      fontSize: 13,
      lineHeight: 20,
      textAlign: "center",
      marginTop: 7,
    },
  
    list: {
      gap: 12,
    },
  
    notificationCard: {
      backgroundColor: "#FFFFFF",
      borderRadius: 19,
      padding: 15,
      flexDirection: "row",
      shadowColor: "#5E547C",
      shadowOpacity: 0.07,
      shadowRadius: 9,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      elevation: 2,
    },
  
    notificationIcon: {
      width: 45,
      height: 45,
      borderRadius: 14,
      backgroundColor: "#8069C5",
      alignItems: "center",
      justifyContent: "center",
      marginRight: 12,
    },
  
    notificationContent: {
      flex: 1,
    },
  
    notificationHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
  
    notificationTitle: {
      color: "#4A3E60",
      fontSize: 13.5,
      fontWeight: "800",
      flex: 1,
      paddingRight: 5,
    },
  
    notificationDate: {
      color: "#AAA4B2",
      fontSize: 9.5,
    },
  
    notificationMessage: {
      color: "#85808E",
      fontSize: 11.5,
      lineHeight: 17,
      marginTop: 5,
    },
  });