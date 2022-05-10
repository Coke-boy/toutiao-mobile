/**
 * 本地储存工具函数封装模块
 */

// 存
export const setItem = (name, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(name, value)
}

// 取
export const getItem = name => {
  const data = window.localStorage.getItem(name)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}

// 删
export const removeItem = name => {
  window.localStorage.removeItem(name)
}
