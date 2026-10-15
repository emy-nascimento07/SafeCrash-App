# Seja bem-vindo ao SafeCrash App👋

### Identificação: Grupo 7
* Emilly n° 08
* Lívia n° 17
* Ibide n° 23
* Vinicius n° 29

### 📌 Tema: Resiliência contra crashes, tratamento de exceções assíncronas e Erro Boundaries no React.
Estratégia essencial formada para evitar que um erro pontual derrube a interface inteira do usuário.

### O que faz a resiliência contra Crashes?
Essa fase do projeto é a prática de planejar a hierarquia de componentes para conter falhas. Isolando componentes para que caso haja falha em algum, os outros permaneçam funcionando sem problemas e/ou a criação de um botão para resetar o estado de erro.

### O que são Error Boundaries?
Eles são componentes criados para capturar erros ocorridos durante a renderização do JavaScript em qualquer parte do projeto, fazendo com que exiba uma interface alternativa (fallback) ao invés de aparecer uma tela em branco.

### E o tratamento de exceções assíncronas?
Eles servem para capturar erros que ocorrem fora do ciclo de renderização, ou seja, que os Error Boundaries não capturam. Usando blocos de código com try/catch ou um useState para armazenar a falha e exibir uma mensagem de aviso.


## Como a solução prática foi desenvolvida e como o problema de segurança/qualidade foi resolvido no código.
 A solução foi desenvolvida utilizando o ecossistema React, com foco em componentização reutilizável e gerenciamento eficiente de estados. Para resolver as grandes falhas que são comuns nos ambientes móveis, a arquitetura do aplicativo foi estruturada para interceptar exceções antes que elas afetassem o sistema operacional do dispositivo. O problema de segurança e de qualidade foram resolvidos durante a fase de testes, neste momento identificamos que os erros inesperados na renderização de componentes secundários (como falhas ao processar uma propriedade nula vinda de uma API) estavam quebrando toda a árvore de componentes da interface, o que provocava um fechamento repentino do aplicativo (crash) ou travamentos visuais. 

## Screenshots:
![print-project](image.png)
<img src="image.png" alt="Print do sistema" width="500">


## Manual de Execução:
1. #### Baixar o projeto para o computador: 
```bash
git clone https://github.com 
``` 
Copia os arquivos da intenet para o seu computador

2. #### Instalar as bibliotecas do aplicativo: 
```bash 
npm install
```
 Baixar todos os pacotes necessários para o app rodar, tipo o Expo e o react-error-boundary

3. #### Rodar o aplicativo: 
```bash
npx expo start --lan 
```
Liga o servidor do app e gera o QR Code, este código trabalha com a Rede Local, ou seja, o computador e o celular estão no mesmo Wi-fi.


