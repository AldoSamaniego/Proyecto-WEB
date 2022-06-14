const componente = Vue.create({
    el: '#componente',
    data () {
      return {
        info: null
      }
    },
    mounted () {
      axios
        .post('http://api-recipy.herokuapp.com/getUsuarios')
        .then(response => (this.info = response))
    }
  })