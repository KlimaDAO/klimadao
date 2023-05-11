interface User {
  wallet: string;
  user: string | undefined;
  name: string | undefined;
}
interface LuckyOrange {
  events: {
    track: (text: string) => void;
  };
  visitor: {
    identify: (user: User) => void;
  };
  $internal: {
    ready: (type: string) => Promise<void>;
  };
}
type LOQArrayElement = string | ((LO: LuckyOrange) => void);
type LOQArray = Array<Array<LOQArrayElement>>;

const LO = {
  // FIXME remove this method
  log(value: any) {
    if (globalThis?.localStorage.getItem("debug") == "lo") {
      console.log(value);
    }
  },
  getLOQ() {
    (<any>globalThis).LOQ = (<any>globalThis).LOQ || [];
    return (<any>globalThis).LOQ as LOQArray;
  },
  track(text: string) {
    this.getLOQ().push([
      "ready",
      function (lucky: LuckyOrange) {
        lucky.$internal.ready("events").then(function () {
          // FIXME: remove logs
          LO.log(`TRACK ${text}`);
          lucky.events.track(text);
        });
      },
    ]);
  },
  identify(user: User) {
    this.getLOQ().push([
      "ready",
      function (lucky: LuckyOrange) {
        lucky.$internal.ready("visitor").then(function () {
          // FIXME: remove logs
          LO.log("IDENTIFY");
          LO.log(user);
          lucky.visitor.identify(user);
        });
      },
    ]);
  },
};

export { LO };
