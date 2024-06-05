import { Show, createEffect, createSignal, onCleanup } from "solid-js";
import logo from "./logo.svg";
import Server from "./Server";
import styles from "./InputDisplay.module.css";
import DataBox from "./DataBox";
import DataTypes, { is_numeric } from "./DataTypes";
import { Portal } from "solid-js/web";
import { is_decimal } from "./DataTypes";

function InputDisplay(props) {
    if (!is_numeric(props.dataType)) throw new Error("Data type must be numeric");
  //create signal
  let [value, setValue] = createSignal(false);

  let [modal, setModal] = createSignal(false);

  let [typedValue, setTypedValue] = createSignal("0");

  createEffect(() => {
    if(!is_decimal(props.dataType) && typedValue().includes(".")) setTypedValue("0");
    else if(typedValue() != "." && isNaN(typedValue())) setTypedValue("0");
    else if(parseFloat(typedValue()) < props.min) setTypedValue(props.min.toString());
    else if(parseFloat(typedValue()) > props.max) setTypedValue(props.max.toString());
  });

let clearTypedValue = () => {
    setTypedValue("0");
}

let negateTypedValue = () => {
    let newValue = typedValue();
    if (newValue[0] == "-") newValue = newValue.slice(1);
    else newValue = "-" + newValue;
    setTypedValue(newValue);
}

let addTypedDigit = (number) => {
    let newValue = typedValue() + "" + number;
    if (!isNaN(newValue)) {
        if (newValue[0] == "-") newValue = "-" + newValue.slice(1).replace(/^0+/, '0');
        else newValue = newValue.replace(/^0+/, '0')
        if (newValue == "") newValue = "0";
        setTypedValue(newValue);
    }
}
  let removeTypedDigit = () => {
    let newValue = typedValue().toString().slice(0, -1);
    if (newValue.length && !isNaN(newValue)) {
        setTypedValue(newValue);
    }
    else setTypedValue("0");
  }

  
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
      <div class={styles.InputDisplay}>
        <div>{value()}</div>
        <button onClick={() => setModal(true)}>Change</button>
        <Show when={modal()}>
            <Portal>
                <div class={styles.ModalContext}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div class={styles.InputModal}>
                    <div class={styles.InputTitle}>Editing: {props.title}</div>
                    <button class={styles.ExitButton} onClick={() => setModal(false)}>╳</button>
                    <div class={styles.ConstraintsInfoBox}>
                        <div>Min: {props.min}</div>
                        <div>Max: {props.max}</div>
                    </div>
                    <input class={styles.InputBox} type="text" value={typedValue()} onChange={(e) => setTypedValue(e.target.value)} />
                    <div class={styles.OnScreenKeyboard}>
                        <button onClick={() => addTypedDigit(1)}>1</button>
                        <button onClick={() => addTypedDigit(2)}>2</button>
                        <button onClick={() => addTypedDigit(3)}>3</button>
                        <button onClick={() => addTypedDigit(4)}>4</button>
                        <button onClick={() => addTypedDigit(5)}>5</button>
                        <button onClick={() => addTypedDigit(6)}>6</button>
                        <button onClick={() => addTypedDigit(7)}>7</button>
                        <button onClick={() => addTypedDigit(8)}>8</button>
                        <button onClick={() => addTypedDigit(9)}>9</button>
                        <button onClick={() => addTypedDigit(0)}>0</button>
                        <button disabled={!is_decimal(props.dataType)} onClick={() => addTypedDigit(".")}>.</button>
                        <button onClick={() => negateTypedValue()}>-</button>
                        <button onClick={() => clearTypedValue()}>C</button>
                        <button onClick={() => removeTypedDigit()}>⌫</button>
                        <button onClick={() => {
                            Server.update(props.channel, props.address, parseFloat(typedValue()), props.dataType);
                            setModal(false);
                        }}>↵</button>
                    </div>
                </div>
                <div class={styles.ModalBackground} onClick={()=>setModal(false)}></div>
                </div>
            </Portal>
        </Show>
      </div>
    </DataBox>
  );
}
export default InputDisplay;
