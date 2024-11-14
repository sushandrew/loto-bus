import React, { useEffect, useState } from 'react'

import FieldCell from './FieldCell'
import Container from '../Container/Container'

import styles from './Field.module.css'

export default function Field({ cells, setCells }) {
  const [error, setError] = useState('Идет загрузка маршрутов...')

  // Загрузка номеров автобусов при запуске приложения
  useEffect(() => {
    const fetchData = async (position) => {
      const data = await fetch(
        "https://overpass-api.de/api/interpreter",
        {
          method: "POST",
          // TODO: После - заменить конкретные координаты на настоящие
          // Удобные координаты ${51.6752768}, ${39.2116777}
          // На что надо заменить ${position.coords.latitude}, ${position.coords.longitude}
          body: "data=" + encodeURIComponent(`
            [out:json][timeout: 90];
            node(around:20, ${51.6752768}, ${39.2116777});
            <;
            relation._[type=route][route=bus];
            out tags;
          `)
        }
      )

      const json = await data.json()
      
      const routes = json.elements
      
      // Если не было найдено ни одного маршрута
      if (routes.length === 0) {
        setError('Вблизи вас не было обнаружено маршрутов :(')

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
    }

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        fetchData(position)
      })
    }
    // fetchData()
  }, [])

  // Обработчик нажатия на ячейки
  function onFieldCellClick(i) {
    let newCells = cells.slice()
    newCells[i].active = !newCells[i].active
    setCells(newCells)
    
  }

  return (
    <>
      <div className={styles.field + ' ' + (cells.length === 0 ? styles.hidden : '')}>
        <Container>
          <div className={styles.fieldInner}>
            {cells.map((cell, index) => (
              <FieldCell key={index}
                        cell={cell}
                        onClick={() => onFieldCellClick(index)} />
            ))}
          </div>
        </Container>
      </div>
      <div className={styles.error + ' ' + (cells.length > 0 ? styles.hidden : '')}>{error}</div>
    </>
  )
}

function shuffleCells(array) {
  array.sort(() => Math.random() - 0.5)
}