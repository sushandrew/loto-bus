import React, { useEffect, useState } from 'react'

import FieldCell from './FieldCell'
import Container from '../Container/Container'

import styles from './Field.module.css'
import Counter from '../Counter/Counter'

export default function Field({ cells, setCells}) {
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
    </>
  )
}
