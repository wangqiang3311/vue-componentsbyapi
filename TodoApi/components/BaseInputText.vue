 <template>
 <div>
    <form action="javascript:void(0);" method="POST" v-on:submit.prevent="$emit('add',name)">
        <input type="text" id="add-name" v-model="name" placeholder="New to-do">
        <input type="submit" value="Add">
    </form>
    <div id="spoiler" v-if="seen">
        <h3>Edit</h3>
        <form class="my-form"  v-on:submit.prevent="$emit('update',sid,sname,iscompleted)">
            <input type="hidden" id="edit-id" v-model="sid">
            <input type="checkbox" id="edit-isComplete" v-model="ischoosed">
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
         inputName:{
             type:String,
             default:'',
         },
         selectedId:{
             type:Number
         },
         selectedName:{
             type:String,
             default:''
         },
         ischoose:{
             type:Boolean,
             default:false
         },
         seen:{
             type:Boolean,
             default:false
         }
     },
     data(){
         return {
            name:this.inputName,
            sid:this.selectedId,
            sname:this.selectedName,
            iscompleted :this.ischoose
         }
     }
 }
 </script>
 <style>
    input[type='submit'], button, [aria-label] {
            cursor: pointer;
        }
 </style>
 
 