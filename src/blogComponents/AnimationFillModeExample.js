import React from 'react'
import './animation-fill-mode-example.css'

const WRAPPER_STYLES = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '1rem',
  borderRadius: '1rem',
  cursor: 'hover',
  margin: '1rem 0'
}

export default function AnimationFillModeExample(props) {
  const {
    delay = '.5s',
    duration = '1.5s',
    fillMode = 'none',
    innerText = 'Hover Me',
    direction = 'normal',
    iterations = 1
  } = props

  const styles = {
    animationDelay: delay,
    animationDuration: duration,
    animationFillMode: fillMode,
    animationDirection: direction,
    animationIterationCount: iterations
  }

  return <div style={{ ...WRAPPER_STYLES, ...styles }} class="animation-fill-mode-example">{innerText}</div>
}
