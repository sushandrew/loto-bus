import Container from '../Container/Container'

import styles from './Description.module.css'

export default function Description() {
  return (
    <div className={styles.description}>
      <Container>
        <div className={styles.descriptionInner}>
          <h2>Описание игры:</h2>
          <p>ЛотоБус - это игра, придуманная, чтобы скрасить ожидание автобуса на вашей остановке</p>
          <ul>
            <li>Отмечайте номера не подходящих вам автобусов, как только они приедут</li>
            <li>Собирайте столбцы, строки и диагонали</li>
            <li>Получайте очки</li>
            <li>Делитесь своим результатом с друзьями (In Development)</li>
          </ul>
        </div>
      </Container>
    </div>
  )
}
