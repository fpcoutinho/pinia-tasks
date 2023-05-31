import { defineStore } from 'pinia'

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [],
    name: 'Pinia Tasks',
    loading: false,
  }),
  getters: {
    favs() {
      return this.tasks.filter((task) => task.isFav)
    },
    favCount() {
      return this.tasks.reduce((acc, task) => {
        return task.isFav ? acc + 1 : acc
      }, 0)
    },
    totalCount: (state) => state.tasks.length,
  },
  actions: {
    async getTasks() {
      this.loading = true

      const res = await fetch('http://localhost:3000/tasks')
      const data = await res.json()

      this.loading = false

      this.tasks = data
    },
    async addTask(title) {
      const task = { id: Date.now(), title, isFav: false }
      this.tasks.push(task)

      const res = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(task),
      })

      if (res.error) {
        console.log(res.error)
      }
    },
    async deleteTask(id) {
      this.tasks = this.tasks.filter((task) => task.id !== id)

      const res = await fetch('http://localhost:3000/tasks/' + id, {
        method: 'DELETE',
      })

      if (res.error) {
        console.log(res.error)
      }
    },
    async toggleFav(id) {
      const task = this.tasks.find((t) => t.id === id)
      task.isFav = !task.isFav

      const res = await fetch('http://localhost:3000/tasks/' + id, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ isFav: task.isFav }),
      })

      if (res.error) {
        console.log(res.error)
      }
    },
  },
})
