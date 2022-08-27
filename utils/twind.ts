import { IS_BROWSER } from '$fresh/runtime.ts'
import { Configuration, setup } from 'twind'
import * as colors from 'twind/colors'
export * from 'twind'

export const config: Configuration = {
  darkMode: 'class',
  mode: 'silent',
  plugins: {
    perspective800: {
      perspective: '800px',
    },
    preserve3d: {
      'transform-style': 'preserve-3d',
    },
    'backface-visible': {
      'backface-visibility': 'visible',
    },
    'backface-hidden': {
      'backface-visibility': 'hidden',
    },
    'rotate-Y': {
      transform: 'rotateY(180deg)',
    },
    transition04: {
      transition: 'all 0.4s ease-in-out',
    },
  },
  theme: {
    extend: {
      colors,
    },
  },
}
if (IS_BROWSER) setup(config)
