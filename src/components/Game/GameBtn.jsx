import styles from './GameBtn.module.css'

import gameSvg from './games.svg'


export default function GameBtn({ onClick }) {
  return (
    <button className={styles.gameBtn} onClick={onClick}>
      <img src={gameSvg} alt="" />
    </button>
  )
}
