import styles from './SettingsBtn.module.css'

import SettingsSvg from './settings.svg?react'

export default function SettingsBtn({ onClick }) {
  return (
    <button className={styles.settingsBtn} onClick={onClick}>
      <SettingsSvg className={styles.settingsSvg} />
    </button>
  )
}
