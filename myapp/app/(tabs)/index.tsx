import { Image, StyleSheet, Platform, Text, View, TextInput, Button } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FlatList } from 'react-native-gesture-handler';

export default function HomeScreen() {
  const [itens, setItens] = useState([]);
  const [imoveis, setImoveis] = useState([]);
  const [filtros, setFiltros] = useState({
    finalidade: '',
    tipo: '',
    bairro: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://127.0.0.1:8000/itens');
      setItens(response.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchImoveis = async () => {
      const response = await axios.get('http://127.0.0.1:8000/imoveis', {
        params: filtros,
      });
      setImoveis(response.data);
    };
    fetchImoveis();
  }, [filtros]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/senai.png')}
          style={styles.reactLogo}
        />
      }>

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Cadastro de Pessoa</ThemedText>
      </ThemedView>

      {/* Exibição dos itens cadastrados */}
      <View>
        <FlatList
          data={itens}
          renderItem={({ item }) => (
            <>
              <Text>ID: {item.id}</Text>
              <Text>Nome: {item.nome}</Text>
              <Text>Idade: {item.idade}</Text>
              <Image source={{ uri: item.foto }} style={{ width: 100, height: 100 }} />
            </>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>

      {/* Filtros */}
      <View style={styles.filters}>
        <TextInput
          style={styles.input}
          placeholder="Finalidade (venda, locação...)"
          value={filtros.finalidade}
          onChangeText={(text) => setFiltros({ ...filtros, finalidade: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Tipo (casa, apartamento...)"
          value={filtros.tipo}
          onChangeText={(text) => setFiltros({ ...filtros, tipo: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Bairro"
          value={filtros.bairro}
          onChangeText={(text) => setFiltros({ ...filtros, bairro: text })}
        />
      </View>

      {/* Exibição dos imóveis filtrados */}
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Lista de Imóveis</ThemedText>
      </ThemedView>

      <FlatList
        data={imoveis.slice(0, 100)}  // Adicionando o filtro para exibir apenas os 10 primeiros
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>Nome: {item.nome}</Text>
            <Text>Descrição: {item.descricao}</Text>
            <Text>Valor Venda: R$ {item.valor_venda}</Text>
            <Text>Valor Aluguel: R$ {item.valor_aluguel}</Text>
            <Image source={{ uri: item.imagem }} style={styles.image} />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Meu app funciona!</ThemedText>
        <HelloWave />
      </ThemedView>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  card: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 5,
    marginTop: 10,
  },
  filters: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});
