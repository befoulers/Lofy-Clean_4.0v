# Lofy-Clean_3.0v

### Clean Messages Discord

![](/temp/preview.png)

## Installation and Setup

### Prerequisites
- Node JS [(https://nodejs.org/en)](https://nodejs.org/en/download](https://nodejs.org/en/download))

1. Clone the Repository
   - `git clone <Repo name>`

2. Change into Project Directory
   - `cd Lofy-Clean_3.0v`

3. Install Dependencies
   - `start [1] Install`
   - `start [2] Start`

4. How to use
   - `Put your token in lofy.json`

# LofyClean Discord Bot

O LofyClean é um bot para Discord que permite limpar todas as mensagens de um determinado usuário em um canal quando uma reação personalizada é detectada. Ele usa a API HTTP do Discord para recuperar e excluir as mensagens automaticamente.

## Funcionalidades

- Limpa todas as mensagens de um usuário específico em um canal do Discord.
- Detecta automaticamente uma reação personalizada para iniciar o processo de limpeza.
- Lida com erros HTTP e rate-limits da API do Discord.
- Espalha a exclusão das mensagens ao longo do tempo para evitar bloqueios da API.

## Como usar

1. Clone ou faça download deste repositório em sua máquina local.
2. Certifique-se de ter o Node.js instalado em sua máquina.
3. Abra um terminal na pasta raiz do projeto.
4. Execute o comando `npm install` ou execute `install bat`para instalar as dependências necessárias.
5. Abra o arquivo `lofy.json` e preencha as informações necessárias, como o token de autenticação do seu bot Discord, a identificação do usuário a ser limpo e o nome da reação personalizada.
```ts
lofy.json = [
  "token": "",
  "Emoji": "👑"
];
```
6. Salve o arquivo `lofy.json`.
7. No terminal, execute o comando `node lofyclean.js` ou execute `start bat` para iniciar o bot.
8. O bot irá imprimir uma mensagem informando que está conectado à conta.
9. Agora, sempre que uma mensagem receber a reação personalizada especificada, o bot irá limpar todas as mensagens do usuário no canal correspondente.

## Observações

- Tenha cuidado ao usar este bot e certifique-se de que ele esteja em conformidade com as políticas do Discord.
- Certifique-se de proteger as informações sensíveis, como o token de autenticação, para evitar o acesso não autorizado.
- Este bot foi desenvolvido usando a biblioteca `discord.js-selfbot-v11`, que é uma versão modificada do discord.js para uso personalizado. Verifique a licença dessa biblioteca se você planeja usar este código em seu próprio projeto.

## Contribuição

Contribuições são bem-vindas! Se você tiver alguma ideia de melhoria ou encontrar algum problema, sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).






