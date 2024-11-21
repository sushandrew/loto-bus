import Container from '../Container/Container'
import styles from './SettingsMenu.module.css'

export default function SettingsMenu({ active, settngs, setSettings }) {

  function changeIsCustomCoords(event) {
    const newSettings = {
      isCustomCoords: event.target.checked,
      lattitude: settngs.lattitude,
      longitude: settngs.longitude
    }

    setSettings(newSettings)
  }

  function changeLattitude(event) {
    const newSettings = {
      isCustomCoords: settngs.isCustomCoords,
      lattitude: event.target.value,
      longitude: settngs.longitude
    }

    setSettings(newSettings)
  }

  function changeLongitude(event) {
    const newSettings = {
      isCustomCoords: settngs.isCustomCoords,
      lattitude: settngs.lattitude,
      longitude: event.target.value
    }

    setSettings(newSettings)
  }

  function secretFunction() {
    const newSettings = {
      isCustomCoords: true,
      lattitude: 51.6752768,
      longitude: 39.2116777
    }

    setSettings(newSettings)
  }

  return (
    <div className={styles.settingsMenu + " " + (active ? styles.active : "")}>
      <Container>
        <div className={styles.settingsMenuInner}>
          <label htmlFor='customCoords' className={styles.checkboxLabel}>
            <input type="checkbox"
                    className={styles.checkbox}
                    id='customCoords'
                    checked={settngs.isCustomCoords}
                    onChange={changeIsCustomCoords} />
            <span className={styles.customCheckbox}></span>
            Использовать кастомные координаты
          </label>
          <div className={styles.inputWrapper}>
            <input type="text"
                    className={styles.input}
                    placeholder='Широта'
                    value={settngs.lattitude}
                    onChange={changeLattitude} />
            <input type="text"
                    className={styles.input}
                    placeholder='Долгота'
                    value={settngs.longitude}
                    onChange={changeLongitude} />
            <button className={styles.button + ' ' + styles.buttonSecret} onClick={secretFunction}>Секретная кнопка</button>
          </div>
        </div>
      </Container>
    </div>
  )
}
