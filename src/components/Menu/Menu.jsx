import Container from "../Container/Container"
import GameBtn from "../Game/GameBtn"
import ResetBtn from "../ResetBtn/ResetBtn"
import SettingsBtn from "../Settings/SettingsBtn"

import styles from './Menu.module.css'

export default function Menu({ active, resetFields, openSettings, openGame }) {
  return (
    <div className={styles.menu + ' ' + (active ? styles.active : '')}>
        <Container>
          <div className={styles.menuInner}>
            <ResetBtn onClick={resetFields} />
            <GameBtn onClick={openGame} />
            <SettingsBtn onClick={openSettings} />
          </div>
        </Container>
      </div>
  )
}
