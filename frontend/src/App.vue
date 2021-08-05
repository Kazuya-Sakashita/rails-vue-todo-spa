<template>
  <div id="app">
    <h1>Todo App</h1>
    <form @submit.prevent>
      <input type="text" v-model="state.title">
      <button @click="handleCreateTodo">Add</button>
    </form>
    <p v-for="todo in state.todos" v-bind:key="todo.id">
      {{ todo.title }} <button @click="handleDeleteTodo(todo.id)">Delete</button>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue' // defineComponent関数（TypeScriptを取り入れる場合に必要）などを読み込む
import { getTodos, createTodo, deleteTodo } from './lib/api/todos' // APIを呼び出すための関数を読み込む
import { Todo } from './interfaces/index' // 型定義を読み込む

interface State {
  todos: Todo[]
  title: string
}

export default defineComponent({
  setup() {
    const state = reactive<State>({
      todos: [],
      title: ''
    })

    // Todo一覧を取得
    const handleGetTodos = async (): Promise<void> => {
      try {
        const res = await getTodos()

        if (res?.status === 200) {
          state.todos = res.data.todos // todos（配列）に結果を格納
        }
      } catch (err) {
        console.log(err)
      }
    }

    // Todoを新規作成
    const handleCreateTodo = async (): Promise<void> => {
      if (state.title === '') return // 入力が空だった場合は以降の処理を行わない

      // Todo型に沿ったデータを作成
      const data: Todo = {
        title: state.title
      }

      try {
        const res = await createTodo(data)

        if (res?.status === 200) {
          state.todos = [...state.todos, res.data.todo] // todos（配列）の最後尾にtodoを追加
        } else {
          console.log(res.data.message)
        }
      } catch (err) {
        console.log(err)
      }

      state.title = '' // 追加後はtitleを空にする（フォーム内がリセットされる）
    }

    // Todoを削除
    const handleDeleteTodo = async (id: number): Promise<void> => {
      if (id == null) return // idが無かった場合は以降の処理を行わない

      try {
        const res = await deleteTodo(id)

        if (res?.status === 200) {
          state.todos = state.todos.filter(todo => todo.id !== id) // idが一致しないもののみに絞り込む（要するにidが一致したものを削除する）
        } else {
          console.log(res.data.message)
        }
      } catch (err) {
        console.log(err)
      }
    }

    // Vueインスタンスがマウントされるたびに実行される関数
    onMounted(() => {
      handleGetTodos()
    })

    // template内で使用したいものをreturn
    return {
      state,
      handleCreateTodo,
      handleDeleteTodo
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>