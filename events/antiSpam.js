const client = require('../index')
const usersMap = new Map();
const LIMIT = 5;
const TIME = 300000;
const DIFF = 2000;

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  const owners = [
    '636598760616624128'
  ]
  if (owners.includes(message.author.id)) return;
  //if (hax.includes(message.channel.id)) return;
  if (usersMap.has(message.author.id)) {
    const userData = usersMap.get(message.author.id);
    const {
      lastMessage,
      timer
    } = userData;
    const difference = message.createdTimestamp - lastMessage.createdTimestamp;
    let msgCount = userData.msgCount;
    console.log(difference);

    if (difference > DIFF) {
      clearTimeout(timer);
      console.log('Cleared Timeout');
      userData.msgCount = 1;
      userData.lastMessage = message;
      userData.timer = setTimeout(() => {
        usersMap.delete(message.author.id);
        console.log('Removed from map.')
      }, TIME);
      usersMap.set(message.author.id, userData)
    } else {
      ++msgCount;
      if (parseInt(msgCount) === LIMIT) {
        await message.member.timeout(TIME, `Posting scam links`)
        message.author.send({
          content: `${message.author} You have been muted for spamming. You will be unmuted after 5 minutes.`
        });
        
      } else {
        userData.msgCount = msgCount;
        usersMap.set(message.author.id, userData);
      }
    }
  } else {
    let fn = setTimeout(() => {
      usersMap.delete(message.author.id);
      console.log('Removed from map.')
    }, TIME);
    usersMap.set(message.author.id, {
      msgCount: 1,
      lastMessage: message,
      timer: fn
    });
  }
})
