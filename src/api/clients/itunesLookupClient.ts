import axios from 'axios'

const itunesLookupClient = axios.create({
  baseURL: import.meta.env.VITE_ITUNES_LOOKUP_URL,
  timeout: 7000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default itunesLookupClient 