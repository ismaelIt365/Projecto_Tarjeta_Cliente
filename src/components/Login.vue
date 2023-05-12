<template>
    <div class="container">
        <!-- para poner en el centro -->
        <div class="row justify-content-center">
            <div class="col-12 col-md-8 col-sm-12">
                <div class="card">
                    <div class="row p-2">
                        <!-- cambiar de div entre registro y ventajas con @click="variable"-->
                        <div class="col-6"><button @click="registro = true" class="btn  w-100" :class="{
                            colorActive: registro == true,
                            colorInactive: registro == false,
                        }" type="button">Registro</button></div>
                        <div class="col-6"> <a href="#">
                                <button @click="registro = false" :class="{
                                        colorActive: registro == false,
                                        colorInactive: registro == true,
                                    }" class="btn w-100" type="button">Ventajas</button>
                            </a></div>
                    </div>
                    <img v-if='registro' src="../assets/Logo1.png" class="card-img-top img-fluid" alt="...">
                    <div v-if='registro' class="card-body">
                        <div class="row g-3">
                            <div class="col-6">
                                <label for="inputNombre" class="form-label">Nombre</label>
                                <input v-model="nombre" type="text" class="form-control" id="inputNombre"
                                    placeholder="Nombre">
                            </div>
                            <div class="col-6">
                                <label for="inputApellidos" class="form-label">Apellidos</label>
                                <input v-model="apellidos" type="text" class="form-control" id="inputApellidos"
                                    placeholder="Apellidos">
                            </div>
                            <div class="col-6">
                                <label for="inputTelefono" class="form-label">Telefono</label>
                                <div class="input-group ">
                                    <span class="input-group-text" id="basic-addon1">+34</span>
                                    <input v-model="telefono" type="text" class="form-control" placeholder="Telefono"
                                        aria-label="telefono" aria-describedby="basic-addon1">
                                </div>
                            </div>
                            <div class=" col-6">
                                <label for="inputCP" class="form-label">CP</label>
                                <input v-model="cp" type="text" class="form-control" id="inputCP" placeholder="CP">
                            </div>
                            <div class="col-md-6">
                                <label for="inputEmail" class="form-label">Email</label>
                                <input v-model="email" type="email" class="form-control" id="inputEmail"
                                    placeholder="Email">
                            </div>
                            <div class="col-md-6">
                                <label for="inputTarjeta" class="form-label">Tarjeta</label>
                                <input v-model="tarjeta" type="email" class="form-control" id="inputTarjeta"
                                    placeholder="Tarjeta">
                            </div>
                            <div class="col-12">
                                <button @click="crearTarjeta()" class="btn btn-success">Registrarse</button>
                            </div>
                        </div>
                    </div>
                    <!-- ventajas -->
                    <div v-else class="card-body">
                        <div class="row">

                            <div class="col-sm-12 col-md-6">
                                <img class="img-thumbnail" src="../assets/vegetal.jpg" alt="">
                                <div class="card-body">
                                    <h5 class="card-title">Producto 1</h5>
                                    <p class="card-text">1000 pts</p>
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-6">
                                <img class="img-thumbnail" src="../assets/mollete.jpg" alt="">
                                <div class="card-body">
                                    <h5 class="card-title">Producto 2</h5>
                                    <p class="card-text">900 pts</p>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12 col-md-6">
                                <img class="img-thumbnail" src="../assets/nordico_iberico.jpg" alt="">
                                <div class="card-body">
                                    <h5 class="card-title">Producto 3</h5>
                                    <p class="card-text">500 pts</p>
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-6">
                                <img class="img-thumbnail" src="../assets/serrano.jpg" alt="">
                                <div class="card-body">
                                    <h5 class="card-title">Producto 4</h5>
                                    <p class="card-text">100 pts</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>




        </div>
    </div>
</template>
<script>
import { ref } from 'vue'
import Swal from 'sweetalert2'
import QR from 'qrious'
export default {
    name: 'loginComponent',
    setup() {
        // Variables
        const error = ref(false);
        const registro = ref(true);
        const nombre = ref("");
        const apellidos = ref("");
        const telefono = ref("");
        const cp = ref("");
        const email = ref("");
        const validEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        const tarjeta = ref("");
        const imagenQR = ref("");

        function crearTarjeta() {

            error.value = false;
            // comprobar si el nombre esta vacio 
            if (nombre.value == "") {
                error.value = true;
                Swal.fire({
                    title: "Error",
                    text: "Debes introducir un nombre",
                    icon: "error",

                })
            }
            // comprobar si los apellidos estan vacios
            if (apellidos.value == "") {
                error.value = true;
                Swal.fire({
                    title: "Error",
                    text: "Debes introducir tus apellidos",
                    icon: "error",

                })
            }
            // comprobar si el telefono esta vacio
            if (telefono.value == "") {
                error.value = true;
                Swal.fire({
                    title: "Error",
                    text: "Debes introducir un telefono",
                    icon: "error",
                })
            }
            else {
                // comprobar si el telefono tiene un tamaño de 9 digitos y solo introducen numeros no texto(isNaN)   
                if (telefono.value.length < 9 || telefono.value.length > 9 || isNaN(telefono.value)) {
                    error.value = true;
                    Swal.fire({
                        title: "Error",
                        text: "Debes introducir un telefono de 9 digitos",
                        icon: "error",
                    })
                }
            }
            // comprobar si el codigo postal esta vacio
            if (cp.value == "") {
                error.value = true;
                Swal.fire({
                    title: "Error",
                    text: "Debes introducir un codigo postal",
                    icon: "error",
                })
            }
            else {
                //comprobar que el tamaño del codigo postal sea de 5 digitos y solo introduzca numeros no texto(isNaN) 
                if (cp.value.length < 5 || cp.value.length > 5 || isNaN(cp.value)) {
                    error.value = true;
                    Swal.fire({
                        title: "Error",
                        text: "Debes introducir un codigo postal de 5 digitos",
                        icon: "error",
                    })
                }
            }
            // comprobar si el email esta vacio
            if (email.value == "") {
                error.value = true;
                Swal.fire({
                    title: "Error",
                    text: "Debes introducir un email",
                    icon: "error",
                })
            } else {
                // comprobar si el email es valido
                if (!validEmail.test(email.value)) {
                    error.value = true;
                    Swal.fire({
                        title: "Error",
                        text: "El formato del email es incorrecto",
                        icon: "error",
                    });
                }
            }
            if (tarjeta.value != "" && tarjeta.value.length < 13 || tarjeta.value.length > 13 || isNaN(tarjeta.value)) {
                error.value = true;
                Swal.fire({
                    title: "Error",
                    text: "El formato de la tarjeta es incorrecto",
                    icon: "error",
                });
            }


            // Controlar error
            if (!error.value) {
                const datos = {
                    nombreCompleto: nombre.value + apellidos.value,
                    telefono: telefono.value,
                    codigoPostal: cp.value,
                    correo: email.value,
                    tarjeta: tarjeta.value,
                }
                console.log(datos);

                //Crear QR para coger los datos del telefono
                const qr = new QR({});

                qr.backgroundAlpha = 0.8;
                qr.foregroundAlpha = 0.8;
                qr.level = "H";
                qr.padding = 20;
                qr.size = 300;
                qr.value = datos.telefono;
                imagenQR.value = qr.toDataURL();


                //Crear una alert para mostrar que la tarjeta se ha creado correctamente y mostrarle el QR 
                Swal.fire({
                    title: '<strong>Tarjeta Creada</strong>',
                    icon: 'success',
                    html: '<img src="' + imagenQR.value + '" alt="">',
                    showCloseButton: true,
                    focusConfirm: false,
                    confirmButtonText:
                        '<i class="fa fa-thumbs-up"></i> OK',
                    confirmButtonAriaLabel: 'Thumbs up, great!',

                })



            }



        }
        //Retornar variables y funciones
        return {
            registro,
            crearTarjeta,
            nombre,
            apellidos,
            telefono,
            cp,
            email,
            tarjeta,
            imagenQR
        }

    }
}
</script>

<style>
.colorActive {
    background-color: #ff9800;
    color: black;
    padding: 0.6rem;
}

.colorInactive {
    background-color: #d7d9e7;
    color: rgb(119, 119, 119);
}
</style>