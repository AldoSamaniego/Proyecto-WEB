const app=Vue.createApp({

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

app.mount('#app');