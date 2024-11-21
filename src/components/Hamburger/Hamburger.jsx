import styles from './Hamburger.module.css'

export default function Hamburger({ active, onClick }) {
  return (
    <button className={styles.hamburger + ' ' + (active ? styles.active : '')}
            onClick={onClick}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </button>
  )
}
