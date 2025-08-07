# 📦 POC-CYPRESS

Projeto de testes automatizados com **Cypress**, desenvolvido como parte do curso **"Cypress, do Zero à Nuvem"** da [Escola Talking About Testing](https://talkingabouttesting.courses/).

> 🔬 Repositório educacional com foco em testes end-to-end, boas práticas com Cypress, execução local e na nuvem.

---

## 📑 Descrição

Este projeto tem como objetivo aplicar na prática os conceitos aprendidos no curso, incluindo:

- Escrita de testes automatizados com Cypress
- Execução local e mobile
- Execução em CI/CD, Github Actions
- Integração com o Cypress Cloud
- Documentação
- Cypress Avançado

## 🧪 Como rodar?

Execute os testes com os seguintes comandos:

| Comando                | Descrição                                              |
|------------------------|--------------------------------------------------------|
| `npm run cy:open`      | Abre o Cypress em modo interativo (desktop)           |
| `npm run cy:open:mobile` | Abre o Cypress com viewport mobile (410x860)        |
| `npm test`             | Executa os testes em modo headless                    |
| `npm run test:mobile`  | Executa testes em modo headless com viewport mobile   |

---

## 📲 Requisitos

- [Node.js](https://nodejs.org/) na versão 23.7.0
- [npm](https://www.npmjs.com/)
- [Cypress](https://www.cypress.io/)

Instale as dependências com:

```bash
npm install
```

## ☁️ Cypress Cloud

Este projeto pode ser integrado ao [Cypress Cloud](https://www.cypress.io/cloud/) para executar os testes em ambiente de nuvem, com visualização detalhada dos resultados e integração com pipelines.

---

## 📘 Curso

Este repositório segue os exercícios e boas práticas ensinadas no curso:

**Cypress, do Zero à Nuvem** — por [Walmyr Filho](https://walmyr.dev/)

---

## 📄 Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).