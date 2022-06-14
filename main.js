
const app=Vue.createApp({
    data(){
        return{
            addi : false,
            timeline : true,
            friends : false,
            campos : ['Mapa','Logo','Mejor Atractivo'],
            campo : "",
            user: null,
            recetas: null,
            mail:null,
            pass:null,
            nfname:null,
            nlname:null,
            nmail:null,
            npass:null,
            nday:null,
            nmonth:null,
            nano:null

        }
    },
      mounted () {
        axios.post('http://api-recipy.herokuapp.com/getRecetas').then(
            (response) =>
            {console.log(response);
            console.log(response.data);
            this.recetas = response.data
        }
        )
      },
      methods : {
        verinputs: async (mail,pass) => {
            console.log('sing in');
            console.log(mail);
            console.log(pass);
            let res = null;
            await axios.post('http://api-recipy.herokuapp.com/getusuario',{
                email:mail,
                contra:pass
            }).then((r)  => {
                res = r.data
            });
            console.log(res)
            if (res.length > 0){ 
            localStorage.setItem('cliente',res[0].idCliente)
            location.href="./feed.html"
            }
        },
        verinewacc: async (nfname,nlname,nmail,npass,nday,nmonth,nano) => {
            console.log('new account');
            console.log(nfname);
            console.log(nlname);
            console.log(nmail);
            console.log(npass);
            console.log(nday);
            console.log(nmonth);
            console.log(nano);
            let res = null;
            if(nfname!=null){
                if(nlname!=null){
                    if(nmail!=null){
                        if(npass!=null){
                            await axios.post('http://api-recipy.herokuapp.com/crearUsuario',{
                                nombre:nfname,
                                apellido:nlname,
                                email:nmail,
                                contra:npass,
                                day:nday,
                                month:nmonth,
                                year:nano
                            }).then((r)  => {
                                res = r.data
                            });
                            console.log(res)
                            location.href="./feed.html"
                        }
                    }
                }
            }
        },
        upld: async (ing, texto, file) => {
            console.log('boton');
            console.log(ing);
            console.log(texto);
            console.log(file);
            await axios.post('http://api-recipy.herokuapp.com/crearReceta',{
                idCliente: localStorage.getItem('cliente'),
                texto:texto,
                file: file ?? null
            }).then(
            (response) =>
            {console.log(response);
            console.log(response.data);
            if(response.data.state == true){
                let idReceta = response.data.data.insertId;
                console.log(idReceta)
                let ingreds = ing.split(",");
                ingreds.map(async (ingrediente) => {
                    console.log(ingrediente)
                    await axios.post('http://api-recipy.herokuapp.com/agregarIngrediente',{
                        idReceta:idReceta,
                        ingrediente: ingrediente
                    }).then((response) => {
                        console.log(response)
                    })
                })
            }
            }
            )
        },
        getFeed: (ingrediente) => {
            console.log('getfeed');
            axios.post('http://api-recipy.herokuapp.com/getRecetasIngrediente',
            {ingrediente: ingrediente}
            ).then(
            (response) =>
            {console.log(response);
            console.log(response.data);
            this.recetas = response.data
            }
            )
        }
        
      }
})
app.component('footer-component',{
    template: `
    <div class="text-center bg-danger p-2 text-white">
    <div class="row">
        <div class="col fs-footer">
            <p class="my-1">recipy</p>
            <a href="https://github.com/AldoSamaniego/Proyecto-WEB.git">
                <button class="btn btn-social-icon"><i class="fa-brands fa-github"></i></button>
            </a>
        </div>
        <div class="col fs-footer">
            <p class="my-1">Aldo</p>
            <a href="https://www.instagram.com/aldojesussam/">
                <button class="btn btn-social-icon"><i class="fa-brands fa-instagram"></i></button>
            </a>
        </div>
        <div class="col fs-footer">
            <p class="my-1">Alfredo</p>
            <a href="https://www.instagram.com/welsh.m1/">
                <button class="btn btn-social-icon"><i class="fa-brands fa-instagram"></i></button>
            </a>
        </div>
        <div class="col fs-footer">
            <p class="my-1">Hania</p>
            <a href="https://www.instagram.com/hanniahans/">
                <button class="btn btn-social-icon"><i class="fa-brands fa-instagram"></i></button>
            </a>
        </div>

        
        
    </div>
    <hr />
    <p class="fs-small">recipy &copy; 2022 Desarrollo de Aplicaciones WEB</p>
    </div>
    `
})

app.component('header-component',{
    props:{
        active1: String,
        active2: String,
        active3: String
    },
    template: `
    <div class="bg-white d-flex align-items-center fixed-top shadow" style="min-height: 56px; z-index:5;">
    <div class="container-fluid">
        <div class="row align-items-center">
            <div class="col d-flex align-items-center">
                <!--logo-->
                <i class="fa-solid fa-utensils d-lg-none  text-danger" style="font-size: 1.6rem"></i>
                <h1 class="text-danger fw-bold d-none d-lg-block" style="font-size: 2rem">recipy</h1>
                <!--search-->
                <div class="input-group ms-2">
                    <span class="input-group-prepend  d-lg-none"
                    id="searchMenu" 
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    type="button">
                        <div class="input-group-text bg-gray border-0 rounded-circle" style="min-height: 40px;">
                            <i class="fas fa-search text-muted"></i>

                        </div>
                    </span>
                    <span class="input-group-prepend d-none d-lg-block"
                    id="searchMenu" 
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    type="button">
                        <div class="input-group-text bg-gray border-0 rounded-pill" style="min-height: 40px; min-width: 230px;">
                            <i class="fas fa-search me-2 text-muted"></i>
                            <p class="m-0 fs-small text-muted">Search</p>

                        </div>
                    </span>

                    <ul class="dropdown-menu border-0 shadow p-3 overflow-auto" aria-labelledby="searchMenu">
                      <li><a class="dropdown-item" href="#">Action</a></li>
                      <li><a class="dropdown-item" href="#">Another action</a></li>
                      <li><a class="dropdown-item" href="#">Something else here</a></li>
                    </ul>

                </div>
            </div>
            <!--center-->
            <div class="col d-flex justify-content-center">
                <div class="nav__btn "  :class="active1">
                    <a href="./feed.html">
                        <button class="btn">
                            <i class="fa-solid fa-house text-danger fs-footer"style="font-size: 1.6rem"></i>
                        </button>
                    </a>
                </div>
            </div>
            <!--right-->
            <div class="col d-flex align-items-center justify-content-end">
                <div class="nav__btn" :class="active2">
                    <a href="./profile.html">
                        <button class="btn ">
                            <i class="fa-solid fa-user text-danger fs-footer"style="font-size: 1.6rem"></i>
                        </button>
                    </a>
                </div>
                <div class="nav__btn" :class="active3">
                    <a href="./settings.html">
                        <button class="btn ">
                            <i class="fa-solid fa-bars text-danger fs-footer"style="font-size: 1.6rem"></i>
                        </button>
                    </a>
                </div>
            </div>



        </div>

    </div>
</div>
    `
})
app.component('header2-component',{
    template: `
    <div class="bg-danger d-flex align-items-center fixed-buttom " style="min-height: 30px; z-index:5;">
    <div class="container-fluid">
        <div class="row align-items-center">
            <div class="col d-flex justify-content-center">
                <div class="nav__btn nav__btn-active2">
                    <a href="./feed.html">
                        <button class="btn">
                            <i class="fa-solid fa-circle-plus text-white fs-footer"style="font-size: 1.3rem"></i>
                        </button>
                    </a>
                </div>
            </div>
            <!--center-->
            <div class="col d-flex justify-content-center">
                <div class="nav__btn nav__btn-active2">
                    <a href="./feed.html">
                        <button class="btn">
                            <i class="fa-solid fa-image-portrait text-white fs-footer"style="font-size: 1.3rem"></i>
                        </button>
                    </a>
                </div>
            </div>
            <!--right-->
            <div class="col d-flex align-items-center justify-content-end">
                <div class="nav__btn">
                    <a href="./settings.html">
                        <button class="btn ">
                            <i class="fa-solid fa-user-group text-white fs-footer"style="font-size: 1.3rem"></i>
                        </button>
                    </a>
                </div>
            </div>



        </div>

    </div>
</div>
    `
})



app.mount('#app');