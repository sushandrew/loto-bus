import { useState } from 'react'

import Container from '../Container/Container'
import Counter from '../Counter/Counter'
import Field from '../Field/Field'
import Description from '../Description/Description'

import styles from './App.module.css'

export default function App() {
  const [cells, setCells] = useState(Array())

  let score = 0
  if (cells.length) {
    score = calculateScore(cells)
  }
  
  return (
    <>
      <header className={styles.header}>
        <Container>
          <h1 className={styles.logo}>
            Лото<span className={styles.logoSpan}>Бус</span>
          </h1>
        </Container>
      </header>
      <main>
        <Counter value={score} />
        <Field cells={cells} setCells={setCells} />
        <Description />
      </main>
    </>
  )

}

function calculateScore(fields) {
  const winnerLines = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21], 
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
    [0, 6, 12, 18, 24],
    [4, 8, 12, 16, 20]
  ]

  let score = 0

  for (let i = 0; i < winnerLines.length; i++) {
    const [a, b, c, d, e] = winnerLines[i]

    if (fields[a].active && fields[a].active === fields[b].active
      && fields[a].active === fields[c].active
      && fields[a].active === fields[d].active
      && fields[a].active === fields[e].active
    ) score++
  }

  return score
}