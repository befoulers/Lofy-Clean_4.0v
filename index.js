const { Client } = require("discord.js-selfbot-v11");
const client = new Client();
const request = require("request");
const colors = require("colors");

const { token, Emoji } = require("./lofy.json");
process.on("unhandledRejection", (e) => {});
process.on("uncaughtException", (e) => {});
process.on("uncaughtRejection", (e) => {});
process.warn = () => {};

client.on("error", () => {});
client.on("warn", () => {});

function printClear() {
  console.log(
    `

     ██╗      ██████╗ ███████╗██╗   ██╗     ██████╗██╗     ███████╗ █████╗ ███╗   ██╗
     ██║     ██╔═══██╗██╔════╝╚██╗ ██╔╝    ██╔════╝██║     ██╔════╝██╔══██╗████╗  ██║
     ██║     ██║   ██║█████╗   ╚████╔╝     ██║     ██║     █████╗  ███████║██╔██╗ ██║
     ██║     ██║   ██║██╔══╝    ╚██╔╝      ██║     ██║     ██╔══╝  ██╔══██║██║╚██╗██║
     ███████╗╚██████╔╝██║        ██║       ╚██████╗███████╗███████╗██║  ██║██║ ╚████║
     ╚══════╝ ╚═════╝ ╚═╝        ╚═╝        ╚═════╝╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝
                                                                                
     • ${client.user.tag} | reaja com: '${Emoji}' em qualquer chat. •
    `.white
  );
}

console.clear();
process.title = `
Verificando token
`;
console.log(
  `


  ███      ▄██████▄     ▄█   ▄█▄    ▄████████ ███▄▄▄▄   
  ▀█████████▄ ███    ███   ███ ▄███▀   ███    ███ ███▀▀▀██▄ 
     ▀███▀▀██ ███    ███   ███▐██▀     ███    █▀  ███   ███ 
      ███   ▀ ███    ███  ▄█████▀     ▄███▄▄▄     ███   ███ 
      ███     ███    ███ ▀▀█████▄    ▀▀███▀▀▀     ███   ███ 
      ███     ███    ███   ███▐██▄     ███    █▄  ███   ███ 
      ███     ███    ███   ███ ▀███▄   ███    ███ ███   ███ 
     ▄████▀    ▀██████▀    ███   ▀█▀   ██████████  ▀█   █▀  
                           ▀                                
  
                                                                                                                                
`.cyan
);

function clear(authToken, authorId, channelId) {
  const wait = async (ms) => new Promise((done) => setTimeout(done, ms));

  const headers = {
    Authorization: authToken,
  };

  let messageDeletedCount = 0; // Variável para contagem de mensagens deletadas

  const recurse = (before) => {
    let params = before ? `?before=${before}` : ``;

    request(
      {
        url: `https://discord.com/api/v9/channels/${channelId}/messages${params}`,
        headers: headers,
        json: true,
      },
      async (error, response, result) => {
        if (response === undefined) {
          return recurse(before);
        }

        if (response.statusCode === 202) {
          const w = response.retry_after;

          console.log(
            ` ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`.white, `➔  Ops, canal não indexado, aguarde ${w} ms para indexar as mensagens.`
              .red
          );

          await wait(w);

          return recurse(before);
        }

        if (response.statusCode !== 200) {
          return console.log(
            `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`.white, `➔  Aguardando API!`
              .red,
            result
          );
        }

        for (let i in result) {
          let message = result[i];

          if (message.author.id === authorId && message.type !== 3) {
            await new Promise((resolve) => {
              const deleteRecurse = () => {
                request.delete(
                  {
                    url: `https://discord.com/api/v9/channels/${channelId}/messages/${message.id}`,
                    headers: headers,
                    json: true,
                  },
                  async (error, response, result) => {
                    if (error) {
                      return deleteRecurse();
                    }
                    if (result) {
                      if (result.retry_after !== undefined) {
                        console.log(
                          `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`.white, `➔  Rate-limited! Espere ${
                            result.retry_after
                          } ms para continuar a limpeza.`.red
                        );
                        //console.log(result.retry_after);
                        await wait(2600 * 8 + result.retry_after / 3000);
                        return deleteRecurse();
                      }
                    }

                    // Incrementa o contador de mensagens deletadas
                    messageDeletedCount++;

                    // Verifica se já foram deletadas 5 mensagens
                    const moduloCinco = messageDeletedCount % 5;
                    if (moduloCinco === 0) {
                      console.log(
                        `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`.white, `➔  Deletadas ${messageDeletedCount} mensagens. Aguardando 3500ms...`
                          .green
                      );
                      await wait(3500); // Espera 3500ms antes de continuar a deleção
                    }

                    
                    // Verifica se já foram deletadas 25 mensagens
                    const moduloVinteECinco = messageDeletedCount % 25;
                    //console.log({moduloVinteECinco, messageDeletedCount})
                    if (moduloVinteECinco === 0) {
                      /*
                      console.log(
                        `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()} ➔  Deletadas ${messageDeletedCount} mensagens. Aguardando 5seg...`
                          .green
                      );
                      */
                      await wait(15000); // Espera 15 segundos antes de continuar a deleção
                    }

                    resolve();
                  }
                );
              };

              deleteRecurse();
            });
          }
        }

        if (result.length === 0) {
          console.clear();
          printClear();

          console.log(
            `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`.white, `➔  Canal Limpo!`
              .green,
            `Total de mensagens deletadas: ${messageDeletedCount}`.green // Exibe o total de mensagens deletadas
          );
        } else {
          recurse(result[result.length - 1].id);
        }
      }
    );
  };

  recurse();
}

client.on("ready", async () => {
  console.clear();
  process.title = `LofyClean | Conectado na conta: ${client.user.username}`;
  printClear();
});

client.on("raw", async (packet) => {
  if (packet.t === "MESSAGE_REACTION_ADD") {
    if (packet.d.emoji.name == `${Emoji}`) {
      if (packet.d.user_id === client.user.id) {
        clear(token, client.user.id, packet.d.channel_id); // Limpa o canal da mensagem
        console.log(
          `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`.white, `➔  Gatilho Detectado - Iniciando o processo de limpeza....`
            .green
        );
      }
    }
  }
});

client.on("warn", () => {});
client.on("error", () => {});

client.login(token).catch((err) => {
  console.log(`     > Um token invalido foi usado`.red);
  console.log(`     > Motivo Real:  ${err}`.red);
});
