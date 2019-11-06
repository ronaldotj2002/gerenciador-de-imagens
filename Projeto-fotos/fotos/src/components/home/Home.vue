
<template>

    <div class="row">

        <h1 class="centralizado">{{ titulo }}</h1>

        <p  v-show="mensagem" class="centralizado">{{ mensagem }}</p>
      <div class="row">
        <div class="col-md-6 col-md-offset-3">
          <div class="input-group">
            <input type="text" class="form-control" @input="filtro = $event.target.value" placeholder="Filtrar pelo título da imagem">
            <span class="input-group-btn">
              <button class="btn btn-default" type="button">Go!</button>
            </span>
          </div><!-- /input-group -->
        </div><!-- /.col-lg-6 -->
      </div>
    
        <ul class="lista-fotos">

            <li class="lista-fotos-item" v-for="foto of fotosComFiltro" :key="foto.id">   

                <meu-painel class="col-md-3">

                   <div class="thumbnail">
                      <imagem-responsiva 
                      :url="foto.url" 
                      :titulo="foto.titulo" 
                      v-meu-transform:scale.animate="1.2"/>

                      <div class="caption">
                          
                          <h3>{{ foto.titulo }}</h3>
                          
                          <p>{{ foto.descricao }}</p>

                          <router-link :to="{name: 'altera', params: { id: foto._id} }">
                      <meu-botao tipo="button" rotulo="Alterar" />
                    </router-link>
                    
                    <meu-botao 
                      tipo="button" 
                      rotulo="Remover" 
                      @botaoAtivado="remover(foto)"
                      :confirmacao="true"
                      estilo="perigo"
                    />

                      </div>
                   </div>

                </meu-painel>
                    
            </li>

        </ul>

    </div>

</template>

<script>
import Painel from '../shared/painel/Painel.vue';
import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue';
import Botao from '../shared/botao/Botao.vue';
import FotoService from '../../domain/foto/fotoService';


export default {

  components:{

    'meu-painel'        : Painel,
    'imagem-responsiva' : ImagemResponsiva,
    'meu-botao'         : Botao

  },

   data() {

    return {
      titulo: 'Galeria de Fotos',
      fotos: [],
      filtro: '',
      mensagem: ''
   }

},

  computed: {

    fotosComFiltro(){

      if(this.filtro) {

        let exp = new RegExp(this.filtro.trim(), 'i');
        return this.fotos.filter(foto => exp.test(foto.titulo));

      } else {

        return this.fotos;

      }

    }

  },

  methods: {
    
    remover(foto) {
        
        this.service.apaga(foto._id)
            .then(() => {
              let indice = this.fotos.indexOf(foto);
              this.fotos.splice(indice, 1);
              this.mensagem = 'Foto removida com sucesso!';}, 
              err =>{              
              this.mensagem = err.message;
            });

    }
  },


  created() {

    this.service = new FotoService(this.$resource);

      this.service
      .lista()
      .then(fotos => this.fotos = fotos, err => this.mensagem = err.message

      );  

  }

}
</script>

<style scoped>

  .centralizado{
    text-align: center;

  }

  .lista-fotos{
    list-style: none;

  }
  
  .filtro{
    display: block;
    width: 100%;
    padding: 10px 5px;
  }
</style>
