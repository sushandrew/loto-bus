import Container from "../Container/Container";

import styles from './Message.module.css'

export default function Message({ msg, hidden }) {
  return (
    <div className={styles.msg + ' ' + (hidden ? styles.hidden : '')}>
      <Container>
        <div className={styles.msgText}>{msg.msg}</div>
        <div className={styles.msgBottom}>{msg.msgBottom}</div>
      </Container>
    </div>
  )
}
