<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const nome = ref('');
const email = ref('');
const senha = ref('');
const cep = ref('');
const logradouro = ref('');
const mensagem = ref('');
const router = useRouter();

const buscarCEP = async () => {
  if (cep.value.length === 8) {
    try {
      const res = await axios.get(`https://viacep.com.br/ws/${cep.value}/json/`);
      if (!res.data.erro) {
        logradouro.value = `${res.data.logradouro}, ${res.data.bairro} - ${res.data.localidade}/${res.data.uf}`;
      } else { mensagem.value = '❌ CEP inválido.'; }
    } catch (e) { console.error("Erro CEP"); }
  }
};

const fazerCadastro = async () => {
  try {
    await axios.post('http://localhost:3000/api/auth/register', {
      nome: nome.value, email: email.value, senha: senha.value, endereco: logradouro.value
    });
    mensagem.value = '✅ Cadastro OK!';
    setTimeout(() => router.push('/'), 1500);
  } catch (err) { mensagem.value = '❌ Erro ao cadastrar.'; }
};
</script>

<template>
  <div class="register-container">
    <h2>Nova Conta - Clínica</h2>
    <form @submit.prevent="fazerCadastro">
      <input type="text" v-model="nome" placeholder="Nome Completo" required />
      <input type="email" v-model="email" placeholder="E-mail" required />
      <input type="password" v-model="senha" placeholder="Senha" required />
      <input type="text" v-model="cep" @input="buscarCEP" placeholder="CEP (8 números)" maxlength="8" required />
      <input type="text" v-model="logradouro" placeholder="Endereço" readonly />
      <button type="submit">Cadastrar</button>
    </form>
    <p>{{ mensagem }}</p>
    <RouterLink to="/">Voltar para Login</RouterLink>
  </div>
</template>

<style scoped>
.register-container { max-width: 350px; margin: 40px auto; padding: 25px; background: white; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); text-align: center; }
input { width: 100%; padding: 10px; margin-bottom: 12px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box; }
input[readonly] { background: #f0f0f0; }
button { width: 100%; padding: 12px; background: #2c3e50; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; }
</style>