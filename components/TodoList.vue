<template>
<div>
    <BaseInputText :obj="obj" @add="add" @update="update" @close="close" />
    <table>
        <tr>
            <th>Is Complete</th>
            <th>Name</th>
            <th></th>
            <th></th>
        </tr>
        <tbody v-if="obj.todos.length">
            <TodoListItem v-for="todo in obj.todos" :key="todo.id" :todo="todo" @delete="deleteItem" @edit="edit" @upload="upload" />

        </tbody>
    </table>
</div>
</template>

<script>
import jQuery from 'jquery'
window.$ = jQuery

const uri = 'https://localhost:5001/api/todo';

import BaseInputText from './BaseInputText.vue'
import TodoListItem from './TodoListItem.vue'

export default {
    components: {
        BaseInputText,
        TodoListItem
    },
    data() {
        return {
            obj: {
                todos: [],
                seen: false,
                selectedId: '',
                selectedName: '',
                ischoose: false,
                inputName: ''
            }
        }
    },
    created() {
        this.getData()
    },
    methods: {
        add(name) {
            const item = {
                'name': name,
                'isComplete': false
            };
            var that = this;

            $.ajax({
                type: 'POST',
                accepts: 'application/json',
                url: uri,
                contentType: 'application/json',
                xhrFields: {
                    withCredentials: true
                },
                data: JSON.stringify(item),
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(errorThrown);
                },
                success: function (result) {
                    that.getData();
                    that.obj.inputName = '';
                }
            });
        },
        close() {
            this.obj.seen = false;
        },
        upload() {
            layui.layer.open({
                type: 2,
                content: '#/UpdateToDo' //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: ['http://sentsin.com', 'no']
            });
        },
        edit(id) {
            var that = this;
            that.obj.seen = true;

            $.each(that.obj.todos, function (key, item) {
                if (item.id === id) {
                    that.obj.selectedId = id;
                    that.obj.selectedName = item.name;
                    that.obj.ischoose = item.isComplete;
                }
            });
        },
        deleteItem(id) {
            var that = this;
            $.ajax({
                url: uri + '/' + id,
                xhrFields: {
                    withCredentials: true
                },
                type: 'DELETE',
                success: function (result) {
                    that.getData();
                }
            });

        },
        update(sid, sname, isComplete) {
            const item = {
                'name': sname,
                'isComplete': isComplete,
                'id': sid
            };

            var that = this;
            $.ajax({
                url: uri + '/' + sid,
                type: 'PUT',
                accepts: 'application/json',
                contentType: 'application/json',
                xhrFields: {
                    withCredentials: true
                },
                data: JSON.stringify(item),
                success: function (result) {
                    that.getData();
                }
            });

            that.close();
            return false;
        },
        getData() {
            var that = this;
            $.ajax({
                type: 'GET',
                url: uri,
                xhrFields: {
                    withCredentials: true
                },
                success: function (data) {
                    that.obj.todos.splice(0, that.obj.todos.length);
                    $.each(data, function (key, item) {
                        const checked = item.isComplete;
                        that.obj.todos.push({
                            id: item.id,
                            name: item.name,
                            isComplete: item.isComplete,
                            enabled: checked
                        });
                    });
                }
            });
        },
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
