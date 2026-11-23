# Engenharia da Saúde · Gestão de Home Care

**Site publicado:** https://mdudanasci.github.io/engenharia-da-saude/
**Repositório:** https://github.com/mdudanasci/engenharia-da-saude

Sistema web para organizar o fluxo administrativo do atendimento domiciliar:

- **Técnicas de enfermagem** (profissionais) com ficha completa: identidade, CPF/RG, COREN, contato, valor do plantão e status.
- **Pacientes** com modalidade de acompanhamento **12h (2 técnicas)** ou **24h (4 técnicas)** e equipe vinculada.
- **Escalas mensais em formato de planilha**, iguais ao *CONTROLE DE ESCALAS*: profissional, COREN, nº de plantões, valor, total e os dias marcados (D, N ou 24h).
- **Importação direta da planilha**: copie as linhas do Google Sheets/Excel, cole no site e ele cadastra as técnicas e lança os plantões.

O visual segue a identidade da marca (mandala colorida, fundo creme, tipografia editorial e acentos em rosa/coral).

---

## Como abrir

1. Abra a pasta `engenharia-da-saude`.
2. Dê duplo clique em **`Abrir site.bat`**.
   Ele inicia um servidor local (sem instalar nada) e abre o sistema em `http://localhost:8765`.
3. Para encerrar o servidor depois, use **`Parar servidor.bat`**.

> O site é 100% estático: também funciona publicado em Netlify, Vercel, GitHub Pages ou hospedagem própria (basta enviar a pasta). Use sempre o mesmo endereço para não separar os dados.

---

## Compartilhar o link do site

1. Dê duplo clique em **`Compartilhar site.bat`**.
2. Ele inicia o servidor local, cria um **link público** (Cloudflare Tunnel), copia o endereço para a área de transferência e abre no navegador.
3. Envie o link para quem quiser — funciona em qualquer celular ou computador, sem instalar nada.

Exemplo de link gerado: `https://algum-nome-aleatorio.trycloudflare.com`

> - O link funciona enquanto **este computador estiver ligado** e o compartilhamento ativo.
> - Para encerrar, use **`Parar compartilhamento.bat`**.
> - Cada pessoa que abre o link usa os dados salvos **no próprio navegador** (a escala não é compartilhada entre dispositivos). Para todos verem a mesma escala, é necessário um banco de dados na nuvem.

---

## Como importar a planilha

1. No Google Sheets/Excel, selecione a tabela da escala (de **Profissionais** até a última técnica).
2. Copie com **Ctrl + C**.
3. No site, clique em **Importar planilha** (barra superior) e cole com **Ctrl + V**.
4. Clique em **Analisar** — o sistema reconhece nome, COREN, nº de plantões e valor.
5. Confira a prévia e clique em **Importar**. Opcionalmente ele vincula as técnicas ao paciente e lança os plantões no mês.

O que já vem carregado é uma demonstração com os dados das planilhas de **Ada Santana** e **Celia Borba** (nomes, COREN e valores de setembro/2026, lançados no mês atual).

---

## Acesso ao sistema

- No **primeiro acesso** deste navegador, o sistema pede a criação da **conta de administração** (nome, e-mail, função e senha).
- Depois, outras pessoas podem clicar em **“Criar conta”** na tela de entrada e fazer o próprio cadastro.
- Clique no seu avatar (canto superior direito) para abrir **Meu cadastro**: alterar nome, função, telefone, COREN, e-mail e senha.
- No mesmo menu há **Sair da conta**.

> **Importante:** este é um acesso **local**. As contas e os dados ficam salvos apenas neste navegador/computador. Para a equipe entrar de outros computadores com a mesma escala, é necessário o modo nuvem (Supabase) — posso configurar quando quiser.

---

## O que tem em cada área

| Área | O que faz |
| --- | --- |
| **Painel** | Pacientes, técnicas, plantões e custo do mês; plantões de hoje; modalidades; **calendário com datas comemorativas** (Dia do Enfermeiro, Dia do Idoso, etc.); últimos 7 dias |
| **Escalas** | Planilha mensal por paciente com navegação de mês, totais por técnica/dia, OBS e clique nas células |
| **Cadernos** | Planilha de organização dos cadernos (paciente, responsável, situação, observações) + **scanner** pela câmera ou arquivo, com os documentos guardados na própria área |
| **Pacientes** | Cadastro, modalidade 12h/24h, equipe de 2 ou 4 técnicas, escala e custo do mês |
| **Técnicas** | Ficha com identidade, COREN, contato, valor do plantão, pacientes e plantões do mês |
| **Relatórios** | Custo por paciente, plantões por técnica, modalidades e exportações |

### Atalhos e interações

- **Clique na célula da escala**: Diurno → Noturno → 24h → limpar.
- **Cadernos**: clique em qualquer célula da tabela para editar (salva sozinho). No ícone da câmera você escaneia páginas pela webcam ou envia fotos/PDF.
- **/**: foca a busca global.
- **Esc**: fecha modal, busca ou menu.
- Arraste a planilha na horizontal para ver todos os dias do mês.

> Os documentos escaneados ficam salvos no navegador (IndexedDB) e **não entram no backup JSON**. Para a equipe acessar os mesmos arquivos de outros computadores, é necessário o modo nuvem.

---

## Onde os dados ficam

Tudo é salvo no **localStorage do navegador** (somente neste computador/navegador).
Use **Relatórios → Backup** ou **Configurações (engrenagem na barra lateral) → Baixar backup completo** antes de limpar o histórico do navegador.

- **Restaurar dados de exemplo**: volta ao estado inicial de demonstração.
- **Restaurar backup**: carrega um arquivo `.json` gerado pelo sistema.

---

## Próximos passos sugeridos

- Banco de dados compartilhado (Supabase/Firebase) para várias pessoas usarem ao mesmo tempo.
- Login por perfil (administração, coordenação, técnicas).
- Fechamento de mês com relatório de pagamento por profissional.
- Notificações de plantão e confirmação pela técnica.

---

## Estrutura

```
engenharia-da-saude/
├── index.html            # estrutura e ícones
├── assets/
│   ├── styles.css        # design system (cores, componentes, responsivo)
│   ├── escala.css        # planilha de escalas, equipe e importação
│   ├── app.js            # dados, telas, formulários e interações
│   ├── favicon.png       # mandala da marca
│   └── logo.png          # logo completa
├── servidor.ps1          # servidor local (PowerShell, sem instalação)
├── Abrir site.bat
└── Parar servidor.bat
```

© Engenharia da Saúde · Home Care
