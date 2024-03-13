import { defineStore } from "pinia"

export const useTaskStore = defineStore('taskStore', {

    // inside this object we define things like states

    state: () => ({
        tasks: [],
        loading: false

    }),

    // getters are functions which basically returns new value based on the state.
    getters: {
        favs() {

            return this.tasks.filter(t => t.isFav);
        },
        favCount() {
            return this.tasks.reduce((p, c) => {
                return c.isFav ? p + 1 : p;
            }, 0)
        },
        totalCount: (state) => {
            return state.tasks.length;
        },
        /* totalCount(){
            return this.tasks.length;
        }*/
    },

    actions: {
        async getTasks() {
            this.loading = true;
            const response = await fetch(import.meta.env.VITE_API_URL + "tasks");
            const data = await response.json();
            this.tasks = data;
            this.loading = false;
        },

        async addTask(task) {
            this.tasks.push(task);
            try {
                const response = await fetch(import.meta.env.VITE_API_URL + "tasks", 
                { 
                    method: "POST", 
                    body: JSON.stringify(task), 
                    headers: { "content-Type": "application/json"} 
                });
            } catch (error) {
                console.log(error);
            }
        },
        async deleteTask(id) {
            this.tasks = this.tasks.filter(t => { return t.id !== id });
            try {
                await fetch(import.meta.env.VITE_API_URL + "tasks/"+id, 
                { 
                    method: "DELETE",
                });
            } catch (error) {
                console.log(error);
            }
        },
        async toggleFav(id) {
            const task = this.tasks.find(t => t.id === id);
            task.isFav = !task.isFav;
            try {
                await fetch(import.meta.env.VITE_API_URL + "tasks/"+id, 
                { 
                    method: "PATCH", 
                    body: JSON.stringify({isFav:task.isFav}), 
                    headers: { "content-Type": "application/json"} 
                });
            } catch (error) {
                console.log(error);
            }
        }
    }

})

