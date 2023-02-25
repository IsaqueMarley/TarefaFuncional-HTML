//ALUNO: ISAQUE MARLEY VIEIRA BISPO
//MATRICULA: 2021xxxxxx
//TURMA: 05
//DATA: 03/09/2022

// formas de uso:
// Preencha todos os campos, clique em guardar para o historico ser salvo;
// Apos o registro de seus historicos de interesse clique em finalizar.
// Logo, perceberá algumas mais iformações abaixo.


class Historico {

    constructor(){
        this.arrayHistorico = [];

    }
    // funcao que recebe outras funcoes para que possa ocorrer o registro
    //1°
    guardar(){
        let historico = this.lerDados()
        
        if (this.valida(historico)){
            this.adicionar(historico)
        }
        this.listarTabela();
        this.limpar()

    }

    
    //fornece os itens para suas devidas colunas na tabela
    listarTabela (){
        let tbody = document.getElementById('tbody')
        tbody.innerText ='';

        for (let i=0; i < (this.arrayHistorico).length; i++){
            let tr = tbody.insertRow();

            let col_ano = tr.insertCell()
            let col_cod = tr.insertCell()
            let col_ch = tr.insertCell()
            let col_freq = tr.insertCell()
            let col_nota = tr.insertCell()

            col_ano.innerText = this.arrayHistorico[i].periodo
            col_cod.innerText = this.arrayHistorico[i].codigo
            col_ch.innerText = this.arrayHistorico[i].cargahoraria
            col_freq.innerText = this.arrayHistorico[i].freq
            col_nota.innerText = this.arrayHistorico[i].nota
            
            col_ano.classList.add('center')
            col_cod.classList.add('center')
            col_ch.classList.add('center')
            col_freq.classList.add('center')
            col_nota.classList.add('center')
        }

    }
   

    
    // A cada histórico lido joga dentro do REGISTRO
    adicionar (historico){
        this.arrayHistorico.push(historico);
    }

    lerDados () { //funcaopara pegar Valores de cada item no REGISTRO
        let historico = {}
        historico.periodo = document.getElementById('periodo').value
        historico.codigo = document.getElementById('codigo').value
        historico.cargahoraria = document.getElementById('cargahoraria').value
        historico.freq = document.getElementById('freq').value
        historico.nota = document.getElementById('nota').value
        
        return historico
    }
    valida (historico){ // funcao de validacao caso o usuario nao preencha todos os campos
        let msg = '';

        if(historico.periodo == ''){
            msg += ' Informe o periodo \n'
        }
        if(historico.codigo == ''){
            msg += ' Informe o Codigo da disciplina \n'
        }
        if(historico.cargahoraria == ''){
            msg += ' Informe o CH \n'
        }
        if(historico.freq == ''){
            msg += ' Informe o frequência \n'
        }
        if(historico.nota == ''){
            msg += ' Informe a nota \n'
        }
        if (msg != ''){
            alert(msg)
            return false
        }
        return true
    }
    limpar(){ // funcao para limpar as caixas toda vez que for registrado
       document.getElementById('periodo').value = ''
       document.getElementById('codigo').value = ''
       document.getElementById('cargahoraria').value = ''
       document.getElementById('freq').value = ''
       document.getElementById('nota').value = ''
    }
   const
    finalizar(){ // As funcoes a seguir foram implementadas para a exibicao de mais infomacoes sobre o historico. (obejetivo da tarefa)

        // funcoes auxiliares
        const somar = (acc,x)=>acc+x
        const extraiAno = (item) => item.periodo
        const extraiCodigo = (item) => item.codigo
        const extraiCH = (item) => parseInt( item.cargahoraria)
        const extraiFreq = (item) => parseFloat(item.freq)
        const extraiNota = (item) => parseFloat(item.nota)
        
        const listaApenasAno =  this.arrayHistorico.map( (x)=> extraiAno(x)) //lista com os periodos
        const listaApenasNota = this.arrayHistorico.map((x)=> extraiNota(x)) //lista com as notas
        const listaApenasCodigo = this.arrayHistorico.map( (x) => extraiCodigo(x)) //lista com os cods das Disciplinas

        const media = (listaApenasNota.reduce(somar,0))/(listaApenasNota).length
        const parcial = listaApenasNota.map( (x) => (x-media)**2).reduce(somar,0) //calculo parcial da (nota- media)**2 para ser usada no desvio padrao
        const notaVezesCH = this.arrayHistorico.map((x)=> extraiNota(x)*extraiCH(x)).reduce(somar,0) // calcula a nota * Carga horaria

        //desvio padrao
        const dp = Math.sqrt((parcial)/(listaApenasAno.length)).toFixed(2)

        const listaApenasCH  =  this.arrayHistorico.map( (x)=> extraiCH(x)) //lista com aa Cargas horarias
        const listaCHint = listaApenasCH.map( (x)=> parseInt(x)) //carga horaria com os numeros inteiros
        const cargahoraria = listaCHint.reduce(somar,0) // valor TOTAL das cargas horarias

        // tempoCurso filtra deixando apenas os periodos diferentes e depois pega o seu tamanho 
        const tempoCurso = listaApenasAno.filter((indice,x)=> listaApenasAno.indexOf(indice)===x).length

        // Media Geral Ponderada
        const mediagp = (notaVezesCH/cargahoraria).toFixed(2)

        //média por cada departamento. A terminar...
        const depart = listaApenasCodigo.map( (x)=>x.replace(/[^A-Z]/g,'') )//retorna a lista mapeada com os nomes Ex.: 'ADM0569' --> 'ADM'
        const mediaDepart = ()=> {
            if(listaApenasCodigo.filter( (x) => depart(x) )){}
        }
        

        //filtra as materias que reprovou( nota <5 ) e que foi  aprovado(nota>=5) 
        const aprovado = this.arrayHistorico.filter((x)=> (extraiNota(x) >=5) && (extraiFreq(x) >=75))//lista com as disciplinas aprovadas
        const reprovado = this.arrayHistorico.filter((x)=> (extraiNota(x) < 5) && (extraiFreq(x) >=75)) //lista com as disciplinas reprovadas
        

        const tbody2 = document.getElementById('tbody2')
        tbody2.innerText =''; //para  se inciar vazio
            const linha = tbody2.insertRow(); // inserir no campo do HTML com id de tbody°

        const tbody3 = document.getElementById('tbody3')
            tbody3.innerText ='';
            const linha3 = tbody3.insertRow();



            const col_periodos = linha.insertCell()
            const col_tcurso = linha.insertCell()
            const col_mgp = linha.insertCell()
            const col_dp = linha.insertCell()
            const col_nota = linha.insertCell()

            // col -> COLUNAS
            // exibi os resultados no HTML
            col_periodos.innerText = cargahoraria +' Horas' 
            col_tcurso.innerText = tempoCurso +' Períodos'
            col_mgp.innerText = mediagp
            col_dp.innerText = dp



            const col_Aprov = linha3.insertCell()
            const col_Reprov = linha3.insertCell()

            col_Reprov.innerText = reprovado[0] //A terminar...
            col_Aprov.innerText = aprovado[0] //A terminar...
           

            //centralizar os resultados detro da tabela
            col_periodos.classList.add('center')
            col_tcurso.classList.add('center')
            col_mgp.classList.add('center')
            col_dp.classList.add('center')
            col_nota.classList.add('center')

        

    } 
    
}
var historico = new Historico();