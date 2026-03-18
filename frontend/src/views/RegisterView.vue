<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

const nome = ref('');
const email = ref('');
const senha = ref('');
const cep = ref('');
const endereco = ref('');
const mensagem = ref('');

// A mágica do ViaCEP para o seu vídeo do LinkedIn
const buscarCep = async () => {
  const cepLimpo = cep.value.replace(/\D/g, '');
  if (cepLimpo.length === 8) {
    try {
      const res = await axios.get(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      if (!res.data.erro) {
        endereco.value = `${res.data.logradouro}, ${res.data.bairro} - ${res.data.localidade}/${res.data.uf}`;
      } else {
        endereco.value = 'CEP não encontrado';
      }
    } catch (error) {
      console.error("Erro ao buscar CEP");
    }
  }
};

const cadastrar = async () => {
  try {
    await axios.post('http://localhost:3000/api/auth/register', {
      nome: nome.value,
      email: email.value,
      senha: senha.value,
      cep: cep.value,
      endereco: endereco.value
    });
    mensagem.value = '✅ Cadastro realizado! Indo pro Login...';
    setTimeout(() => {
      router.push('/'); // Volta pro login automaticamente após 1.5s
    }, 1500);
  } catch (error) {
    mensagem.value = '❌ Erro ao cadastrar. Verifique os dados.';
  }
};
</script>

<template>
  <div class="register-container">
    <h2>Nova Conta - Clínica</h2>
    <form @submit.prevent="cadastrar">
      <input type="text" v-model="nome" placeholder="Nome Completo" required />
      <input type="email" v-model="email" placeholder="E-mail" required />
      <input type="password" v-model="senha" placeholder="Senha" required />
      
      <input type="text" v-model="cep" @blur="buscarCep" placeholder="CEP (Apenas números)" required maxlength="8" />
      
      <input type="text" v-model="endereco" placeholder="Endereço" required />
      
      <button type="submit">Cadastrar</button>
    </form>
    
    <p class="msg" v-if="mensagem">{{ mensagem }}</p>
    
    <router-link to="/" class="link-voltar">Voltar para Login</router-link>
  </div>
</template>

<style scoped>
/* Estilo Black Reaper para a tela de Cadastro */
.register-container { 
  max-width: 400px; 
  margin: 60px auto; 
  padding: 30px; 
  
  background: rgba(10, 10, 10, 0.85); 
  backdrop-filter: blur(8px); 
  
  border-radius: 8px;
  border: 1px solid #c0392b;
  box-shadow: 0 0 20px #c0392b; 
  font-family: 'Courier New', Courier, monospace;
  color: #ecf0f1;
}

h2 { 
  color: #e74c3c; 
  text-shadow: 1px 1px 5px #000; 
  text-align: center;
  margin-bottom: 25px;
}

input { 
  width: 100%; 
  padding: 12px; 
  margin-bottom: 15px; 
  background: #111; 
  border: 1px solid #c0392b; 
  color: #fff; 
  border-radius: 4px; 
  box-sizing: border-box;
}

input::placeholder {
  color: #7f8c8d;
}

input:focus {
  outline: none;
  border-color: #e74c3c;
  box-shadow: 0 0 5px #c0392b;
}

button { 
  width: 100%; 
  background: #c0392b; 
  color: white; 
  border: none; 
  padding: 12px; 
  cursor: pointer; 
  font-weight: bold; 
  font-size: 16px;
  border-radius: 4px;
  transition: 0.3s;
}

button:hover { 
  background: #e74c3c; 
}

.link-voltar { 
  display: block;
  text-align: center;
  color: #bdc3c7; 
  margin-top: 15px;
  text-decoration: none;
  font-size: 14px;
}

.link-voltar:hover {
  color: #e74c3c;
}

.msg {
  text-align: center;
  color: #e74c3c;
  font-weight: bold;
  margin-top: 15px;
}
</style>