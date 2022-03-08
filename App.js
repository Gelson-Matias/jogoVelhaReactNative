import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet, Text, View,TouchableOpacity} from 'react-native';

export default function App() {
  const [tela,setTela]=useState('menu')
  const [jogadorAtual,setJogadorAtual]=useState('');
  const [tabuleiro,setTabuleiro]=useState([]);
  const [jogadaRestante,setJogadaRestante]=useState(0);
  const [ganhador,setGanhador]=useState('');

  function inicioJogo(jagador) {
    setJogadorAtual(jagador)
    setJogadaRestante(9)
    setTabuleiro([
          ['','',''], 
          ['','',''], 
          ['','','']

      ]);
      setTela('jogo');
  }
  function jogar(linha,coluna) {
    tabuleiro[linha][coluna]=jogadorAtual
    setTabuleiro([...tabuleiro])
    setJogadorAtual(jogadorAtual === 'X' ? 'O': 'X')
    verficarGanhador(tabuleiro,linha,coluna)
  }
  function verficarGanhador(tabuleiro,linha,coluna) {
    if (tabuleiro[linha][0] !=='' && tabuleiro[linha][0] ===tabuleiro[linha][1] && tabuleiro[linha][1]===tabuleiro[linha][2]) {
      return finalizadorJogador(tabuleiro[linha][0])
    }
    if (tabuleiro[0][coluna] !=='' && tabuleiro[0][coluna] ===tabuleiro[1][coluna] && tabuleiro[1][coluna]===tabuleiro[2][coluna]) {
      return finalizadorJogador(tabuleiro[coluna][0])
    }
    if (tabuleiro[0][0] !=='' && tabuleiro[0][0] ===tabuleiro[1][1] && tabuleiro[1][1]===tabuleiro[2][2]) {
      return finalizadorJogador(tabuleiro[0][0])
    }
    if (tabuleiro[0][2] !=='' && tabuleiro[0][2] ===tabuleiro[1][1] && tabuleiro[1][1]===tabuleiro[2][0]) {
      return finalizadorJogador(tabuleiro[0][2])
    }
    if ((jogadaRestante -1) === 0) {
      return finalizadorJogador('')
    }
    setJogadaRestante((jogadaRestante -1))
  }
  function finalizadorJogador(jogador) {
    setGanhador(jogador)
    setTela('ganhador')
  }
  
  switch (tela) {
    case 'menu':
    return  getTelaMenu();
      break;
    case 'jogo':
      return getTelaJogo();
      break;
    case 'ganhador':
      return getTelaGanhador();
      break;
    
  }
  
  function getTelaMenu() {
    return (
    <View style={styles.container}>
      <Text style={styles.textMenu}>JOGO DA VELHA</Text>
      <Text style={styles.textCriador}>Escolher o primeiro jogador</Text>
      <View style={styles.containerBox}>
        <TouchableOpacity onPress={() => inicioJogo('X')} style={styles.boxJogador}>
          <Text style={styles.jogadorx}>X</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => inicioJogo('O')} style={styles.boxJogador}>
          <Text style={styles.jogadoro}>O</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
      <Text style={styles.textRodape}>© 2022 Dev. Gelson de Oliveira Matias</Text>
    </View>
  );
  }

  function getTelaJogo() {
    return (
      <View style={styles.container}>
        <Text style={styles.textMenu}>JOGANDO A VELHA</Text>

        {
          tabuleiro.map((linha,numeroLinha) => {
            return(
              <View key={numeroLinha} style={styles.containerBox}>
                {
                  linha.map((coluna,numeroColuna) => {
                    return(
                      <TouchableOpacity onPress={()=> jogar(numeroLinha,numeroColuna)} disabled={coluna!==''}  key={numeroColuna} style={styles.boxJogador}>
                      <Text style={coluna==='X'?styles.jogadorx:styles.jogadoro}>{coluna}</Text>

                    </TouchableOpacity>
                    )
                  })
                }
              </View>
            )
          })
        }
         <TouchableOpacity onPress={() => setTela('menu')} >
            <Text style={styles.voltaMenu}>VOLTAR AO MENU ?</Text>
          </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    );
  }
  function getTelaGanhador() {
    return (
      <View style={styles.container}>
         <StatusBar style="auto" />
        <Text style={styles.textMenu}>RESULTADO DO JOGO</Text>
        <TouchableOpacity onPress={() => setTela('menu')} >
          {
            ganhador=== '' &&
            
              <Text style={styles.voltaMenu}>NENHU GANHADOR</Text>

          }
           {
            ganhador !=='' &&
            <>
              <Text style={styles.voltaMenu}>GANHADOR DO JOGO FOI </Text>
              <TouchableOpacity  disabled={true} style={styles.boxJogador}>
                  <Text style={ganhador==='X'?styles.jogadorx:styles.jogadoro}>{ganhador}</Text>
              </TouchableOpacity>
            </>
          }
            <Text style={styles.voltaMenu}>VOLTAR AO MENU ?</Text>
          </TouchableOpacity>
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34435c',
    alignItems: 'center',
   
    // justifyContent: 'center',
  },
  textMenu:{
    color:'#12afc4',
    fontSize:30, 
    marginTop:240,
    fontWeight: 'bold',
  },
  textCriador:{
    color:'#12afc4',
    fontSize:15,
    marginTop:10,
  },
  textRodape:{
    color:'#12afc4',
    fontSize:12,
    bottom: 0,
    marginTop:50,
  },
  boxJogador:{
    width:60,
    height:60,
    backgroundColor: '#176e8a',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent:'center',
    margin:8,
  },
  jogadorx:{
    color:'#fff',
    fontSize: 25,
    fontWeight: 'bold',
  },
  jogadoro:{
    color:'#4bff00',
    fontSize: 25,
    fontWeight: 'bold',
  },
  containerBox:{
    marginTop:20,
    flexDirection:'row'
  },
  voltaMenu:{
    color:'#12afc4',
    fontSize: 16,
    marginTop:50,
    // borderBottom: 'white 1px solid',
  }
});
