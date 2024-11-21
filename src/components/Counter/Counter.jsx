import Container from '../Container/Container'

import styles from './Counter.module.css'

export default function Counter({ value, hidden }) {
  return (
    <Container>
      <div className={styles.counter + " " + (hidden ? styles.hidden : '')}>Очки: {value}</div>
    </Container>
  )
}
