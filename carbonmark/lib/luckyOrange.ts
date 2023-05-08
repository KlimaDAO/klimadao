interface User {
  user: string;
  name: string;
}
interface LuckyOrange {
  events: {
    track: (text: string) => void;
  };
  visitor: {
    identify: (name: string, user: User) => void;
  };
  $internal: {
    ready: (type: string) => Promise<void>;
  };
}
type LOQArrayElement = string | ((LO: LuckyOrange) => void);
type LOQArray = Array<Array<LOQArrayElement>>;

//declare let LOQ: LOQArray;
const LO = {
  getLOQ() {
    (<any>globalThis).LOQ = (<any>globalThis).LOQ || [];
    return (<any>globalThis).LOQ as LOQArray;
  },
  track(text: string) {
    this.getLOQ().push([
      "ready",
      function (LO: LuckyOrange) {
        LO.$internal.ready("events").then(function () {
          console.log(`TRACK ${text}`);
          LO.events.track(text);
        });
      },
    ]);
  },
  identify(name: string, user: User) {
    this.getLOQ().push([
      "ready",
      function (LO: LuckyOrange) {
        LO.$internal.ready("visitor").then(function () {
          LO.visitor.identify(name, user);
          console.log("`IDENTIFY");
          console.log(user);
        });
      },
    ]);
  },
};

export { LO };
