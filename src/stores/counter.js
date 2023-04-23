import { defineStore } from 'pinia'


export const useCounterStore = defineStore({
  id: 'counter',
  state: () => ({
    status_act: ["¡PRIORIDAD!", "EN PROCESO", "¡TERMINADA!"],
    estado: true,
    editedTask: null,
    task: "",
    tasks: [
      {
        name: "Tarea 1",
        status: "¡PRIORIDAD!",
        estado: true,
      },
     {
        name: "Tarea 2",
        status: "EN PROCESO",
        estado: true,
    },
    {
      name: "Tarea 3",
      status: "¡TERMINADA!",
      estado: true,
    }
     ]}),
  getters: {
    doubleCount: (state) => state.counter * 2
  },

  actions: {
    /**
     * Función que recibe un str de parámetro y vuelve a mayúscula la primera letra.
     */
    capitalizeFirstChar(str) {
      return str.charAt(0).toUpperCase() + str.slice(1); // stre.slice(1) elimina la primera letra (se repite)
    },
    /**
     * Cambia el estado de la tarea
     */
    changeStatus(index) {
      let newIndex = this.status_act.indexOf(this.tasks[index].status); //Variable que guarda el estado de la tarea actual.
      if (++newIndex > 2) newIndex = 0; //Se incrementa e 1 el estado de la tarea actual (para que vaya cambiando el estado), luego si es mayor que 2 coloca en cero otra vez.
      this.tasks[index].status = this.status_act[newIndex]; // A la tarea actual se le cambia el estado según el índice nuevo.

        
    
    },
    /**
     * Borra la tarea según el índice que reciba la función
     */
    deleteTask(index) {
      this.tasks[index].estado="";
      this.tasks[index].name="";
      this.tasks[index].status="";
    


    },
    /**
     * Se guarda en la variable task el nombre de la tarea que se introduzca en la caja de texto, y se le pasa el índice de la tarea a editar a la variable editedTask.
     */
    editTask(index) {
      this.task = this.tasks[index].name;
      this.editedTask = index;

    },
    /**
     * Agregar / Editar
     */
    submitTask() {
      if (this.task.length === 0) return; //Cuando no hay tareas, solo retorna
      /* Editar tarea */
      if (this.editedTask != null) {
        this.tasks[this.editedTask].name = this.task; //tasks recibe el indice de la tarea que se quiere editar, y el nombre se iguala al nombre que se escriba en la caja de texto.
        this.editedTask = null; //Se setea en null para que en caso de que se quiera agregar una nueva tarea, se haga.
      } else {
        /* Agregar tarea */
        this.tasks.push({
          name: this.task,
          status: "¡PRIORIDAD!",
          estado: true,
        });
      }
      this.task = "";
    }
  }
});
