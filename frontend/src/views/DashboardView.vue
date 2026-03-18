<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const nomeDoPaciente = ref('');
const consultas = ref<any[]>([]);
const clima = ref({ temp: 0, desc: '', icon: '' });

const medico = ref('');
const dataHora = ref('');
const mensagem = ref('');

const buscarClima = async () => {
  try {
    // Chave atualizada
    const res = await axios.get('https://api.openweathermap.org/data/2.5/weather?q=Rio%20de%20Janeiro&units=metric&lang=pt_br&appid=bd5e378503939ddaee76f12ad7a97608');
    clima.value = {
      temp: Math.round(res.data.main.temp),
      desc: res.data.weather[0].description,
      icon: res.data.weather[0].icon
    };
  } catch (_) { 
    // Se der erro de novo, ele mostra o padrão de Madureira
    clima.value = { temp: 32, desc: 'Céu limpo (Dados Locais)', icon: '01d' };
  }
};

const buscarConsultas = async () => {
  const token = localStorage.getItem('token');
  try {
    const res = await axios.get('http://localhost:3000/api/appointments', {
      headers: { Authorization: `Bearer ${token}` }
    });
    consultas.value = res.data;
  } catch (_) {
    console.error("Erro ao carregar lista");
  }
};

// --- FUNÇÃO NOVA: DELETAR CONSULTA ---
const deletarConsulta = async (id: string) => {
  if (!confirm("Deseja eliminar este registro permanentemente?")) return;
  
  const token = localStorage.getItem('token');
  try {
    await axios.delete(`http://localhost:3000/api/appointments/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    mensagem.value = '🗑️ Registro eliminado.';
    buscarConsultas(); // Atualiza a lista
  } catch (_) {
    mensagem.value = '❌ Erro ao eliminar.';
  }
};

onMounted(() => {
  nomeDoPaciente.value = localStorage.getItem('nomeUsuario') || 'Paciente';
  buscarConsultas();
  buscarClima();
});

const agendarConsulta = async () => {
  const token = localStorage.getItem('token');
  try {
    await axios.post('http://localhost:3000/api/appointments', 
      { medico: medico.value, dataHora: dataHora.value },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    mensagem.value = '✅ Marcado no Livro.';
    medico.value = ''; dataHora.value = '';
    buscarConsultas();
  } catch (_) {
    mensagem.value = '❌ Falha no sistema.';
  }
};

const formatarData = (d: string) => new Date(d).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
const logout = () => { localStorage.clear(); router.push('/'); };
</script>

<template>
  <div class="dashboard-container">
    <div class="cabecalho">
      <h1>🏥 CLÍNICA REAPER</h1>
      <button class="btn-sair" @click="logout">Sair</button>
    </div>

    <div class="clima-box" v-if="clima.temp">
      <img :src="`http://openweathermap.org/img/wn/${clima.icon}.png`" alt="clima" />
      <span class="clima-texto"><strong>{{ clima.temp }}°C</strong> - {{ clima.desc }}</span>
    </div>

    <div class="agendamento-box">
      <h3>Novo Agendamento</h3>
      <form @submit.prevent="agendarConsulta">
        <input type="text" v-model="medico" placeholder="Doutor" required />
        <input type="datetime-local" v-model="dataHora" required />
        <button type="submit" class="btn-agendar">Confirmar</button>
      </form>
      <p class="msg">{{ mensagem }}</p>
    </div>

    <div class="lista-secao">
      <h3>Histórico de Consultas</h3>
      <table v-if="consultas.length > 0">
        <thead>
          <tr>
            <th>MÉDICO</th>
            <th>DATA</th>
            <th>AÇÃO</th> </tr>
        </thead>
        <tbody>
          <tr v-for="c in consultas" :key="c._id">
            <td>{{ c.medico }}</td>
            <td>{{ formatarData(c.dataHora) }}</td>
            <td>
              <button class="btn-del" @click="deletarConsulta(c._id)">✖</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else class="vazio">Nenhum registro encontrado.</p>
    </div>
  </div>
</template>

<style scoped>
.dashboard-container { 
  max-width: 600px; margin: 40px auto; padding: 25px; 
  background-color: #000000; border-radius: 8px;
  box-shadow: 0 0 20px #c0392b; font-family: 'Courier New', Courier, monospace;
  color: #ecf0f1; border: 1px solid #c0392b;
}
.cabecalho { display: flex; justify-content: space-between; border-bottom: 1px solid #c0392b; padding-bottom: 10px; margin-bottom: 20px; }
h1, h3 { color: #e74c3c; text-shadow: 1px 1px 5px #000; }
.clima-box { background: #1a1a1a; padding: 10px; border-radius: 4px; margin-bottom: 20px; border-left: 4px solid #e74c3c; }
.clima-texto { color: #bdc3c7; }
input { width: 100%; padding: 12px; margin-bottom: 10px; background: #111; border: 1px solid #c0392b; color: #fff; border-radius: 4px; }
.btn-agendar { width: 100%; background: #c0392b; color: white; border: none; padding: 12px; cursor: pointer; font-weight: bold; }
.btn-agendar:hover { background: #e74c3c; }
.btn-sair { background: #333; color: #e74c3c; border: 1px solid #e74c3c; padding: 5px 10px; cursor: pointer; }

/* Estilo do botão de excluir */
.btn-del {
  background: none;
  border: none;
  color: #e74c3c;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  transition: transform 0.2s;
}
.btn-del:hover {
  transform: scale(1.3);
  color: #ff0000;
}

table { width: 100%; margin-top: 15px; }
th { color: #e74c3c; border-bottom: 1px solid #c0392b; text-align: left; padding: 8px; }
td { padding: 8px; border-bottom: 1px solid #222; }
.msg { text-align: center; color: #e74c3c; font-weight: bold; }
</style>