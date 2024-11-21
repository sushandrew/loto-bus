import styles from './ResetBtn.module.css'

import resetSvg from './reset.svg'

export default function ResetBtn({ onClick }) {
  return (
    <button className={styles.resetBtn} onClick={onClick}>
      <img src={resetSvg} alt="Перезагрузка" />
    </button>
  )
}
