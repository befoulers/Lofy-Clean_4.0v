const { Client } = require("discord.js-selfbot-v11");
const client = new Client();
const axios = require("axios");
const colors = require("colors");

const { token, Emoji } = require("./lofy.json");
process.on("unhandledRejection", (e) => console.error(e));
process.on("uncaughtException", (e) => console.error(e));
process.on("uncaughtRejection", (e) => console.error(e));
process.warn = () => {};

client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));

function printClear() {
  console.log(
    `\x1b[37m
     ██╗      ██████╗ ███████╗██╗   ██╗     ██████╗██╗     ███████╗ █████╗ ███╗   ██╗
     ██║     ██╔═══██╗██╔════╝╚██╗ ██╔╝    ██╔════╝██║     ██╔════╝██╔══██╗████╗  ██║
     ██║     ██║   ██║█████╗   ╚████╔╝     ██║     ██║     █████╗  ███████║██╔██╗ ██║
     ██║     ██║   ██║██╔══╝    ╚██╔╝      ██║     ██║     ██╔══╝  ██╔══██║██║╚██╗██║
     ███████╗╚██████╔╝██║        ██║       ╚██████╗███████╗███████╗██║  ██║██║ ╚████║
     ╚══════╝ ╚═════╝ ╚═╝        ╚═╝        ╚═════╝╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝
                                                                                 
     • ${client.user.tag} | reaja com: '${Emoji}' em qualquer chat. •
    `
  );
}

(async () => {
  try {
    console.clear();
    process.title = `Verificando token`;
    console.log(
      `\x1b[37m
      ███      ▄██████▄     ▄█   ▄█▄    ▄████████ ███▄▄▄▄   
      ▀█████████▄ ███    ███   ███ ▄███▀   ███    ███ ███▀▀▀██▄ 
         ▀███▀▀██ ███    ███   ███▐██▀     ███    █▀  ███   ███ 
          ███   ▀ ███    ███  ▄█████▀     ▄███▄▄▄     ███   ███ 
          ███     ███    ███ ▀▀█████▄    ▀▀███▀▀▀     ███   ███ 
          ███     ███    ███   ███▐██▄     ███    █▄  ███   ███ 
          ███     ███    ███   ███ ▀███▄   ███    ███ ███   ███ 
         ▄████▀    ▀██████▀    ███   ▀█▀   ██████████  ▀█   █▀  
                             ▀                                 
      `
    );

    await client.login(token);
    console.clear();
    process.title = `LofyClean | Conectado na conta: ${client.user.username}`;
    printClear();
  } catch (err) {
    console.error(`Erro ao logar: ${err.message}`.red);
    process.exit(1);
  }
})();

function clear(authToken, authorId, channelId) {
  const wait = async (ms) => new Promise((done) => setTimeout(done, ms));

  const headers = {
    Authorization: authToken,
  };

  let messageDeletedCount = 0;
  let baseWaitTime = 3500; // Tempo base
  let currentWaitTime = baseWaitTime;

  const recurse = async (before) => {
    let params = before ? `?before=${before}` : ``;

    try {
      const response = await axios.get(`https://discord.com/api/v9/channels/${channelId}/messages${params}`, { headers });

      if (response.status === 202) {
        const w = response.data.retry_after;
        console.log(
          ` ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`.white,
          `➔  Ops, canal não indexado, aguarde ${w} ms para indexar as mensagens.`.red
        );
        await wait(w);
        return recurse(before);
      }

      if (response.status !== 200) {
        return console.log(
          `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`.white,
          `➔  Aguardando API!`
        );
      }

      for (let message of response.data) {
        if (message.author.id === authorId && message.type !== 3) {
          await new Promise((resolve) => {
            const deleteRecurse = async () => {
              try {
                const result = await axios.delete(`https://discord.com/api/v9/channels/${channelId}/messages/${message.id}`, { headers });

                if (result.data.retry_after) {
                  console.log(
                    `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`.white,
                    `➔  Rate-limited! Aguardando...`.red
                  );
                  currentWaitTime *= 2; // Dobrar o tempo de espera
                  await wait(result.data.retry_after); // Espera o tempo definido pela API
                  return deleteRecurse(); // Tenta deletar novamente
                }

                messageDeletedCount++;

                if (messageDeletedCount % 5 === 0) {
                  console.log(
                    `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`.white,
                    `➔  Deletadas ${messageDeletedCount} mensagens. Aguardando ${currentWaitTime}ms...`
                  );
                  await wait(currentWaitTime);
                }

                if (messageDeletedCount % 25 === 0) {
                  await wait(15000); // Aguardando um tempo fixo após 25 mensagens
                }

                resolve();
              } catch (error) {
                // Se a mensagem falhar ao deletar, aumente o tempo e tente novamente
                if (error.response && error.response.status === 429) {
                  console.log(
                    `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`.white,
                    `➔  Rate-limited! Aguardando...`.red
                  );
                  currentWaitTime *= 2; // Dobrar o tempo de espera
                  await wait(10000); // Aguardar um tempo fixo antes de tentar novamente
                  deleteRecurse(); // Tenta deletar novamente
                } else {
                  console.error(`Erro ao deletar mensagem: ${error.message}`.red);
                  resolve();
                }
              }
            };

            deleteRecurse();
          });
        }
      }

      if (response.data.length === 0) {
        console.clear();
        printClear();
        console.log(
          `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`.white,
          `➔  Canal Limpo!`,
          `Total de mensagens deletadas: ${messageDeletedCount}`.green
        );
      } else {
        recurse(response.data[response.data.length - 1].id);
      }
    } catch (error) {
      console.error(`Erro ao buscar mensagens: ${error.message}`.red);
    }
  };

  recurse();
}

client.on("raw", async (packet) => {
  if (packet.t === "MESSAGE_REACTION_ADD") {
    if (packet.d.emoji.name == `${Emoji}`) {
      if (packet.d.user_id === client.user.id) {
        clear(token, client.user.id, packet.d.channel_id);
        console.log(
          `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`.white,
          `➔  Gatilho Detectado - Iniciando o processo de limpeza....`.green
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
