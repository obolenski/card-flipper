import { Options } from '$fresh/plugins/twind.ts'
import * as colors from 'twind/colors'

export default {
  selfURL: import.meta.url,
  theme: { extend: { colors: { gray: colors.trueGray } } },
  plugins: {
    kbd: `border(solid 1 opacity-20 b-2) rounded 
    p-0.5 m-0.5
    text-[0.6rem] font-light align-middle
    bg(gray-900 opacity-20)`,
  },
} as Options
