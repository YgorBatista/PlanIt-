# PlanIt - Sistema de Gerenciamento de Tarefas

## 1. Visão Geral do Projeto

O PlanIt é uma aplicação moderna de gerenciamento de tarefas (to-do list) desenvolvida com Next.js, TypeScript e Tailwind CSS. O projeto implementa funcionalidades avançadas como autenticação, temas claro/escuro, e uma interface responsiva e interativa.

## 2. Tecnologias Utilizadas

### 2.1 Core Technologies

-   **Next.js 15.5.4**: Framework React com suporte a Server-Side Rendering
-   **React 19**: Biblioteca para construção de interfaces
-   **TypeScript**: Adiciona tipagem estática ao JavaScript
-   **Tailwind CSS**: Framework CSS utility-first para estilização

### 2.2 Bibliotecas Principais

-   **next-auth**: Autenticação (Google e GitHub)
-   **next-themes**: Gerenciamento de temas (claro/escuro)
-   **framer-motion**: Animações fluidas
-   **radix-ui**: Componentes UI acessíveis
-   **zod**: Validação de formulários

## 3. Arquitetura do Projeto

### 3.1 Estrutura de Pastas

```
src/
├── app/                    # Rotas e layouts principais
│   ├── api/               # API routes (autenticação)
│   ├── base/              # Componentes base (header/footer)
│   ├── hooks/             # Custom hooks
│   ├── login/            # Página de login
│   └── todos/            # Página principal de tarefas
├── components/           # Componentes reutilizáveis
│   ├── ui/              # Componentes UI base
│   ├── LoginBtn/        # Botões de autenticação
│   └── TodosComponents/ # Componentes específicos de tarefas
└── lib/                 # Utilitários e configurações
```

## 4. Funcionalidades Principais

### 4.1 Sistema de Autenticação

-   Login com Google e GitHub via NextAuth
-   Login manual com email/senha
-   Proteção de rotas com middleware
-   Gerenciamento de sessão persistente

### 4.2 Gerenciamento de Tarefas

-   CRUD completo de tarefas (Criar, Ler, Atualizar, Deletar)
-   Categorização por status (Pendente, Fazendo, Concluído)
-   Filtros dinâmicos por status
-   Paginação de tarefas
-   Edição inline e modal detalhado

### 4.3 Interface do Usuário

-   Design responsivo para todas as telas
-   Tema claro/escuro com persistência
-   Animações suaves de transição
-   Feedback visual de interações
-   Modal para edição detalhada

## 5. Lógica de Implementação

### 5.1 Gerenciamento de Estado

-   Custom hooks para gerenciamento de tarefas (`useTasks`)
-   Estado local para filtros e paginação
-   Persistência em localStorage por usuário
-   Controle de estado de edição (inline/modal)

### 5.2 Autenticação e Segurança

```typescript
// Middleware de proteção de rotas
export async function middleware(request: NextRequest) {
  if (pathname.startsWith('/todos')) {
    const token = await getToken({ req: request });
    const hasSession = token || cookie checks...

    if (!hasSession) {
      return NextResponse.redirect('/login');
    }
  }
  return NextResponse.next();
}
```

### 5.3 Gerenciamento de Tarefas

```typescript
// Hook principal de tarefas
export function useTasks() {
    const [tasks, setTasks] = useState<TaskItem[]>([]);
    // ... lógica de CRUD

    const addTask = () => {
        if (!title || !status) return;
        const id = generateId();
        const newTask = { id, title, status, editing: false };
        setTasks(prev => [newTask, ...prev]);
    };

    // ... outros métodos
}
```

## 6. Features Avançadas

### 6.1 Experiência do Usuário (UX)

-   Animações de transição suaves
-   Feedback visual imediato
-   Auto-focus em campos relevantes
-   Validação de formulários em tempo real

### 6.2 Performance

-   Otimização de re-renders
-   Lazy loading de componentes
-   Persistência eficiente de dados
-   Gerenciamento otimizado de estado

### 6.3 Responsividade

-   Layout adaptativo
-   Breakpoints customizados
-   Interações otimizadas para mobile
-   Design consistente em todas as telas

## 7. Considerações de Desenvolvimento

### 7.1 Boas Práticas

-   Componentização modular
-   TypeScript para type-safety
-   Hooks customizados para lógica reutilizável
-   Padrões consistentes de código

### 7.2 Manutenibilidade

-   Estrutura de arquivos organizada
-   Código comentado e documentado
-   Separação clara de responsabilidades
-   Nomenclatura consistente

## 8. Conclusão

O PlanIt demonstra uma implementação robusta e moderna de um sistema de gerenciamento de tarefas, utilizando as melhores práticas e tecnologias atuais do desenvolvimento web. A combinação de TypeScript, Next.js e uma arquitetura bem planejada resulta em uma aplicação escalável, manutenível e com excelente experiência do usuário.

A aplicação serve como um excelente exemplo de:

-   Arquitetura moderna de front-end
-   Implementação de autenticação segura
-   UI/UX responsivo e acessível
-   Gerenciamento eficiente de estado
-   Práticas de código limpo e manutenível
