import { Options } from '$fresh/plugins/twind.ts'
import * as colors from 'twind/colors'
import { css } from 'twind/css'

export default {
  selfURL: import.meta.url,
  theme: { extend: { colors: { gray: colors.trueGray } } },
  plugins: {
    kbd: `border(solid 1 gray-200 opacity-20 b-2) rounded 
    p-0.5 m-0.5
    text-[0.6rem] font-light align-middle
    bg(gray-900 opacity-20)`,
    'glow-yellow': css`
      box-shadow: 0 0 8px 1px rgba(253, 230, 138, 0.5);
    `,
  },
} as Options
