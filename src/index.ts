export type OnChannelType<T> = (param: IChannelParam<T>) => void;
export type OnOtherMessageType = (param: IOtherMessageParam) => void;

export interface IChannelParam<T> {
  json: T;
  channelName: string;
}

export interface IOtherMessageParam {
  message: string;
}

export function useDefaultState() {
  return {
    channelHandlers: {} as { [key: string]: OnChannelType<any>[] },
    messageHandlers: [] as OnOtherMessageType[],
  };
}
export type StateType = ReturnType<typeof useDefaultState>;

type DefaultType = ReturnType<typeof _default>;

export default function _default(
  state: StateType,
  channelKey: string = "channel"
) {
  const _state = state || useDefaultState();

  const self = {
    updateMessage,
    addOnChannel,
    addOnOtherMessage,
    removeOnChannel,
    removeOnOtherMessage,
  };

  function updateMessage(message: string) {
    if (!message) {
      _callMessageHandlers(message);
      return;
    }

    try {
      const json = JSON.parse(message);
      const channelName = json[channelKey];
      if (!channelName) {
        _callMessageHandlers(message);
        return;
      }
      const ls = _state.channelHandlers[channelName];
      if (!ls) {
        _callMessageHandlers(message);
        return;
      }

      const param = {
        json,
        channelName,
      };
      ls.forEach((h) => h(param));
    } catch {
      _callMessageHandlers(message);
    }
  }

  function _callMessageHandlers(message: string) {
    const param = { message };
    _state.messageHandlers.forEach((h) => h(param));
  }

  function addOnChannel<T>(
    channelName: string,
    handler: OnChannelType<T>
  ): DefaultType {
    let ls = _state.channelHandlers[channelName];
    if (!ls) {
      ls = _state.channelHandlers[channelName] = [];
    }
    ls.push(handler);
    return self;
  }

  function addOnOtherMessage(handler: OnOtherMessageType): DefaultType {
    _state.messageHandlers.push(handler);
    return self;
  }

  function removeOnChannel(
    channelName: string,
    handler: OnChannelType<any>
  ): DefaultType {
    _removeOn(_state.channelHandlers[channelName], handler);
    return self;
  }

  function removeOnOtherMessage(handler: OnOtherMessageType): DefaultType {
    _removeOn(_state.messageHandlers, handler);
    return self;
  }

  function _removeOn(ls: any[], handler: any) {
    if (!ls) {
      return;
    }
    const index = ls.findIndex((h) => h == handler);
    if (index != -1) {
      ls.splice(index, 1);
    }
  }

  return self;
}
