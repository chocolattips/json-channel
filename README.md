Sort JSON with channel.

## install

```
npm install
```

## demo

```
npm run demo -- demo/demo-1.ts
```

## usage

### 1. import

```
import useJsonChannel from "json-channel"
```

### 2. add callbacks

```
const jsonChannel = useJsonChannel()
  .addOnChannel("hello", param => {})
  .addOnOtherMessage(param => {})
```

### 3. sort message

```
//call callback set in addOnChannel("hello")
jsonChannel.updateMessage(JSON.stringify({
  channel: "hello",
}))

//call callback addOnOtherMessage
jsonChannel.updateMessage("hello-world")
```

| function                               | description                            |
| -------------------------------------- | -------------------------------------- |
| addOnChannel/removeOnChannel           | add/remove channel callback            |
| addOnOtherMessage/removeOnOtherMessage | add/remove callback other than channel |
| updateMessage                          | sort message by channel                |
