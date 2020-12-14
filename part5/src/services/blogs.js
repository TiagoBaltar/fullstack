import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = (newToken) => (token = `bearer ${newToken}`)

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const add = async (newObj) => {
  const config = {
    headers: { Authorization: token },
  }

  const res = await axios.post(baseUrl, newObj, config)
  return res.data
}

const update = async (id, updateItem) => {
  const response = await axios.put(`${baseUrl}/${id}`, updateItem)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const service = {
  getAll,
  add,
  setToken,
  update,
  remove,
}

export default service
