import Send from './Send.js'

export const getMembers = (params,pages) => {
  return Send({
    method: 'get',
    params: params,
    url: `/namelist/search/${pages}`,
  })
}

export const AddMember = (data) => {
  return Send({
    method: 'post',
    url: `/namelist/register`,
    data: data
  })
}

export const patchMember = (data) => {
  return Send({
    method: 'patch',
    url: '/namelist/update',
    data: data
  })
}

export const deleteMember = (params) => {
  return Send({
    method: 'delete',
    params: params,
    url: `/namelist/delete`,
  })
}