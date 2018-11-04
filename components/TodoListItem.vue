<template>
<tr>
    <td><input :disabled="todo.enabled" type="checkbox"></td>
    <td>{{ todo.name }}</td>
    <td><button @click="$emit('edit',todo.id)">Edit</button></td>
    <td><button @click="$emit('delete',todo.id)">Delete</button></td>
    <td><button @click="$emit('upload')">upload</button></td>
    
</tr>
</template>

<script>
export default {
    props: {
        todo: {
            type: Object,
            required: true
        }
    },
    name: 'TodoListItem'
}
</script>

<style>
td {
    border: 1px solid;
    padding: 5px;
}
</style>
