//criando o personagem padrão
const defaultCharacter = {
    name: '',
    life: 1,
    maxLife: 1,
    attack: 0,
    defense: 0
}

//criando guerreiro
const createKnight = (name) => {
    return {
        ...defaultCharacter,
        name,
        life: 100,
        maxLife: 100,
        attack: 10,
        defense: 8
    }
}

//criando o mago
const createSorcerer = (name) => {
    return {
        ...defaultCharacter,
        name,
        life: 50,
        maxLife: 50,
        attack: 14,
        defense: 3
    }
}

//criando o monstro pequeno
const createLittleMonster = () => {
    return {
        ...defaultCharacter,
        name: 'Little Monster',
        life: 40,
        maxLife: 40,
        attack: 4,
        defense: 4
    }
}

//criando monstro grande
const createBigMonster = () => {
    return {
        ...defaultCharacter,
        name: 'Big Monster',
        life: 120,
        maxLife: 120,
        attack: 16,
        defense: 6
    }
}

//criando o cenário do jogo
const stage = {
    fighter1: null,
    fighter2: null,
    fighter1El: null,
    fighter2El: null,

    //função que vai começar o jogo
    start(fighter1, fighter2, fighter1El, fighter2El) {
        this.fighter1 = fighter1;
        this.fighter2 = fighter2;
        this.fighter1El = fighter1El;
        this.fighter2El = fighter2El;

        //adicionando o evento do botão atacar
        this.fighter1El.querySelector('.atackButton').addEventListener('click', () => this.doAttack(this.fighter1, this.fighter2));
        this.fighter2El.querySelector('.atackButton').addEventListener('click', () => this.doAttack(this.fighter2, this.fighter1));

        //função para atualizar os dados visualmente
        this.update();
    },

    //criando a função que vai atualizar os dados na tela
    update() {
        //jogador 1
        this.fighter1El.querySelector('.name').innerHTML = `${this.fighter1.name} - ${this.fighter1.life.toFixed(1)} HP`;

        //função que vai calcular a porcentage de vida do personagem 1
        let f1Pct = (this.fighter1.life / this.fighter1.maxLife) * 100;
        this.fighter1El.querySelector('.bar').style.width = `${f1Pct}%`;

        //jogador 2
        this.fighter2El.querySelector('.name').innerHTML = `${this.fighter2.name} - ${this.fighter2.life.toFixed(1)} HP`;

        //função que vai calcular a porcentage de vida do personagem 2
        let f2Pct = (this.fighter2.life / this.fighter2.maxLife) * 100;
        this.fighter2El.querySelector('.bar').style.width = `${f2Pct}%`;
    },

    //criando a função de atacar
    doAttack(attacking, attacked) {
        //condição para verificar se alguém está morto
        if(attacking.life <= 0 || attacked.life <= 0) {
            log.addMessage('Alguém está morto...');
            return;
        }

        //criando o fator de ataque
        const attackFactor = (Math.random() * 2).toFixed(2);
        const defenseFactor = (Math.random() * 2).toFixed(2);

        //logica na hora de atacar e defender
        const actualAttack = attacking.attack * attackFactor;
        const actualDefense = attacking.attack * defenseFactor;

        //consição para saber se o personagem foi atacado e se conseguiu se defender
        if(actualAttack > actualDefense){
            attacked.life -= actualAttack;

            //verificação para mostrar a barra de vida com o numero positivo
            attacked.life = attacked.life < 0 ? 0 : attacked.life;
            log.addMessage(`${attacking.name} causou ${actualAttack.toFixed(2)} de dano em ${attacked.name}`);
        }else{
            log.addMessage(`${attacked.name} conseguiu defender...`);
        }


        this.update();
    }
}

//função que vai mostrar o log na tela com as mensagem de ataque e defesa
const log = {
    list: [],
    addMessage(msg) {
        this.list.push(msg);
        //função que vai renderizar na tela
        this.render();
    },
    render() {
        const logEl = document.querySelector('.log');
        logEl.innerHTML = '';

        //loop que vai mostrar amensagem na tela
        for (let i in this.list) {
            logEl.innerHTML += `<li>${this.list[i]}</li>`;
        }
    }
}