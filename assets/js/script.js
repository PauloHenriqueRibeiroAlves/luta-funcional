//função para criar o guerreiro
const char = createKnight('Paulo');

//função que vai criar o monstro pequeno
const monster = createLittleMonster();


//função que vai começar o jogo na tela
stage.start(
    char,
    monster,
    document.querySelector('#char'),
    document.querySelector('#monster')
);