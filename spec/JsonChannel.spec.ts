import useJsonChannel, { useDefaultState, StateType } from "../src";

describe("JsonChannel", () => {
  describe("updateMessage", () => {
    let state: StateType;
    let channel: ReturnType<typeof useJsonChannel>;
    beforeEach(() => {
      state = useDefaultState();
      channel = useJsonChannel(state);
    });

    function dummy() {
      const channelName = "hello";
      const json = {
        channel: channelName,
        fruit: {
          name: "apple",
          price: 120,
        },
      };

      return {
        channelName,
        json,
        message: JSON.stringify(json),
      };
    }

    it("empty", (done) => {
      state.messageHandlers.push((param) => {
        try {
          expect(param.message).toEqual("");
        } catch (e) {
          done(e);
        }
        done();
      });
      channel.updateMessage("");
    });

    it("channel", (done) => {
      const o = dummy();

      channel.addOnChannel(o.channelName, (param) => {
        try {
          expect(param.json).toEqual(o.json);
        } catch (e) {
          done(e);
        }
        done();
      });
      channel.addOnOtherMessage((message) => {
        done("error");
      });
      channel.updateMessage(o.message);
    });

    it("other message", (done) => {
      const o = dummy();
      o.json.channel = "xxxx";
      const jsonString = JSON.stringify(o.json);

      channel.addOnChannel(o.channelName, (param) => {
        done("error");
      });
      channel.addOnOtherMessage((param) => {
        try {
          expect(param.message).toEqual(jsonString);
        } catch (e) {
          done(e);
        }
        done();
      });
      channel.updateMessage(jsonString);
    });
  });
});
