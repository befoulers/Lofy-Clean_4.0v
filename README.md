# Lofy-Clean_4.0v

![](/temp/preview.png)

### Prerequisites
- Node JS [(https://nodejs.org/en)](https://nodejs.org/en/download)


# Lofy Clean 4.0v Discord

Lofy Clean is a Discord script (self-bot) that allows you to clean all messages from a specific user in a channel when a custom reaction is detected. It uses the Discord HTTP API to retrieve and delete messages automatically.

## Features

- Cleans all messages from a specific user in a Discord channel.
- Automatically detects a custom reaction to initiate the cleaning process.
- Handles Discord API HTTP errors and rate limits.
- Spreads message deletion over time to avoid API blocks.

## How to Use

1. Clone or download this repository to your local machine.
2. Make sure you have Node.js installed on your machine.
3. Open a terminal in the root folder of the project.
4. Run the command `npm install` or run `install.bat` to install the necessary dependencies.
5. Open the `lofy.json` file and fill in the required information such as your Discord bot's authentication token, the user ID to be cleaned, and the name of the custom reaction.
```ts
lofy.json = [
  "token": "",
  "Emoji": "👑"
];
```
6. Save the `lofy.json` file.
7. In the terminal, run the command `node lofyclean.js` or run `start.bat` to start the bot.
8. The bot will print a message indicating that it is connected to the account.
9. Now, whenever a message receives the specified custom reaction, the bot will clean all messages from the user in the corresponding channel.

## Notes

- Be cautious when using this bot and ensure that it complies with Discord's policies.
- Make sure to safeguard sensitive information such as the authentication token to prevent unauthorized access.
- This bot was developed using the `discord.js-selfbot-v11` library, which is a modified version of discord.js for personal use. Please check the license of that library if you plan to use this code in your own project.

## Contribution

Contributions are welcome! If you have any improvement ideas or encounter any issues, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](https://github.com/dougkalash/Lofy-Clean_4.0v/blob/main/LICENSE.txt).

# Lofy-Clean_4.0v (em Português)

![](/temp/preview.png)

### Pré-requisitos
- Node JS [(https://nodejs.org/en)](https://nodejs.org/en/download)


# Lofy Clean 4.0v Discord

O Lofy Clean é um script (self-bot) para o Discord que permite limpar todas as mensagens de um usuário específico em um canal quando uma reação personalizada é detectada. Ele utiliza a API HTTP do Discord para recuperar e excluir as mensagens automaticamente.

## Funcionalidades

- Limpa todas as mensagens de um usuário específico em um canal do Discord.
- Detecta automaticamente uma reação personalizada para iniciar o processo de limpeza.
- Trata erros HTTP e limites de taxa da API do Discord.
- Espalha a exclusão das mensagens ao longo do tempo para evitar bloqueios da API.

## Como usar

1. Clone ou baixe este repositório para sua máquina local.
2. Verifique se o Node.js está instalado em sua máquina.
3. Abra um terminal na pasta raiz do projeto.
4. Execute o comando `npm install` ou execute `install.bat` para instalar as dependências necessárias.
5. Abra o arquivo `lofy.json` e preencha as informações necessárias, como o token de autenticação do seu bot Discord, a identificação do usuário a ser limpo e o nome da reação personalizada.
```ts
lofy.json = [
  "token": "",
  "Emoji": "👑"
];
```
6. Salve o arquivo `lofy.json`.
7. No terminal, execute o comando `node lofyclean.js` ou execute `start.bat` para iniciar o bot.
8. O bot imprimirá uma mensagem informando que está conectado à conta.
9. Agora, sempre que uma mensagem receber a reação personalizada especificada, o bot irá limpar todas as mensagens do usuário no canal correspondente.

## Observações

- Tenha cuidado ao usar este bot e certifique-se de que ele esteja em conformidade com as políticas do Discord.
- Certifique-se de proteger as informações sensíveis, como o token de autenticação, para evitar acesso não autorizado.
- Este bot foi desenvolvido usando a biblioteca `discord.js-selfbot-v11`, que é uma versão modificada do discord.js para uso pessoal. Verifique a licença dessa biblioteca se você planeja utilizar este código em seu próprio projeto.

## Contribuição

Contribuições são bem-vindas! Se você tiver alguma ideia de melhoria ou encontrar algum problema, sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a [Licença MIT](https://github.com/dougkalash/Lofy-Clean_4.0v/blob/main/LICENSE.txt).
