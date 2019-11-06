<template>
    <nav  class="navbar navbar-default">
        <ul class="nav navbar-nav">

            <li v-for="rota in rotas" :key="rota.id">

              <router-link :to="rota.path ? rota.path : '/'"> <!-- Condição ternária, caso o path  -->

                {{ rota.titulo }}
              
              </router-link>

            </li>
            
        </ul>
    </nav>
</template>

<script>
export default {

    props: {
        rotas: {
            type: Array,
            required: true
        }
    }
}
</script>

<style>
li {
    list-style: none;
}

</style>