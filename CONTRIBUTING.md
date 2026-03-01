# Guia de Contribuicao

## Branch Strategy

Este projeto usa **trunk-based development** com branch protection:

```
main (protegida)
  ├── feature/D.1-readme-tecnico
  ├── feature/nova-secao-blueprint
  ├── fix/correcao-claims-roi
  └── chore/update-dependencies
```

### Regras

1. **Nunca commite direto na `main`** — sempre use feature branches
2. **Crie um PR** para cada mudanca
3. **CI deve passar** antes do merge (lint + testes)
4. **Squash merge** para manter historico limpo

### Fluxo de Trabalho

```bash
# 1. Criar branch a partir de main
git checkout main
git pull origin main
git checkout -b feature/minha-feature

# 2. Desenvolver e commitar
git add .
git commit -m "feat: descricao da mudanca [Story X.Y]"

# 3. Push e criar PR
git push -u origin feature/minha-feature
gh pr create --title "feat: descricao" --body "..."

# 4. Aguardar CI + review, entao merge
gh pr merge --squash
```

## Convencoes de Commit

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

| Prefixo | Uso |
|---------|-----|
| `feat:` | Nova funcionalidade |
| `fix:` | Correcao de bug |
| `docs:` | Documentacao |
| `ci:` | CI/CD |
| `chore:` | Manutencao |
| `refactor:` | Refatoracao sem mudanca funcional |
| `test:` | Testes |

**Formato:** `tipo: descricao curta [Story/Epic ref]`

**Exemplos:**
```
feat: add pricing tiers to blueprint [Story 1.6]
fix: correct ROI claim from 7.4x to 3-4x [Story 2.0]
ci: add Node 20 to test matrix [Epic DevOps D.3]
```

## Executando Localmente

```bash
# Instalar dependencias
npm install

# Rodar testes
npm test

# Rodar lint
npm run lint

# Gerar deliverables
npm run generate:book   # Blueprint DOCX
npm run generate:deck   # Pitch Deck PPTX
npm run generate        # Todos
```

## Estrutura de Testes

```
tests/
├── generate-book.test.js      # Integracao: gerador DOCX
├── generate-deck.test.js      # Integracao: gerador PPTX
└── outputs-integrity.test.js  # Validacao de outputs e estrutura
```

Para adicionar testes:
1. Crie o arquivo em `tests/` com sufixo `.test.js`
2. Use `describe()` e `test()` do Jest
3. Rode `npm test` para verificar

## Checklist do PR

Antes de submeter um PR, verifique:

- [ ] Testes passam (`npm test`)
- [ ] Lint passa (`npm run lint`)
- [ ] Commit messages seguem o padrao convencional
- [ ] PR tem descricao clara do que muda e por que
- [ ] Deliverables geram corretamente (`npm run generate`) se aplicavel
