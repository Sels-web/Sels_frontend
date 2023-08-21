// @ts-ignore
import Send from './Send.js'

export const getMember = () => {
  return Send({
    method: 'get',
    url: `/namelist/all`,
  })
}
