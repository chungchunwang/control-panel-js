import { createSignal, onCleanup } from "solid-js";
import logo from "./logo.svg";
import Server from "./Server";
import styles from "./ValueDisplay.module.css";
import DataBox from "./DataBox";
import DataTypes from "./DataTypes";

function ValueDisplay(props) {
  //create signal
  let [value, setValue] = createSignal("");
  
  let processID = Server.register(
    props.channel,
    props.address,
    props.interval,
    props.dataType,
    setValue
  );
  onCleanup(() => {
    Server.deregister(processID);
  });
  return (
    <DataBox title={props.title}>
      <div class={styles.ValueDisplay}>{value()}</div>
    </DataBox>
  );
}

export default ValueDisplay;
