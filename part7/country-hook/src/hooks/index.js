import axios from 'axios'
import { useEffect, useState } from 'react'

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    const getCountry = async () => {
      const url = `https://restcountries.eu/rest/v2/name/${name}?fullText=true`
      try {
        const response = await axios.get(url)
        setCountry({ found: true, data: response.data[0] })
      } catch (error) {
        console.log(error)
        setCountry({ found: false, data: null })
      }
    }

    getCountry()
  }, [name])

  return country
}

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}
