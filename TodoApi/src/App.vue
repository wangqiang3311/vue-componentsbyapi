<template>
	<div id="app">	
         <h1>To-do CRUD</h1>
		<TodoList :obj="obj"
        
        @delete="deleteItem"
        @edit="editItem"
        @add="addItem"
        @update="updateItem"
        @close="closeInput"
        />
	</div>
</template>

<script>
import TodoList from '../components/TodoList.vue'

var obj={
          todos: [],
          seen: false,
          selectedId: '',
          selectedName: '',
          ischoose: false,
          inputName: ''
        };

const uri = 'https://localhost:5001/api/todo';

export default {
	components: {
		TodoList
    },
    data (){
      return {
          obj:obj
      }
    },
    created() {
        this.getData()
    },
    methods: {
        editItem(id) {
            this.seen = true;
            var that = this;
            $.each(this.obj.TodoList, function (key, item) {
                if (item.id === id) {
                    that.selectedId = id;
                    that.selectedName = item.name;
                    that.ischoose = item.isComplete;
                }
            });
        },
        deleteItem(id) {
            var that=this;
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
        updateItem (sid,sname,isComplete) {
            const item = {
                'name': sname,
                'isComplete': isComplete,
                'id': sid
            };

            var that=this;
            $.ajax({
                url: uri + '/' + this.selectedId,
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

            that.closeInput();
            return false;
        },
        addItem(name) {
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
                    alert('here');
                },
                success: function (result) {
                    that.getData();
                    that.inputName = '';
                }
            });
        },
        closeInput() {

            obj.seen = false;

        },
        getData(){
             $.ajax({
                    type: 'GET',
                    url: uri,
                    xhrFields: {
                        withCredentials: true
                    },
                    success: function (data) {
                        obj.todos.splice(0, obj.todos.length);
                        $.each(data, function (key, item) {
                            const checked = item.isComplete;
                            obj.todos.push({
                                id: item.id,
                                name: item.name,
                                isComplete: item.isComplete,
                                enabled: checked
                            });
                        });
                    }
                   }); 
             }
 
    }
  
}

</script>