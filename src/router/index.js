import Vue from 'vue'
import Router from 'vue-router'
import TodoList from '../../components/TodoList'
import Upload from '../../components/Upload'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/Upload',
      name:'Upload',
      component:Upload
    },
    {
      path:'/TodoList',
      name:'TodoList',
      component:TodoList
    }
  ]
})
