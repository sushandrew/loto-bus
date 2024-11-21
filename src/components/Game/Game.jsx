import Container from "../Container/Container";

import styles from './Game.module.css'

export default function Game({ active }) {
  return (
    <div className={styles.gameMenu + ' ' + (active ? styles.active : '')}>
      <Container>
        <div className={styles.gameMenuInner}>
          In Development
        </div>
      </Container>
    </div>
  )
}
