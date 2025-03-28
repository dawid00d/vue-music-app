import axios from 'axios'

const itunesRssClient = axios.create({
  baseURL: import.meta.env.VITE_ITUNES_RSS_URL,
  timeout: 7000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default itunesRssClient 