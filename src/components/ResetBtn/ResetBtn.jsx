import styles from './ResetBtn.module.css'

import ResetSvg from './reset.svg?react'

export default function ResetBtn({ onClick }) {
  return (
    <button className={styles.resetBtn} onClick={onClick}>
      <ResetSvg className={styles.resetSvg} />
    </button>
  )
}
