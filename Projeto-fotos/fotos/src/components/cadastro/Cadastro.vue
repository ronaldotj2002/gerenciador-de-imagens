<template>

  <div>
    <h1 class="centralizado">Cadastro</h1>

    <h2 v-if="foto._id" class="centralizado"> Editando foto</h2>
    <h2 v-else class="centralizado">Incluindo foto</h2>
    
    <br>
    <p class="centralizado">{{ mensagem }}</p>


    <div class="col-md-8 col-md-offset-2">

        <form @submit.prevent="grava()">

          <div class="controle">
            <label for="titulo">TÍTULO</label>
            <input class="form-control" data-vv-as="título" name="titulo" v-validate data-vv-rules="required|min:3|max:30" id="titulo" autocomplete="off" v-model="foto.titulo"/>
            <span class="erro" v-show="errors.has('titulo')">{{ errors.first('titulo') }}</span>
          </div>

          <div class="controle">
            <label for="url">URL</label>
            <input class="form-control" name="url" v-validate data-vv-rules="required" id="url" autocomplete="off" v-model="foto.url"/>
            <span class="erro" v-show="errors.has('url')">{{ errors.first('url') }}</span>
            <imagem-responsiva v-show="foto.url" :url="foto.url" :titulo="foto.titulo" />
          </div>

          <div class="controle">
            <label for="descricao">DESCRIÇÃO</label>
            <textarea class="form-control" name="descricao" v-validate data-vv-rules="required" id="descricao" autocomplete="off" v-model="foto.descricao"></textarea>
            <span class="erro" v-show="errors.has('descricao')">Descrição obrigatória!</span>
          </div>

          <div class="centralizado">
            <meu-botao rotulo="GRAVAR" tipo="submit" />
            <router-link :to="{ name: 'home'}">
              <meu-botao rotulo="VOLTAR" tipo="button" />
            </router-link>
          </div>

        </form>

    </div>

  </div>

</template>

<script>
import ImagemResponsiva from "../shared/imagem-responsiva/ImagemResponsiva.vue";
import Botao from "../shared/botao/Botao.vue";
import Foto from '../../domain/foto/Foto'; // importando a classe foto
import FotoService from '../../domain/foto/fotoService'


export default {
  components: {
    "imagem-responsiva": ImagemResponsiva,
    "meu-botao": Botao
  },
  data() {
      return {

          foto: new Foto(),          
          id: this.$route.params.id,
          mensagem: ''
        }
    },

    methods: {

        grava() {

            this.$validator // é do vee-validate
            .validateAll() // promisse
            .then(success => {

              if(success) {

                this.service
                .cadastra(this.foto)
                .then(() => {
                  if(this.id) this.$router.push({ name: 'home'});
                   this.foto = new Foto() }, this.mensagem = 'Foto gravada com sucesso!',
                      err => console.log(err));
              }

            });

        }
    },

    created() {
      
      this.service = new FotoService(this.$resource);

      if (this.id) {
        this.service
        .busca(this.id)
        .then(foto => this.foto = foto);
      }     
      
    }
}
</script>
<style scoped>
.centralizado {
  text-align: center;

}
.controle {
  font-size: 1.2em;
  margin-bottom: 20px;

}
.controle label {
  display: block;
  font-weight: bold;

}

.controle label + input,
.controle textarea {
  width: 100%;
  font-size: inherit;
  border-radius: 5px;

}

.centralizado {
  text-align: center;
  
}
.erro {

  color:darkred;
}
</style>