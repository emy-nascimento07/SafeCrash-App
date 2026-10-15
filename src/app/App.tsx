import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BrokenComponent } from "../components/BrokenComponent";
import { ErrorBoundary } from "../components/ErrorBoundary";

// Componente que simula errode iteração em dados nulos
function BrokenArrayComponent() {
  const list: any = null;
  return (
    <View>
      {/* Tentar rodar o .map() em um valor null dispara o erro */}
      {list.map((item: any) => (
        <Text>{item}</Text>
      ))}
    </View>
  );
}

// Componente que tenta executar um método que não existe
function BrokenReferenceComponent() {
  const user: any = {}; // Objeto vazio
  // Chama uma função inexistente
  return <Text>{user.nonExistentFunction()}</Text>;
}

export default function App() {
  // Armazena o tipo de erro acionado
  const [errorType, setErrorType] = useState<string | null>(null);

  // Controla a animação e mensagens da requisição
  const [loading, setLoading] = useState(false);
  const [asyncMessage, setAsyncMessage] = useState<string | null>(null);

  // Tratamento assíncrono
  const processJsonSimulated = async (corrupt: boolean) => {
    setLoading(true);
    setAsyncMessage(null);

    try {
      // Simulação de delay
      await new Promise((resolve) => setTimeout(resolve, 1200));
      let mockData: string;

      if (corrupt) {
        // String com chaves incorretas
        mockData = "{nome: 'Inválido', semAspasDuplas ";
      } else {
        // String certo pra conversão
        mockData = '{"nome": "SafeCrash App", "status": "Sucesso"}';
      }

      // Se a string estiver corrompida,
      const parsedData = JSON.parse(mockData);
      setAsyncMessage(`✅ Sucesso ao ler JSON: ${parsedData.nome}`);
    } catch (error: any) {
      // Retorna a exceção e joga na tela
      setAsyncMessage(`❌ Erro Assíncrono Capturado: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ErrorBoundary onReset={() => setErrorType(null)}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={true}
        >
          <Text style={styles.headerTitle}>🛡️ SafeCrash App</Text>
          <Text style={styles.subtitle}>
            Grupo 7 — Demonstração de Resiliência
          </Text>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              1. Exceções Assíncronas (Try/Catch)
            </Text>
            <Text style={styles.cardDescription}>
              Simule a leitura de dados de rede recebendo um formato íntegro ou
              corrompido.
            </Text>

            <View style={styles.rowButtons}>
              <TouchableOpacity
                style={[styles.button, styles.buttonSuccess]}
                onPress={() => processJsonSimulated(false)}
                disabled={loading}
              >
                <Text style={styles.buttonText}>JSON Válido</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.buttonWarning]}
                onPress={() => processJsonSimulated(true)}
                disabled={loading}
              >
                <Text style={styles.buttonText}>JSON Corrompido</Text>
              </TouchableOpacity>
            </View>

            {/* Renderiza o indicador de carregamento giratório */}
            {loading && (
              <ActivityIndicator
                size="small"
                color="#007AFF"
                style={styles.loader}
              />
            )}

            {/* Exibe a caixa de mensagem de acordo com o sucesso */}
            {asyncMessage && (
              <View
                style={[
                  styles.messageBox,
                  asyncMessage.startsWith("✅")
                    ? styles.boxSuccess
                    : styles.boxError,
                ]}
              >
                <Text style={styles.messageText}>{asyncMessage}</Text>
              </View>
            )}
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              2. Erro de Propriedade Nula (TypeError)
            </Text>
            <Text style={styles.cardDescription}>
              Tenta ler uma propriedade aninhada dentro de um objeto não
              definido.
            </Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonDanger]}
              onPress={() => setErrorType("profile")}
            >
              <Text style={styles.buttonText}>Forçar Erro de Perfil</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              3. Erro de Mapeamento (TypeError: Map)
            </Text>
            <Text style={styles.cardDescription}>
              Dispara uma falha ao tentar iterar (.map) sobre uma lista que
              retornou nula da API.
            </Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonDanger]}
              onPress={() => setErrorType("array")}
            >
              <Text style={styles.buttonText}>Forçar Erro de Lista</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              4. Erro de Execução Inexistente
            </Text>
            <Text style={styles.cardDescription}>
              Invoca uma função que não existe no escopo do componente em tempo
              de execução.
            </Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonDanger]}
              onPress={() => setErrorType("reference")}
            >
              <Text style={styles.buttonText}>Forçar Função Inválida</Text>
            </TouchableOpacity>
          </View>

          {errorType === "profile" && <BrokenComponent />}
          {errorType === "array" && <BrokenArrayComponent />}
          {errorType === "reference" && <BrokenReferenceComponent />}
        </ScrollView>
      </ErrorBoundary>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F5F5F5" },
  scrollContainer: { padding: 20, paddingBottom: 40 },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1A1A1A",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
    lineHeight: 20,
  },
  rowButtons: { flexDirection: "row", justifyContent: "space-between" },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 4,
  },
  buttonSuccess: { backgroundColor: "#34C759" },
  buttonWarning: { backgroundColor: "#FF9500" },
  buttonDanger: { backgroundColor: "#FF3B30" },
  buttonText: { color: "#FFF", fontSize: 14, fontWeight: "600" },
  loader: { marginTop: 15 },
  messageBox: {
    marginTop: 15,
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
  },
  boxSuccess: { backgroundColor: "#E8F5E9", borderLeftColor: "#34C759" },
  boxError: { backgroundColor: "#FFE5E5", borderLeftColor: "#FF3B30" },
  messageText: { fontSize: 13, fontFamily: "monospace", color: "#333" },
});
