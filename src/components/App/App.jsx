import { useEffect, useState } from 'react'

import Container from '../Container/Container'
import Counter from '../Counter/Counter'
import Field from '../Field/Field'
import Description from '../Description/Description'

import styles from './App.module.css'
import Message from '../Message/Message'
import Menu from '../Menu/Menu'
import Hamburger from '../Hamburger/Hamburger'
import SettingsMenu from '../Settings/SettingsMenu'
import Game from '../Game/Game'


export default function App() {
  // Анимрированный загрузчик
  const loader = (
    <div class={styles.loader}>
      <span></span>
    </div>
  )

  const [cells, setCells] = useState(Array())
  const [menuActive, setMenuActive] = useState(false)
  const [hamburgerActive, setHamburgerActive] = useState(false)
  const [settingsActive, setSettingsActive] = useState(false)
  const [gameActive, setGameActive] = useState(false)
  const [msg, setMsg] = useState({
    msg: 'Идет загрузка маршрутов...',
    msgBottom: loader
  })
  const [settings, setSettinngs] = useState({
    isCustomCoords: false,
    latitude: '',
    longitude: '',
  })

  const fetchData = async (position) => {
    let latitude, longitude
    if (settings.isCustomCoords) {
      latitude = settings.latitude
      longitude = settings.longitude
    } else {
      latitude = position.coords.latitude
      longitude = position.coords.longitude
    }

    let data = await fetch(
      "https://overpass-api.de/api/interpreter",
      {
        method: "POST",
        body: "data=" + encodeURIComponent(`
          [out:json][timeout: 90];
          node(around:150, ${latitude}, ${longitude})[highway=bus_stop];
          <;
          relation._(around:5)[type=route][route=bus];
          out tags;
        `)
      }
    )

    let json = await data.json()
    let routes = json.elements

    // Если не было найдено ни одного маршрута
    if (routes.length === 0) {
      data = await fetch(
        "https://overpass-api.de/api/interpreter",
        {
          method: "POST",
          body: "data=" + encodeURIComponent(`
            [out:json][timeout: 90];
            node(around:20, ${latitude}, ${longitude});
            <;
            relation._[type=route][route=bus];
            out tags;
          `)
        }
      )
  
      json = await data.json()
      routes = json.elements
    }
    
    // Если не было найдено ни одного маршрута (даже после второго запроса)
    if (routes.length === 0) {
      setMsg({
        msg: 'Вблизи вас не было обнаружено маршрутов',
        msgBottom: '｡ﾟ･（>﹏<）･ﾟ｡'
      })

      return
    }

    // Заполнение массива маршрутов. Если маршрутов меньше 25, то они дополняются теми же маршрутами, начиная с начала списка
    const routeList = []
    for (let i = 0; i < 25; i++) {
      routeList.push({
        route: routes[i % routes.length].tags.ref,
        active: false
      })
    }

    shuffleCells(routeList)
    setCells(routeList)
    setMsg({
      msg: '',
      msgBottom: ''
    })
  }

  function resetFields() {
    setCells(Array())
    setMsg({
      msg: 'Идет загрузка маршрутов...',
      msgBottom: loader
    })

    if ('geolocation' in navigator) {
      const options = {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0
      }

      function error(err) {
        console.warn(`error ${err.code}: ${err.message}`)

        setMsg({
          msg: 'Что-то пошло не так, попробуйте позже. Возможно у вас выключен GPS',
          msgBottom: "┐('～`;)┌"
        })
      }

      function success(position) {
        fetchData(position)
      }

      navigator.geolocation.getCurrentPosition(success, error, options)
    } else {
      setMsg({
        msg: 'У вас отключено разрешение на использование GPS',
        msgBottom: '(┛ಸ_ಸ)┛彡┻━┻ '
      })
    }
  }

  // Загрузка номеров автобусов при запуске приложения
  useEffect(() => {
    if (localStorage.getItem('settings')) {
      setSettinngs(JSON.parse(localStorage.getItem('settings')))
    }

    if (localStorage.getItem('fields') && localStorage.getItem('fields') != '[]') {
      setCells(JSON.parse(localStorage.getItem('fields')))
    } else {
      resetFields()
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('fields', JSON.stringify(cells))
  }, [cells])

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings))
  }, [settings])

  let score = 0
  if (cells.length) {
    score = calculateScore(cells)
  }

  function toggleMenu() {
    setHamburgerActive(!hamburgerActive)

    if (!settingsActive && !gameActive) {
      setMenuActive(!menuActive)
    }
    
    if (settingsActive) setSettingsActive(false)
    else if (gameActive) setGameActive(false)
  }

  function openSettings() {
    setMenuActive(false)
    setSettingsActive(true)
  }

  function openGame() {
    setMenuActive(false)
    setGameActive(true)
  }
  
  return (
    <>
      <header className={styles.header}>
        <Container>
          <div className={styles.headerInner}>
              <h1 className={styles.logo}>
                Лото<span className={styles.logoSpan}>Бус</span>
              </h1>
              <Hamburger active={hamburgerActive} onClick={toggleMenu} />
          </div>
        </Container>
      </header>
      <Menu active={menuActive}
            resetFields={resetFields}
            openSettings={openSettings}
            openGame={openGame} />
      <SettingsMenu active={settingsActive}
                    settngs={settings}
                    setSettings={setSettinngs} />
      <Game active={gameActive} />
      <main className={styles.main}>
        <Message msg={msg} hidden={(cells.length > 0)} />
        <Counter value={score} hidden={(cells.length == 0)} />
        <Field cells={cells} setCells={setCells} />
        <Description />
      </main>
    </>
  )

}

function calculateScore(fields) {
  const winnerLines = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21], 
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
    [0, 6, 12, 18, 24],
    [4, 8, 12, 16, 20]
  ]

  let score = 0

  for (let i = 0; i < winnerLines.length; i++) {
    const [a, b, c, d, e] = winnerLines[i]

    if (fields[a].active && fields[a].active === fields[b].active
      && fields[a].active === fields[c].active
      && fields[a].active === fields[d].active
      && fields[a].active === fields[e].active
    ) score++
  }

  return score
}

function shuffleCells(array) {
  array.sort(() => Math.random() - 0.5)
}
