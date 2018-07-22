<template>
    <div>
        <BaseInputText :obj="obj"
            @add="add"
            @update="update"
            @close="close"
        />
       <table>
        <tr>
            <th>Is Complete</th>
            <th>Name</th>
            <th></th>
            <th></th>
        </tr>
        <tbody v-if="obj.todos.length">
            <TodoListItem
            	v-for="todo in obj.todos"
				:key="todo.id"
				:todo="todo"
				@delete="$emit('delete',todo.id)"
                @edit="$emit('edit',todo.id)"
            />
         </tbody>
        </table>
    </div>
</template>
<script>

import BaseInputText from './BaseInputText.vue'
import TodoListItem from './TodoListItem.vue'

export default {
    components:{
        BaseInputText,TodoListItem
    },
    props:{
        obj:{
        type:Object,
        default:function(){
            return{
                todos: [],
                seen: false,
                selectedId: '',
                selectedName: '',
                ischoose: false,
                inputName: ''
                }
        }
       }
    },
    methods:{
       add(name){
         this.$emit('add',name);
       },
       update(sid,sname,iscompleted){
         this.$emit('update',sid,sname,iscompleted);
       },
       close(){
         this.$emit('close');
       }
    }
}
</script>

 <style>
        table {
            font-family: Arial, sans-serif;
            border: 1px solid;
            border-collapse: collapse;
        }

        th {
            background-color: #0066CC;
            color: white;
        }

  
    </style>
