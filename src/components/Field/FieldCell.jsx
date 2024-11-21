import styles from './FieldCell.module.css'

export default function FieldCell({ cell, onClick }) {

  return (
    <button className={styles.fieldCell + ' ' + (cell.active ? styles.checked : '')}
            onClick={onClick}>{ cell.route }</button>
  )
}
