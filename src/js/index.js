// Aguarda o carregamento completo do DOM antes de executar o script
document.addEventListener("DOMContentLoaded", function () {

	// Seleciona os elementos do DOM necessários para interação
	const form = document.querySelector(".form-group");
	const input = document.getElementById("description");
	const htmlCode = document.getElementById("html-code");
	const cssCode = document.getElementById("css-code");
	const preview = document.getElementById("preview-section");

	// Adiciona um ouvinte de evento para o envio do formulário
	form.addEventListener("submit", async function (event) {
		event.preventDefault(); // Previne o comportamento padrão de recarregar a página


		// Obtém e limpa o valor do input de descrição
		const description = input.value.trim();

		// Se a descrição estiver vazia, interrompe a execução
		if (!description) {
			return;
		}

		// Ativa o estado de carregamento na interface
		setLoading(true);

		try {

			// Faz uma requisição POST para o webhook do n8n
			const response = await fetch("http://localhost:5678/webhook/Fundo-Magico", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ description }), // Envia a descrição no corpo da requisição
			});

			// Verifica se a resposta da rede foi bem-sucedida
			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(`Erro na requisição: ${response.status} ${response.statusText} - ${errorText}`);
			}


			// Obtém o texto bruto da resposta
			let responseText = await response.text();


			// Limpa formatação de bloco de código Markdown (```json ... ```) se presente
			if (responseText.trim().startsWith("```")) {
				responseText = responseText.replace(/^```(json)?\s*/i, "").replace(/\s*```$/, "");
			}

			// Converte a string limpa para um objeto JSON
			const data = JSON.parse(responseText);


			// Exibe o código HTML retornado na área de código
			htmlCode.textContent = data.code || "";


			// Exibe o código CSS retornado na área de código
			cssCode.textContent = data.style || "";


			// Torna a seção de preview visível
			preview.style.display = "block";

			// Insere o HTML gerado dentro do elemento de preview
			preview.innerHTML = data.code || "";


			// Gerencia a tag de estilo dinâmico para aplicar o CSS gerado
			let styleTag = document.getElementById("dynamic-style");


			// Remove a tag de estilo anterior, se existir, para evitar conflitos
			if (styleTag) {
				styleTag.remove();
			}

			// Se houver CSS retornado, cria e aplica uma nova tag de estilo
			if (data.style) {
				
				styleTag = document.createElement("style");

				
				styleTag.id = "dynamic-style";

				
				styleTag.textContent = data.style;

				
				document.head.appendChild(styleTag);
			}
		} catch (error) {
			// Tratamento de erros: loga no console e exibe mensagens amigáveis na interface
			console.error("Erro ao gerar o fundo mágico:", error);
			htmlCode.textContent = "Não consegui gerar o HTML. Tente novamente.";
			cssCode.textContent = "Não consegui gerar o CSS. Tente novamente.";
			preview.innerHTML = "";
		} finally {
			// Desativa o estado de carregamento, independentemente do sucesso ou falha
			setLoading(false);
		}
	});

	
	// Função auxiliar para alternar o texto do botão durante o carregamento
	function setLoading(isLoading) {
		const button = document.getElementById("btn-text");

		if (isLoading) {
			button.innerHTML = "Gerando Background...";
		} else {
			button.innerHTML = "Gerar Background Mágico";
		}
	}
});
