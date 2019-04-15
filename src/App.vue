<template>
  <div id="app">
    <h1 class="title">
      LABES Training
    </h1>
    <div class="hero-body">
      <div class="container has-text-centered">
        <button 
        class="button"
        @click="swapCondition()">
          <div v-if='condition'>
          Esconder Post
          </div>
          <div v-if='! condition'>
          Exibir Post
          </div>
        </button>

        <div class="columns"
        v-if='condition' >
          
          <div class="column"
          v-for="(posts, i) in postsArrey"
          :key="i">
            
            <div class="card">
              <h2>{{posts.title}}</h2>             
              <div class="card-content">
                <div class="media">
                  <div class="media-left">
                    <figure class="image is-48x48">
                    <img
                    src="https://bulma.io/images/placeholders/96x96.png"
                    alt="Placeholder image"
                    />
                    </figure>
                  </div>
                  <div class="media-content">
                    <p class="title is-4 has-text-black">John Smith</p>
                    <p class="subtitle is-6 has-text-black">@johnsmith</p>
                  </div>
                </div>
                <div class="content">
                  <p>{{posts.body}}</p>
                
                <br/>
                <button
                @click="deletePost(posts)"
                class="delete"
                >
                  Remover Post
                </button>
                <br/>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <br/>
          <b>Titulo </b>
            <input type="text" v-model="newPost.title">
          <b> Texto </b>
            <input type="text" v-model="newPost.body">
          <button 
          class="button"
          @click="addPost()">
            Adicionar Post
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'app',
  components: {
    
  },
  data:function(){
    //As variaveis do meu compontente ficam aqui
    return {
      postsArrey: [],
      condition: false,
      newPost: {
        title:"",
        body:''
      }
    }
    },

    created(){
        axios.get(`https://jsonplaceholder.typicode.com/posts`)
        .then(res =>{
            this.postsArrey = res.data
        }).catch(err =>{
            this.$notify({
          group: 'all',
          type: 'error',
          title: 'Request failed!',
          text: 'Failed to load os Posts!'
            })
        })
    },
    mounted () {
    this.$notify({
      group: 'all',
      type: 'info',
      title: 'Hello there!',
      text: 'Welcome to our application!'
    })
  },

   methods: {
    swapCondition(){
      if(this.condition === true){
        this.condition = false
      }else{
        this.condition = true
      }
    },

    addPost(){
      if(!this.newPost.title && !this.newPost.title){
        return
      }
      axios.post(`https://jsonplaceholder.typicode.com/posts/`,this.newPost)
      .then(res=>{
        this.postsArrey.push(res.data)
        this.newPost.title = ''
        this.newPost.body = ''
      }).catch(err=>{
        this.$$notify({
          group:'all',
          type: 'error',
          title: 'Request failed!',
          text: 'Failed to save a Post!'
        })
      })

      },
      deletePost(post){
      axios.delete(`https://jsonplaceholder.typicode.com/posts/${post.id}`)
      .then(res=>{
        this.postsArrey = this.postsArrey.filter(aux=>aux.id !== post.id)
      })
      .catch(err =>{
        this.$notify({
          group: 'all',
          type: 'error',
          title: 'Request failed!',
          text: 'Failed to delete o post!'
        })
      })
    }
  }

}
</script>

<style>
  #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
