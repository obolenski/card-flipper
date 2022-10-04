import { Options } from '$fresh/plugins/twind.ts'
import * as colors from 'twind/colors'
import { css } from 'twind/css'

export default {
  selfURL: import.meta.url,
  darkMode: 'class',
  theme: { extend: { colors: { gray: colors.trueGray } } },
  plugins: {
    kbd: `dark:border(solid 1 gray-200 opacity-20 b-2)
    border(solid 1 gray-900 opacity-20 b-2)
    rounded 
    p-0.5 m-0.5
    text-[0.6rem] font-light align-middle
    dark:bg(gray-900 opacity-20)`,
    'glow-yellow': css`
      box-shadow: 0 0 8px 1px rgba(253, 230, 138, 0.5);
    `,
    'btn-nobg': `mx-3
    cursor-pointer
    hover:(dark:(text-gray-200 text-opacity-70) text-gray-800 text-opacity-80)
    active:(dark:(text-gray-200 bg-opacity-80) text-gray-700 text-opacity-80)
    transition-all duration-300`,
  },
} as Options
