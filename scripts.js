// Input para digitar o nome ou número do Pokémon
const inputNomePokemon = document.getElementById('pokemon-name');

async function ApiPokemon(NomeOuNumeroPokemon) {
    try {
        // Fazendo uma Requisição na API
        const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${NomeOuNumeroPokemon.toLowerCase()}`);
        if (!resposta.ok) {  // se não for bem sucedido, retorne o erro da mensagem (NÃO ENCONTRADO)
            const error = new Error('Pokemon não encontrado');
            throw error;
        }
        // Se a Requisição na API for ok Code Status: 200, então faça:
        const dados = await resposta.json(); // Aguarde a promessa, e pegue os dados da API e Converteu em JSON
        return dados; // Retorna os dados da API em formato JSON Para a Função!
    } catch (error) { // Se ocorrer um erro, retorna uma mensagem identificando o erro!
        alert('Pokemon NÃO ENCONTRADO')
        throw error;
 
    }
}

// Evento de mudança (change) no input para chamar a função do Pokemon
inputNomePokemon.addEventListener('change', async function () {
    const nomeOuNumeroPokemon = inputNomePokemon.value.trim(); // Obtém o valor do input

    try {
        // Chama a função ApiPokemon passando o nome ou número como parâmetro
        const pokemon = await ApiPokemon(nomeOuNumeroPokemon);
        
        // Exemplo de uso
        criarCard(pokemon);
        
        console.log('Dados do Pokemon:', pokemon); // Mostre os dados do pokemon!
    } catch (error) { // Se for Erro, Mostre a mensagem e o erro!
        console.error('Erro ao recuperar dados do Pokemon:', error);
    }
});

// Função para criar e adicionar uma nova div card ao HTML
function criarCard(pokemon) {
    // Selecione o elemento pai onde deseja inserir as divs card
    const pokemonContainer = document.getElementById('pokemon-container');
    
    // Criar elementos HTML
    const divCard = document.createElement('div');
    const img = document.createElement('img');
    const divCardBody = document.createElement('div');
    const h3 = document.createElement('h3');
    const button = document.createElement('button');

    // Definir classes e atributos
    divCard.className = 'card';
    img.id = 'img';
    img.src = pokemon.sprites.other['official-artwork'].front_default;
    img.alt = pokemon.name;
    divCardBody.className = 'card-body';
    h3.className = 'card-title';
    h3.textContent = pokemon.name;
    button.className = 'delete-btn';
    button.textContent = 'Delete';
    button.setAttribute('onclick', 'deletePokemon(this)');

    button.addEventListener('click', function() {
        divCard.remove(); // Remover o card do DOM quando o botão de delete for clicado
    });

    // Adicionar elementos à div card
    divCard.appendChild(img);
    divCardBody.appendChild(h3);
    divCardBody.appendChild(button);
    divCard.appendChild(divCardBody);

    // Adicionar a div card ao container de Pokémon
    pokemonContainer.appendChild(divCard);
}