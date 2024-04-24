import React, { useEffect, useRef } from 'react'
import { Calendar } from 'antd-mobile'

const min = new Date()
min.setDate(5)
const max = new Date()
max.setDate(20)

export default () => {
  useEffect(() => {

  }, [])
  return (
    <>
        <Calendar
          renderLabel={date => {
            // if (dayjs(date).isSame(today, 'day')) return '今天'
            if (date.getDay() === 0 || date.getDay() === 6) {
              return '周末'
            }
          }}
        />
    </>
  )
}