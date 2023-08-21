// @ts-ignore
import Send from './Send.js'

export const AddMember = (data) => {
  return Send({
    method: 'post',
    url: `/namelist/register`,
    data: data
  })
}
