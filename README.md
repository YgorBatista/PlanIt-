# PlanIt - To-Do List App

PlanIt é uma aplicação web de lista de tarefas (to-do list) desenvolvida para ajudar usuários a organizar e gerenciar suas tarefas diárias de forma eficiente. Com uma interface intuitiva e responsiva, permite criar, editar, remover e concluir tarefas, além de oferecer autenticação via provedores como GitHub e Google.

### 🔗 Demo: https://plan-it-rose.vercel.app

## 🧠 Motivação

PlanIt foi desenvolvido com foco na aplicação de boas práticas de desenvolvimento front-end, como gerenciamento de estado, autenticação e organização de código, em um contexto prático.

## 📌 Pré-requisitos

Antes de executar o projeto, certifique-se de ter instalado:

- Node.js (versão 18 ou superior)
- npm
- Conta no GitHub e/ou Google para autenticação (opcional, mas recomendado para testar login)

## 🚀 Funcionalidades

- **Autenticação:** login com GitHub e Google utilizando NextAuth
- **Gerenciamento de tarefas:** criar, editar, excluir e marcar tarefas como concluídas
- **Filtros e pesquisa:** filtrar tarefas por status
- **Paginação:** navegação entre listas de tarefas quando há muitos registros
- **Tema dinâmico:** alternância entre tema claro e escuro
- **Interface responsiva:** adaptação para desktop e dispositivos móveis
- **Modal de edição:** edição de tarefas em um modal dedicado
- **Persistência de dados:** armazenamento das tarefas no localStorage

## 📚 Aprendizados

Durante o desenvolvimento, foram aplicados e aprendidos os seguintes conceitos:

- Uso de React Hooks como useState e useEffect

- Estrutura básica do Next.js (App Router)

- Criação de componentes reutilizáveis

- Autenticação com NextAuth

- Estilização com Tailwind CSS

- Organização de pastas e separação de responsabilidades

- Uso básico de TypeScript para tipagem

## 🧩 Tecnologias Utilizadas

- Next.js 14
- TypeScript
- Tailwind CSS
- NextAuth.js
- Shadcn/ui (baseado em Radix UI)
- Lucide React
- Middleware para proteção de rotas

## ⚙️ Instalação e Execução

1. Clone o repositório:

    ```
    git clone https://github.com/seu-usuario/planit.git
    ```

2. No terminal, vá até a pasta:
    ```
    cd planit
    ```
3. Instale as dependências:

    ```
    npm install
    ```

4. Execute o projeto em modo de desenvolvimento:

    ```
    npm run dev
    ```

5. Copie a URL para o seu navegador:
    ```
    http://localhost:3000
    ```

## 🔐 Variáveis de Ambiente

Este projeto utiliza variáveis de ambiente para configurar a autenticação com **NextAuth.js**.

Por motivos de segurança, o arquivo `.env` **não é versionado**.

## Observação

Este é um projeto de estudo e aprendizado. Melhorias futuras podem incluir testes automatizados, integração com banco de dados e refinamento da experiência do usuário.
