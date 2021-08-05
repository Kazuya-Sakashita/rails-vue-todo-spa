import { AxiosPromise } from 'axios'
import client from './client'
import { Todo } from '../../interfaces/index'

// getTodosを実行した際のレスポンスデータの型
interface GetTodosResponse {
  status: number
  todos: Todo[]
  message: string
}

// createTodoを実行した際のレスポンスデータの型
interface CreateTodoResponse {
  status: number
  todo: Todo
  message: string
}

// deleteTodoを実行した際のレスポンスデータの型
interface DeleteTodoResponse {
  status: number
  todo: Todo
  message: string
}

// Todo一覧を取得
export const getTodos = (): AxiosPromise<GetTodosResponse> => {
  return client.get('/todos')
}

// Todoを新規作成
export const createTodo = (data: Todo): AxiosPromise<CreateTodoResponse> => {
  return client.post('/todos', data)
}

// Todoを削除
export const deleteTodo = (id: number): AxiosPromise<DeleteTodoResponse> => {
  return client.delete(`/todos/${id}`)
}