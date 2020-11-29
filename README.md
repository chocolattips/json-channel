Sort JSON with channel.

## demo

### setup
```
cd path/to/json-channel
npm install
```

### run
```
npm run demo -- demo/demo-1.ts
```

## usage

### 1. import

```
npm install path/to/json-channel
```

#### TypeScript
```ts
import useJsonChannel from "json-channel"
```

#### JavaScript
```js
const useJsonChannel = require("json-channel")
```

### 2. add callbacks

```ts
const jsonChannel = useJsonChannel()
  .addOnChannel("hello", param => {})
  .addOnOtherMessage(param => {})
```

### 3. sort message

```ts
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
