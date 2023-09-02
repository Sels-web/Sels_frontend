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

export const deleteSchedule = (eventId) => {
  return Send({
    method: 'delete',
    url: `/calendar/${eventId}`
  })
}

export const modifySchedule = (data) => {
  return Send({
    method: 'patch',
    url: '/calendar',
    data: data
  })
}