import { Show, createSignal, onCleanup } from "solid-js";
import logo from "./logo.svg";
import Server from "./Server";
import styles from "./BooleanDisplay.module.css";
import DataBox from "./DataBox";
import DataTypes from "./DataTypes";

function BooleanDisplay(props) {
  //create signal
  let [value, setValue] = createSignal(false);
  
  let processID = Server.register(
    props.channel,
    props.address,
    props.interval,
    DataTypes.BOOLEAN,
    setValue
  );
  onCleanup(() => {
    Server.deregister(processID);
  });
  return (
    <DataBox title={props.title}>
      <div class={styles.BooleanDisplay}>
        <Show when={value()} fallback={props.falseGraphic}>
            {props.trueGraphic}
        </Show>
      </div>
    </DataBox>
  );
}
export default BooleanDisplay;
