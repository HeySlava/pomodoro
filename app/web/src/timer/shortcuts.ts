export type TSpecialKey = string;
export type TCommonKey = {
  with?: string;
  rus: string;
  eng: string;
};

export type TKbd = TSpecialKey | TCommonKey;

type TShortcut = {
  keys: string[];
  function:
    | "newSession"
    | "toggle"
    | "nextStep"
    | "stopSession"
    | "previousSession";
  kbd: TKbd[];
};

export const shortcuts: TShortcut[] = [
  {
    keys: ["N", "Т"],
    function: "newSession",
    kbd: [
      {
        with: "shift",
        rus: "т",
        eng: "n",
      },
    ],
  },
  {
    keys: ["t", "е", " "],
    function: "toggle",
    kbd: [{ rus: "е", eng: "t" }, "space"],
  },
  {
    keys: ["n", "т"],
    function: "nextStep",
    kbd: [
      {
        rus: "т",
        eng: "n",
      },
    ],
  },
  {
    keys: ["D", "B"],
    function: "stopSession",
    kbd: [{ with: "shift", rus: "в", eng: "d" }],
  },
  {
    keys: ["m", "ь"],
    function: "previousSession",
    kbd: [{ rus: "ь", eng: "m" }],
  },
];
