import styles from './GameBtn.module.css'

import GameSvg from './game.svg?react'

export default function GameBtn({ onClick }) {
  return (
    <button className={styles.gameBtn} onClick={onClick}>
      <GameSvg className={styles.gameSvg} />
    </button>
  )
}
