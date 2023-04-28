<script setup>
import { useCounterStore } from '../stores/counter';
const useCounter = useCounterStore();
var mensaje = {
  dismissSecs: 4,
  dismissCountDown: 0,
  mensaje: {color: '', texto: 'HOLA'}
};
var showAlert = true;
function terminada(){
    useCounter.tasks.forEach(element => {
        if(element.status.localeCompare('¡TERMINADA!')==0){
        element.estado=false
        }
    });
}
function mostrarTerminadas(){
    useCounter.tasks.forEach(element => {
        if(element.status.localeCompare('¡TERMINADA!')==0){
        element.estado=true;
        mensaje.mensaje.texto="HOLA!";
        }
    });
}




</script>
<template>
  <h2 class="text-center mt-5">Lista de tareas</h2>
  <b-alert class="text-center" v-model="useCounter.statusNotification" dismissible v-bind:variant="`${useCounter.color}`">
    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
</svg>
    {{ `${useCounter.mensaje}` }}
  </b-alert>

      <div class="d-flex mt-5">
      <b-form-input v-model="useCounter.task" placeholder="Ingrese tarea"></b-form-input>
      <b-button variant="warning" style="color: white;" @click="useCounter.submitTask()" id="probando">
        Ingresar
      </b-button>
       <b-button variant="info" style="color: white;" @click="terminada()" >
        Ocultar terminadas
      </b-button>
            <b-button variant="success" @click="mostrarTerminadas()">
        Mostrar terminadas
      </b-button>
    </div>
  <b-table-simple responsive class="table table-bordered mt-5" >
  <b-thead>
    <b-tr>
      <b-th sticky-column> Tarea</b-th>
      <b-th>Estado</b-th>
      <b-th>Editar</b-th>
      <b-th>Borrar</b-th>
    </b-tr>
  </b-thead>
  <b-tbody >
    <b-tr v-for="(task,index) in useCounter.tasks" :key="index">
    <b-td v-if="task.estado">
        <span  :class="{'terminada': task.status === '¡TERMINADA!'}" > <!-- Cuando el contenido es dinámico se usa un :-->
              {{ task.name }}
        </span>
        
    </b-td>
    <b-td v-if="task.estado">
             <span ref="probando"
              class="seleccionar noselect"
              @click="useCounter.changeStatus(index)"
              :class="{
                'text-danger': task.status === '¡PRIORIDAD!',
                'text-success': task.status === '¡TERMINADA!',
                'text-warning': task.status === 'EN PROCESO',
              }"
            >
              {{ useCounter.capitalizeFirstChar(task.status) }}
            </span>
    </b-td>
    <b-td class="text-center" v-if="task.estado">
        <div @click="useCounter.editTask(index)">
            <p class="fa fa-pen seleccionar"></p>
        </div>
    </b-td>

    <b-td class="text-center" v-if="task.estado">
        <div @click="useCounter.deleteTask(index)">
              <span class="fa fa-trash seleccionar"></span>
         </div>

    </b-td>
    
    </b-tr>

  </b-tbody>


  </b-table-simple>

</template>



<style scoped>
.seleccionar {
    cursor: pointer;
}
.terminada{
    text-decoration: line-through;
}
</style>



