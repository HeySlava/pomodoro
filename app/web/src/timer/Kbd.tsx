import { CSSProperties, FC } from "react";
import { TCommonKey, TSpecialKey } from "./shortcuts";

type TProps = {
  keyText: TSpecialKey | Omit<TCommonKey, "with">;
};

export const Kbd: FC<TProps> = ({ keyText }) => {
  const isSpecialKey = typeof keyText === "string";

  const letterStyle: CSSProperties = {
    position: "absolute",
  };

  return (
    <div
      style={{
        width: !isSpecialKey ? "2em" : "auto",
        height: !isSpecialKey ? "2em" : "auto",
        padding: isSpecialKey ? ".35em .7em" : "0",
        textTransform: "uppercase",
        backgroundColor: "#F0EEEE",
        border: "1px solid #000000",
        borderRadius: ".3em",
        fontSize: isSpecialKey ? ".75em" : "1em",
        position: isSpecialKey ? "static" : "relative",
      }}
    >
      {isSpecialKey ? (
        keyText
      ) : (
        <>
          <div
            style={{
              ...letterStyle,
              top: ".25em",
              left: ".35em",
              fontSize: ".8em",
            }}
          >
            {keyText.eng}
          </div>
          <div
            style={{
              ...letterStyle,
              bottom: ".2em",
              right: ".4em",
              fontSize: ".68em",
            }}
          >
            {keyText.rus}
          </div>
        </>
      )}
    </div>
  );
};
