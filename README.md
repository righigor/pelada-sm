# ⚽️ Pelada SM - Registro de Estatísticas

> Aplicação web para registrar em tempo real os gols e assistências da pelada semanal.

---

## 🛠 Tecnologias Utilizadas

Aqui estão as tecnologias fundamentais utilizadas neste projeto, representadas por badges.

[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)](https://tanstack.com/query)
[![Shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://ui.shadcn.com/)

---

## 🚀 Funcionalidades

O projeto possui duas funcionalidades principais:

1.  **Registro de Partida:** Interface em tempo real para selecionar os participantes e registrar os gols e assistências à medida que acontecem durante a pelada.
2.  **Histórico e Estatísticas:** Visualização do histórico de partidas e cálculo das estatísticas anuais (total de gols, total de assistências e presença) dos jogadores.

---

## ⚙️ Configuração e Instalação

Siga os passos abaixo para configurar e rodar o projeto localmente.

### Pré-requisitos

* Node.js (versão 18+)
* npm (ou yarn/pnpm)
* Conta e Projeto configurado no Google Firebase.

### 1. Clonar o Repositório

```bash
git clone [https://github.com/SEU_USUARIO/pelada-sm.git](https://github.com/SEU_USUARIO/pelada-sm.git)
cd pelada-sm
```

### 2. Instalar Dependências

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### 3. Configurar Variáveis de Ambiente

1. Crie o arquivo de configuração de ambiente (.env.local) na raiz do projeto.

2. Adicione suas credenciais do Firebase (obtidas no console) no formato abaixo:

```
# Exemplo de .env.local
VITE_API_KEY="AIzaSy..."
VITE_AUTH_DOMAIN="pelada-sm.firebaseapp.com"
VITE_PROJECT_ID="pelada-sm"
# ... adicione as outras chaves conforme seu firebaseConfig
```

### 4. Rodar o Projeto

Inicie a aplicação em modo de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

O projeto estará acessível em http://localhost:5173 (ou porta similar).

---

### Estrutura do Projeto

A aplicação segue uma arquitetura baseada em domínios e padrões do React Query para gerenciamento de estado de servidor.

```
src/
├── components/      # Componentes UI reutilizáveis (botão, card, etc.)
├── pages/           # Componentes de rota (Home, Estatisticas)
├── queries/         # Funções que falam diretamente com o Firebase (ex: getPartidas, addGol)
├── hooks/           # Custom Hooks que envolvem o TanStack Query (ex: useFetchPartidas)
├── firebase/        # Configuração inicial do Firebase e instância 'db'
├── utils/           # Funções auxiliares (cálculo de ranking, formatação)
└── App.tsx          # Configuração do Roteamento (React Router DOM)
```

---

### Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests para melhorias, correções de bugs ou novas funcionalidades.

---

### Licença

Você pode usar o site **Shields.io** ou o **Badgen.net** para gerar *badges* de alta qualidade para as suas tecnologias, substituindo os links de exemplo acima.