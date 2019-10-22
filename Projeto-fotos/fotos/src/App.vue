<template>
  <div>
    <h1>{{ titulo }}</h1>
    <ul>
    <li v-for="foto in fotos" :key="'foto'+foto.id">
      
      <img :src="foto.url" :alt="foto.titulo">
    
    </li>
    </ul>

  </div>
</template>

<script>
export default {
  data() {

    return {
      titulo: 'Galeria de Fotos',
      fotos: []
   }

},

  created() {
    
    let promise = this.$http.get('http://localhost:3000/v1/fotos')
    .then(res => res.json())
    .then(fotos => this.fotos = fotos);    
  }
  
}
</script>

<style lang="scss">

</style>
