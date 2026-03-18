<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const email = ref('');
const senha = ref('');
const mensagem = ref('');
const router = useRouter();

const fazerLogin = async () => {
  try {
    const res = await axios.post('http://localhost:3000/api/auth/login', {
      email: email.value,
      senha: senha.value
    });
    
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('nomeUsuario', res.data.nome);
    
    router.push('/dashboard');
  } catch (err) {
    mensagem.value = '❌ ACESSO NEGADO. SENHA INCORRETA.';
  }
};
</script>

<template>
  <div class="login-page">
    <div class="login-container">
      <h2>Ghoul Login</h2>
      <form @submit.prevent="fazerLogin">
        <input type="email" v-model="email" placeholder="Digite seu e-mail" required />
        <input type="password" v-model="senha" placeholder="Digite sua senha" required />
        <button type="submit">ENTRAR</button>
      </form>
      <p class="error-msg">{{ mensagem }}</p>
      <RouterLink to="/register" class="link">Não tem conta? Cadastre-se</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
}

.login-container {
  max-width: 350px;
  width: 100%;
  padding: 40px;
  background-color: #121212; /* Cinza quase preto */
  border-radius: 4px;
  border: 1px solid #c0392b; /* Borda vermelha sangue */
  box-shadow: 0 0 20px rgba(192, 57, 43, 0.4);
  text-align: center;
}

h2 {
  color: #e74c3c;
  font-family: 'Courier New', Courier, monospace;
  text-transform: uppercase;
  letter-spacing: 3px;
  margin-bottom: 30px;
}

input {
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  background: #1a1a1a;
  border: 1px solid #333;
  border-bottom: 2px solid #c0392b;
  color: #fff;
  border-radius: 0;
  box-sizing: border-box;
  outline: none;
}

input:focus {
  border-color: #e74c3c;
  background: #222;
}

button {
  width: 100%;
  padding: 14px;
  background: #c0392b;
  color: white;
  border: none;
  font-weight: bold;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: 0.3s;
}

button:hover {
  background: #e74c3c;
  box-shadow: 0 0 10px #e74c3c;
}

.error-msg {
  color: #e74c3c;
  font-size: 12px;
  margin-top: 15px;
  font-weight: bold;
}

.link {
  color: #7f8c8d;
  text-decoration: none;
  font-size: 13px;
  display: block;
  margin-top: 20px;
}

.link:hover {
  color: #e74c3c;
}
</style>