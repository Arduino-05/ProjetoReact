import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, View, TextInput, Button } from 'react-native';
import { useState } from 'react';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function TabTwoScreen() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [resultado, setResultado] = useState('');

  const calcularIMC = () => {
    const pesoNum = parseFloat(peso);
    const alturaNum = parseFloat(altura);

    if (pesoNum && alturaNum) {
      const imc = pesoNum / (alturaNum * alturaNum);
      setResultado(`Seu IMC é: ${imc.toFixed(2)}`);
    } else {
      setResultado('Por favor, insira valores válidos.');
    }
  };

  return (
    <View style={styles.container}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
        headerImage={<Image source={require('@/assets/images/imc.png')} style={styles.headerImage} />}
      >
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Medidor de IMC</ThemedText>
        </ThemedView>

        {/* Formulário para capturar peso e altura */}
        <ThemedView style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Peso (kg)"
            keyboardType="numeric"
            value={peso}
            onChangeText={setPeso}
          />
          <TextInput
            style={styles.input}
            placeholder="Altura (m)"
            keyboardType="numeric"
            value={altura}
            onChangeText={setAltura}
          />
          <Button title="Calcular IMC" onPress={calcularIMC} />
          {resultado ? <ThemedText style={styles.resultText}>{resultado}</ThemedText> : null}
          <ParallaxScrollView
        headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
        headerImage={<Image source={require('@/assets/images/tabelaimg.png')} style={styles.headerImage} />}
      ></ParallaxScrollView>
        </ThemedView>
      </ParallaxScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    borderTopColor: 'black',
    borderTopWidth: 1,
    paddingTop: 10,
    margin: 0,

  },
  formContainer: {
    padding: 16, // Adiciona um padding ao formulário
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  resultText: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
  },
});
