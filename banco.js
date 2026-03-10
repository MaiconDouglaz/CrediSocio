// banco.js - O motor que gerencia o localStorage
// A constante abaixo define "quem" está acessando o sistema.
// Alterar este valor isola os dados em "cofres" diferentes.
const USUARIO_ID = "usuario_1"; 

const Banco = {
    // Busca todos os dados do usuário atual ou retorna a estrutura inicial
    getDados: () => {
        const dados = localStorage.getItem(`app_financeiro_${USUARIO_ID}`);
        if (dados) {
            return JSON.parse(dados);
        } else {
            // Estrutura inicial caso não exista nada salvo
            return { clientes: [] };
        }
    },

    // Salva o objeto inteiro no localStorage (a "espinha dorsal" do motor)
    salvarDados: (dados) => {
        localStorage.setItem(`app_financeiro_${USUARIO_ID}`, JSON.stringify(dados));
    },

    // Adiciona um novo cliente à lista
    adicionarCliente: (nome) => {
        let dados = Banco.getDados();
        dados.clientes.push({ nome: nome, dividas: [] });
        Banco.salvarDados(dados);
    },

    // Adiciona uma nova dívida a um cliente específico e salva
    salvarNovaDivida: (nomeCliente, novaDivida) => {
        let dados = Banco.getDados();
        let cliente = dados.clientes.find(c => c.nome === nomeCliente);

        if (cliente) {
            cliente.dividas.push(novaDivida);
            Banco.salvarDados(dados);
            return true; // Sucesso
        }
        return false; // Cliente não encontrado
    }
};