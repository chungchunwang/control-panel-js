import logo from "./logo.svg";
import styles from "./App.module.css";
import DataBox from "./DataBox";
import ValueDisplay from "./ValueDisplay";
import BooleanDisplay from "./BooleanDisplay";
import InputDisplay from "./InputDisplay";
import Server from "./Server";
import DataTypes from "./DataTypes";
import { Dynamic } from "solid-js/web";
import { For, Index, Match, Switch, createEffect, createSignal, onCleanup } from "solid-js";


function App() {
  // create an interval to update the value every two seconds
  setInterval(() => {
    Server.demoStateRandomizer();
    console.log(Server.processes.size);
  }, 100);
  let [pageNo, setPageNo] = createSignal(0);

  const page1 = () => <div>
  <ValueDisplay
  channel={0}
  address="device1"
  interval={100}
  title="some title"
  dataType={DataTypes.UINT32}
  />
  </div>;
  const page2 = () => <div>
  <BooleanDisplay
  channel={0}
  address="device3"
  interval={100}
  title="boolean"
  trueGraphic = {<svg height="100" width="100">
  <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="green" />
</svg>}
  falseGraphic = {<svg height="100" width="100">
  <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
</svg>}
  />
  <ValueDisplay
  channel={0}
  address="device1"
  interval={100}
  title="some title"
  dataType={DataTypes.UINT32}
  />
  <InputDisplay
  channel={0}
  address="device1"
  interval={100}
  title="some tidgdgtle"
  dataType={DataTypes.FLOAT}
  min={-1000}
  max={10000}
  />
  </div>;
  
  const pages = [page1, page2];

  return (
    <div class={styles.App}>
      <div class = {styles.TopBar}>Device Status</div>
      <div class = {styles.Page}>
        <Dynamic component={pages[pageNo()]}/>
      </div>
      <div class = {styles.BottomBar}>
        <Index each = {pages}>
          {(page, index) => (
            <button onClick = {() => setPageNo(index)}>Page {index}</button>
          )}
        </Index>
        </div>
    </div>
  );
}

export default App;
