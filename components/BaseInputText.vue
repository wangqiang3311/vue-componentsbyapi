    <template>
 <div>
    <form action="javascript:void(0);" method="POST" v-on:submit.prevent="$emit('add',name)">
        <input type="text" id="add-name" v-model="name" placeholder="New to-do">
        <input type="submit" value="Add">
    </form>
    <div id="spoiler" v-if="obj.seen">
        <h3>Edit</h3>
        <form class="my-form"  v-on:submit.prevent="$emit('update',sid,sname,iscompleted)">
            <input type="hidden" id="edit-id" v-model="sid">
            <input type="checkbox" id="edit-isComplete" v-model="iscompleted">
            <input type="text" id="edit-name" v-model="sname">
            <input type="submit" v-on:keyup.enter="submit" value="Edit">
            <a v-on:click="$emit('close')" aria-label="Close">&#10006;</a>
        </form>
    </div>
    <p id="counter"></p>
 </div>
 </template>

 <script>
 export default {
     name:'BaseInputText',

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
     data(){
         return {
            name:this.obj.inputName,
            sid:this.obj.selectedId,
            sname:this.obj.selectedName,
            iscompleted :this.obj.ischoose
         }
     },
      watch:{

     obj:{
        deep:true,
        handler(val){
            if(val.inputName==""){
                this.name=val.inputName;
            }
            this.sid=val.selectedId;
            this.sname=val.selectedName;
            this.iscompleted=val.ischoose;
        }
     }
    }
 }
 </script>
 <style>
    input[type='submit'], button, [aria-label] {
            cursor: pointer;
        }
 </style>
 
 