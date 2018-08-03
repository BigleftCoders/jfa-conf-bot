import * as TelegramBot from "node-telegram-bot-api";

const token: string = "601481744:AAE95Z-s8x5mkNBLBlf6HM3ANrLhhb1Epbg";

const bot = new TelegramBot(token, { polling: true });

interface IUser {
  id: number;
  username: string;
}
const users: { [key: string]: IUser } = {};

bot.on("message", msg => {
  checkIfUserExistsAndAdd(msg);
  runGame(msg);
  handleReplyAndReputationChange(msg);
  deleteCombotNotificationDelayed(msg);
});

bot.on("polling_error", error => {
  console.log("====================================");
  console.log(error);
  console.log("====================================");
});

function handleReplyAndReputationChange(msg: TelegramBot.Message) {
  if (msg.reply_to_message && (msg.text === "+" || msg.text === "-")) {
    bot.deleteMessage(msg.chat.id, String(msg.message_id));
  }
}

function deleteCombotNotificationDelayed(msg: TelegramBot.Message) {
  if (msg.from.is_bot && msg.from.username) {
  }
}

async function runGame(msg: TelegramBot.Message) {
  if (msg.text === "/chmoharun@fishkar_bot") {
    const usersCount: number = Object.keys(users).length;
    const randomNumber = getRandomNumber(usersCount);

    const userKeys: string[] = Object.keys(users);
    const user: IUser = users[userKeys[randomNumber]];

    bot.sendMessage(msg.chat.id, `Чмо дня - @${user.username}`);
  }
}

function checkIfUserExistsAndAdd(msg: TelegramBot.Message) {
  const userId: number = msg.from.id;
  users[userId] = {
    id: userId,
    username: msg.from.username
  };
}

function getRandomNumber(max: number): number {
  return Math.floor(Math.random() * max);
}
