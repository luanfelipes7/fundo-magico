# ✨ Fundo Mágico

O **Fundo Mágico** é uma ferramenta interativa que utiliza Inteligência Artificial para transformar descrições em texto em backgrounds incríveis e prontos para uso em projetos web. Basta descrever o que você imagina e a mágica acontece: o sistema gera o HTML, o CSS e uma prévia em tempo real.

## 🚀 Funcionalidades

- **Geração por IA:** Utilize processamento de linguagem natural para criar designs exclusivos.
- **Preview em Tempo Real:** Veja o resultado do background instantaneamente na tela.
- **Código Pronto para Uso:** Obtenha os blocos de código HTML e CSS gerados para copiar e colar no seu projeto.
- **Interface Responsiva:** Design otimizado para diferentes tamanhos de tela.
- **Feedback Visual:** Indicadores de carregamento enquanto a IA processa sua ideia.

## 🛠️ Tecnologias Utilizadas

- **Frontend:** HTML5, CSS3 (com variáveis e Flexbox) e JavaScript Vanilla.
- **Tipografia:** Google Fonts (Roboto Mono).
- **Integração:** Webhooks via [n8n](https://n8n.io/) para processamento de IA.

## 📂 Estrutura do Projeto

```text
├── index.html          # Estrutura principal da página
├── README.md           # Documentação do projeto
└── src/
    ├── css/
    │   ├── estilos.css     # Estilização principal
    │   ├── reset.css       # Reset de estilos padrão
    │   └── responsivo.css  # Ajustes para dispositivos móveis
    ├── images/         # Ativos visuais (ícones e backgrounds)
    └── js/
        └── index.js        # Lógica de interação e consumo da API
```

## 📋 Como Usar

1. Clone este repositório:
   ```bash
   git clone https://github.com/luanfelipes7/fundo-magico.git
   ```
2. Abra o arquivo `index.html` em seu navegador.
3. Digite uma descrição no campo de texto (ex: "Um gradiente aurora boreal com tons de roxo e verde").
4. Clique em **"Gerar Background Mágico"**.
5. Explore o preview e copie os códigos gerados!

## 🔧 Integração com Backend

O projeto envia uma requisição `POST` para um endpoint do n8n que processa a descrição e retorna um JSON no seguinte formato:

```json
{
  "code": "<div class='seu-bg'>...</div>",
  "style": ".seu-bg { ... }"
}
```

---
Desenvolvido com 💜 por [Luan Felipe](https://github.com/luanfelipes7)
