const canvas = document.getElementById("game-canvas")
const contexto = canvas.getContext("2d")

const quadraImage = new Image()
quadraImage.src = "./images/quadrapadrao.jpg"
const bolaImage = new Image()
bolaImage.src = "./images/bola.png"

const telaDeInicio = new Image()
telaDeInicio.src = "./images/telainicio.png"

class Objeto{
    constructor(imagem,x,y,w,h){
        this.imagem = imagem
        if(this instanceof PosicaoJogadores){
            this._x = x
            this._y = y
        }else{
            this.x = x
            this.y = y
        }
        this.w = w
        this.h = h
    }
    renderSelf(){
        contexto.drawImage(this.imagem, this.x, this.y, this.w, this.h)
    }
}

class PosicaoJogadores extends Objeto{
    constructor(imagem,x,y,w,h,rl){
        super(imagem,x,y,w,h)
        this.rl = rl
    }
    get x(){
        return this._x
    }
    get y(){
        return this._y
    }
    
    renderSelf(){
        //Esse renderSelf() deve ser retirado quando o jogo estiver completo
        contexto.drawImage(this.imagem, this.x, this.y, this.w, this.h)
        if(this.rl == 'l'){
            contexto.fillStyle = 'red';
        } else{
            contexto.fillStyle = 'blue';
        }
        contexto.fillRect(this.x, this.y, 100, 100);
    }
}

posicao1Esquerda = new PosicaoJogadores(bolaImage, 200, 700, 100, 100,'l')
posicao6Esquerda = new PosicaoJogadores(bolaImage, 400, 450, 100, 100,'l')
posicao5Esquerda = new PosicaoJogadores(bolaImage, 200, 200, 100, 100,'l')
posicao4Esquerda = new PosicaoJogadores(bolaImage, 650, 200, 100, 100,'l')
posicao3Esquerda = new PosicaoJogadores(bolaImage, 750, 450, 100, 100,'l')
posicao2Esquerda = new PosicaoJogadores(bolaImage, 650, 700, 100, 100,'l')

posicao1Direita = new PosicaoJogadores(bolaImage, 1500, 200, 100, 100, 'r')
posicao6Direita = new PosicaoJogadores(bolaImage, 1300, 450, 100, 100, 'r')
posicao5Direita = new PosicaoJogadores(bolaImage, 1500, 700, 100, 100, 'r')
posicao4Direita = new PosicaoJogadores(bolaImage, 1050, 700, 100, 100, 'r')
posicao3Direita = new PosicaoJogadores(bolaImage, 950, 450, 100, 100, 'r')
posicao2Direita = new PosicaoJogadores(bolaImage, 1050, 200, 100, 100, 'r')



const posicoes = 
[posicao1Esquerda, posicao6Esquerda, posicao5Esquerda, posicao4Esquerda, posicao3Esquerda, posicao2Esquerda,
posicao1Direita, posicao6Direita, posicao5Direita, posicao4Direita, posicao3Direita, posicao2Direita]

class ObjetoBola extends Objeto{
    req = {}
    bolaAndando = false
    constructor(imagem,x,y,w,h){
        super(imagem,x,y,w,h)
    }
    atualizaPosicao(req){
        if(this.x != req.x || this.y != req.y){
            this.bolaAndando = true
        }else{
            this.bolaAndando = false
        }
        if(this.x != req.x){
            if(this.x < req.x){
                this.x = this.x + 10
            }else{
                this.x = this.x - 10
            }
        }
        if(this.y != req.y){
            if(this.y < req.y){
                this.y = this.y + 5
            }else {
                this.y = this.y - 5
            }
        }
    }
}

quadra = new Objeto(quadraImage,0,0,1800,1000)
// Área do jogo começa realmente em x: 125 e y: 105
// Temina em x: 1545 e y: 745
telaComeçar = new Objeto(telaDeInicio,0,0,1800,1000)
bola = new ObjetoBola(bolaImage, posicao1Direita.x, posicao1Direita.y, 130, 155)

function tocouNaBola(){
    times.forEach(time=>{
        time.jogadores.forEach((jogador)=>{
            if(bola.x < jogador.x + 100 && bola.y < jogador.y + 100 && bola.x > jogador.x - 100 && bola.y > jogador.y - 100){
                console.log(jogador.nome)
            }
        })
    })
}

function gameLoop(){
    showScreen.renderSelf()
    requestAnimationFrame(gameLoop)
}


let showScreen = {}
function changeScreen(screen){
    console.log(`Mudando para a tela: ${screen.nome}!`)
    showScreen = screen
}
const screens = {
    startScreen:{
        nome: "StartScreen",
        renderSelf(){
            quadra.renderSelf()
            telaComeçar.renderSelf()
        }
    },
    gameScreen:{
        nome: 'GameScreen',
        renderSelf(){
            quadra.renderSelf()
            posicoes.forEach(( posicao )=>{
                posicao.renderSelf()
            })
            timeEsquerda.jogadores.forEach((player)=>{
                player.renderSelf()
            })
            timeDireita.jogadores.forEach((player)=>{
                player.renderSelf()
            })
            bola.renderSelf()
            if(bola.x != bola.req.x || bola.y != bola.req.y){
                bola.atualizaPosicao({x: bola.req.x, y: bola.req.y})
            } //Bola anda constantemente quando posição for diferente da requisição
            tocouNaBola()
        }
    }
}


var eventos = ["keydown" , "click"]
eventos.forEach((evento) => {
    window.addEventListener(evento, ()=>{
        if(showScreen != screens.gameScreen){
            changeScreen(screens.gameScreen)
            jogo.caraoucoroa()
        }
    })
})
changeScreen(screens.startScreen)
gameLoop()


class Time{
    sets = 0
    pontos = 0
    constructor(nome, jogadores, ladoQuadra){
        this.nome = nome
        this.jogadores = jogadores
        this.ladoQuadra = ladoQuadra
    }
    realizarRodizio(){
        let index0 = this.jogadores[0]
        this.jogadores.splice(0,1)
        this.jogadores.push(index0)
        if(this.ladoQuadra == 'direita'){
            this.jogadores[5].andarRodizio(posicao1Direita)
            this.jogadores[4].andarRodizio(posicao6Direita)
            this.jogadores[3].andarRodizio(posicao5Direita)
            this.jogadores[2].andarRodizio(posicao4Direita)
            this.jogadores[1].andarRodizio(posicao3Direita)
            this.jogadores[0].andarRodizio(posicao2Direita)
        } else{
            this.jogadores[0].andarRodizio(posicao1Esquerda)
            this.jogadores[1].andarRodizio(posicao6Esquerda)
            this.jogadores[2].andarRodizio(posicao5Esquerda)
            this.jogadores[3].andarRodizio(posicao4Esquerda)
            this.jogadores[4].andarRodizio(posicao3Esquerda)
            this.jogadores[5].andarRodizio(posicao2Esquerda)
        }
    }
    saque(){
        this.jogadores.forEach((player) => {
            if(this.ladoQuadra == 'esquerda'){
                if((player.x == posicao1Esquerda.x) && (player.y == posicao1Esquerda.y)){
                    bola.x = player.x
                    bola.y = player.y
                    player.sacar()
                }
            }else{
                if((player.x == posicao1Direita.x) && (player.y == posicao1Direita.y)){
                    bola.x = player.x
                    bola.y = player.y
                    player.sacar()
                }
            }
        })
    }
}


class Jogador{
    hasBola = false
    constructor(nome = null,imagem, posicao){
        this.nome = nome
        this.imagem = imagem
        this.x = posicao.x
        this.y = posicao.y
    }
    renderSelf(){
        contexto.drawImage(this.imagem, this.x, this.y, 100, 100)
    }
    andarRodizio(novaposicao){
        let intervalo = setInterval(() => {
            if(this.x != novaposicao.x || this.y != novaposicao.y){
                if(this.x != novaposicao.x){
                    if(this.x > novaposicao.x){
                        this.x -= 1
                    }else{
                        this.x += 1
                    }
                }
                if(this.y != novaposicao.y){
                    if(this.y> novaposicao.y){
                        this.y -= 1
                    }else{
                        this.y += 1
                    }
                }
            }else {
                this.x = novaposicao.x
                this.y = novaposicao.y
                clearInterval(intervalo) 
            }
        }, 10)
    }
    sacar(){
        if(timeEsquerda.jogadores.indexOf(this)){
            bola.req = gerarPosReq(1545, 745)
        }else{
            bola.req = gerarPosReq(1545, 745)
        }
    }
}

function gerarPosReq(xnum, ynum){
    let x = numeroAleatorio(xnum)
    let y = numeroAleatorio(ynum)
    while(x % 10 != 0){
        x = numeroAleatorio(xnum)
    }
    while(y % 5 != 0){
        y = numeroAleatorio(ynum)
    }
    return {x: x, y: y}
}

const imagemGustavo = new Image()
imagemGustavo.src = "./images/jogadores/trentas.jpg"
const imagemVelho = new Image()
imagemVelho.src = "./images/jogadores/velho.jpg"
const imagemAmanda = new Image()
imagemAmanda.src = "./images/jogadores/amanda.jpg"
const imagemNicolas = new Image()
imagemNicolas.src = "./images/jogadores/nicocas.jpg"
const imagemLip = new Image()
imagemLip.src = "./images/jogadores/lip.jpg"
const imagemBorn = new Image()
imagemBorn.src = "./images/jogadores/born.jpg"


const born = new Jogador("Born", imagemBorn, posicao1Direita)
const velho = new Jogador("Velho", imagemVelho, posicao2Direita)
const gustavo = new Jogador("Trentini", imagemGustavo, posicao3Direita)
const amanda = new Jogador("Amanda", imagemAmanda, posicao4Direita)
const nicolas = new Jogador("Nicolas", imagemNicolas, posicao5Direita)
const lip = new Jogador("Lip", imagemLip, posicao6Direita)

const imagemRandons = new Image()
imagemRandons.src = "./images/jogadores/jopinguim.jpg"

const random1 = new Jogador("Random1", imagemRandons, posicao1Esquerda)
const random2 = new Jogador("Random2", imagemRandons, posicao2Esquerda)
const random3 = new Jogador("Random3", imagemRandons, posicao3Esquerda)
const random4 = new Jogador("Random4", imagemRandons, posicao4Esquerda)
const random5 = new Jogador("Random5", imagemRandons, posicao5Esquerda)
const random6 = new Jogador("Random6", imagemRandons, posicao6Esquerda)

timeDireita = new Time('Araquamanos',[born, velho, gustavo, amanda, nicolas, lip], 'direita')
timeEsquerda = new Time('RandomsPlays',[random1, random6, random5, random4, random3, random2], 'esquerda')
times = [timeEsquerda, timeDireita]

function numeroAleatorio(range){
    return Math.round(Math.random() * range) 
}

class Jogo{
    ultimo_time_a_marcar = null
    constructor(timeEsquerda, timeDireita){
        if(!(timeEsquerda instanceof Time) || !(timeDireita instanceof Time)){
            throw new Error('Os times devem ser uma instancia da classe Time')
        }else{
            timeEsquerda = timeEsquerda
            timeDireita = timeDireita
        }
    }
    caraoucoroa(){
        if(numeroAleatorio(1) == 0){
            this.comecarSet(timeEsquerda)
        }else {
            this.comecarSet(timeDireita)
        }
    }
    comecarSet(time){
        if(timeEsquerda.sets == 0 && timeDireita.sets == 0){
            timeDireita.realizarRodizio()
        }
        time.saque()

        console.log(time)

    }
}

const jogo = new Jogo(timeEsquerda, timeDireita)
