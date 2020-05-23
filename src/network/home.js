import instance from './request'

export function getMenuList() {
  return instance({
    url: '/menus',
    method: 'GET'
  })
}
