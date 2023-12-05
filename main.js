const elementoLivros = document.querySelector('#livros')
const botoesCategorias = document.querySelectorAll(".btn")

let livros = []
const api = "https://guilhermeonrails.github.io/casadocodigo/livros.json"

async function getLivros() {
  const response = await fetch(api)
  livros = await response.json()
  const livrosComDescontoAplicado = aplicarDesconto(livros)
  showLivros(livrosComDescontoAplicado)
}

function aplicarDesconto(livros) {
  const desconto = 0.3

  return livros.map(livro => {
    return {
      ...livro,
      preco: (livro.preco - (livro.preco * desconto)).toFixed(2)
    }
  })
}

function showLivros(livros) {
  elementoLivros.innerHTML = ""

  livros.forEach(livro => {
    elementoLivros.innerHTML += `
      <div class="livro ${livro.quantidade === 0 && 'indisponivel'}">
        <img
          class="livro__imagens"
          src="${livro.imagem}"
          alt="${livro.alt}"
        />
        <h2 class="livro__titulo">${livro.titulo}</h2>
        <p class="livro__descricao">${livro.autor}</p>
        <p class="livro__preco" id="preco">R$${livro.preco}</p>
        <div class="tags">
          <span class="tag">${livro.categoria}</span>
        </div>
      </div>
    `
  })
}

function handleFiltrarLivros(botao) {
  let livrosFiltrados

  switch (botao.value) {
    case "front-end":
    case "back-end":
    case "dados":
      livrosFiltrados = livros.filter(livro => livro.categoria === botao.value)
      showLivros(livrosFiltrados)
      break
    case "disponiveis":
      livrosFiltrados = livros.filter(livro => livro.quantidade > 0)
      showLivros(livrosFiltrados)
      break
    case "ordenacao":
      livrosFiltrados = livros.sort((a, b) => a.preco - b.preco)
      showLivros(livrosFiltrados)
      break;
  }
}

botoesCategorias.forEach(botao => {
  botao.addEventListener('click', () => handleFiltrarLivros(botao))  
})

getLivros()