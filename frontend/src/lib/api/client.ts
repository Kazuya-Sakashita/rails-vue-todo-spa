import axios from 'axios'

// axiosのインスタンスを作成
const client = axios.create({
  baseURL: 'http://localhost:3000/api/v1' // Rails側のAPIエンドポイント
})

export default client