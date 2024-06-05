import logo from './logo.svg';
import styles from './DataBox.module.css';

function DataBox(props) {
  return (
    <div class={styles.DataBox}>
      <div class={styles.Header}>
        {props.title}
      </div>
       <div class={styles.Content}>{props.children}</div>
    </div>
  );
}

export default DataBox;
