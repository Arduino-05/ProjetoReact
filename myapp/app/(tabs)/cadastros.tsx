// Cadastro.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');

  const cadastrarUsuario = async () => {
    if (nome && idade) {
      try {
        const response = await axios.post('http://127.0.0.1:8000/usuarios', {
          nome,
          idade: parseInt(idade), // Certifique-se de que a idade é um número
        });

        Alert.alert('Sucesso', response.data.mensagem);
        setNome('');
        setIdade('');
      } catch (error) {
        console.error('Erro ao cadastrar usuário:', error); // Imprime o erro no console
        Alert.alert('Erro', 'Falha ao cadastrar usuário.');
      }
    } else {
      Alert.alert('Atenção', 'Preencha todos os campos.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Idade"
        value={idade}
        keyboardType="numeric"
        onChangeText={setIdade}
      />
      <Button title="Cadastrar" onPress={cadastrarUsuario} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
});
