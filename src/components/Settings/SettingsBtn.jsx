import styles from './SettingsBtn.module.css'

import settingsSvg from './settings.svg'

export default function SettingsBtn({ onClick }) {
  return (
    <button className={styles.settingsBtn} onClick={onClick}>
      <img src={settingsSvg} alt="Настройки" />
    </button>
  )
}
