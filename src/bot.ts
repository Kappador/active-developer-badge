import { Client, CommandInteraction } from "discord.js";
import { Command } from "./entities/Command";
import * as dotenv from "dotenv";
dotenv.config();

const Badge: Command = {
  name: "badge",
  description: "Makes you eligible for the badge",
  run: async (client: Client, interaction: CommandInteraction) => {
    await interaction.reply("Doing some work :O");
    const content =
      "Wow! You got the badge! [Get the Badge](https://discord.com/developers/active-developer)";
    await interaction.followUp({
      ephemeral: true,
      content,
    });
  },
};
const client = new Client({
  intents: [],
});
client.login(process.env.TOKEN);

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === Badge.name) {
    await Badge.run(client, interaction);
  }
});

client.on("ready", async () => {
    
  await client.application?.commands.set([Badge]);
  console.log("Open this link to add the bot to your server");
  console.log(
    `https://discord.com/api/oauth2/authorize?client_id=${client.user?.id}&scope=applications.commands%20bot`
  );
});
