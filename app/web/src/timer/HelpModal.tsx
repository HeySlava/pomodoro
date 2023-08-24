import { useInjection } from "inversify-react";
import { observer } from "mobx-react-lite";
import ReactModal from "react-modal";
import { Store } from "./Store";
import { shortcuts } from "./shortcuts";
import { Kbd } from "./Kbd";

const HelpModal = () => {
  const store = useInjection(Store);
  return (
    <ReactModal
      isOpen={store.isHelpModalOpen}
      onRequestClose={() => store.setIsHelpModalOpen(false)}
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
    >
      <div className="helpModal">
        <table
          border={3}
          style={{ borderCollapse: "collapse", margin: "0 auto" }}
        >
          <thead>
            <tr>
              <th style={{ padding: ".3em 2em" }}>Keys</th>
              <th style={{ padding: ".3em 2em" }}>Function</th>
            </tr>
          </thead>
          <tbody>
            {shortcuts.map((shortcut) => (
              <tr style={{ textAlign: "center" }}>
                <td style={{ padding: "1em" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: ".5em",
                    }}
                  >
                    {shortcut.kbd.map((key, idx) => {
                      if (typeof key === "string" || !key.with)
                        return (
                          <>
                            <Kbd keyText={key} />
                            {idx !== shortcut.kbd.length - 1 && <div>/</div>}
                          </>
                        );
                      return (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: ".3em",
                          }}
                        >
                          <Kbd keyText={key.with} />
                          <span>+</span>
                          <Kbd keyText={{ rus: key.rus, eng: key.eng }} />
                          {idx !== shortcut.kbd.length - 1 && <div>/</div>}
                        </div>
                      );
                    })}
                  </div>
                </td>
                <td style={{ padding: "1em" }}>{shortcut.function}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ReactModal>
  );
};

export default observer(HelpModal);
