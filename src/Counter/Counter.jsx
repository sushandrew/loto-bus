import Container from '../Container/Container'

import styles from './Counter.module.css'

export default function Counter({ value }) {
  return (
    <Container>
      <div className={styles.counter}>Очки: {value}</div>
    </Container>
  )
}
