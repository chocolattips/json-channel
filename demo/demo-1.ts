import useJsonChannel from "../src";

const channel = useJsonChannel()
  .addOnChannel("apple", (param) => {
    console.log(`---- [${param.channelName}]`);
    console.log(param.json);
  })
  .addOnChannel("banana", (param) => {
    console.log(`---- [${param.channelName}]`);
    console.log(param.json);
  })
  .addOnOtherMessage((param) => {
    console.log(`---- [other message]`);
    console.log(param.message);
  });

const jsons = [
  {
    channel: "apple",
    hello: "world",
  },
  {
    hello: "world",
  },
  {
    channel: "banana",
    data: {
      price: 123,
    },
  },
];

for (const o of jsons) {
  channel.updateMessage(JSON.stringify(o));
}
