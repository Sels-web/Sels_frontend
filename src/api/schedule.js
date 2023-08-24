import Send from './Send.js'

export const getSchedules = (params) => {
  return Send({
    method: 'get',
    params: params,
    url: `/calendar/search`,
  })
}

export const addSchedule = (data) => {
  return Send({
    method: 'post',
    url: `/calendar/register`,
    data: data
  })
}