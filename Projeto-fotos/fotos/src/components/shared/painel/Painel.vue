<template>
    
    <div class="col-md-4">

        <h2 class="painel-titulo" @dblclick="visivel = !visivel">{{ titulo }}</h2>

        <transition name="painel-fade">

            <div class="painel-conteudo" v-show="visivel">

                <slot></slot>

            </div>

        </transition>
        

    </div> 

</template>

<script>

    export default {

        props: ['titulo'],

            data() {

                return {
                    visivel: true
                }
            }
        }

</script>

<style scoped>

   

  .painel-fade-enter, .painel-fade-leave-active{
      opacity: 0;

  }

  .painel-fade-enter-active, .painel-fade-leave-active{
      transition: opacity 1s;
  }

  .painel-conteudo{
      overflow: hidden;
  }
 
</style>