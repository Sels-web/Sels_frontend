import Send from "./Send";

export const addAttendance = (data) => {
  return Send({
    method: 'post',
    url: `/calendar-namelist/register`,
    data: data
  })
}

export const getAttendance = (params ,eventId, page) => {
  return Send({
    method: 'get',
    url: `/calendar-namelist/search/${eventId}/${page}`,
    params: params,
  })
}

export const modifyAttendance = (data) =>{
  return Send({
    method: 'patch',
    url: `/calendar-namelist`,
    data: data,
  })
}

export const deleteAttendance = (params) => {
  return Send({
    method: 'delete',
    url: '/calendar-namelist/',
    params: params,
  })
}

export const attend = (data) => {
  return Send({
    method: 'post',
    url: '/attendance',
    data: data,
  })
}