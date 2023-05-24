<template>
  <div class="container">
    <!-- para poner en el centro -->
    <div class="row justify-content-center mt-2">
      <div class="col-12 col-md-8 col-sm-12">
        <div class="card">
          <div class="row p-2">
            <!-- cambiar de div entre registro y ventajas con @click="variable"-->
            <div class="col-6">
              <button
                :class="{
                  colorActive: changecolor == true,
                  colorInactive: changecolor == false,
                }"
                @click="changecolor = true"
                class="btn w-100"
              >
                Registro
              </button>
            </div>
            <div class="col-6">
              <button
                :class="{
                  colorActive: changecolor == false,
                  colorInactive: changecolor == true,
                }"
                @click="changecolor = false"
                class="btn w-100"
              >
                Ventajas
              </button>
            </div>
          </div>
          <img
            v-if="changecolor"
            src="../assets/Logo1.png"
            class="card-img-top img-fluid mx-auto"
            alt="..."
            style="width: 15rem"
          />
          <div v-if="changecolor" class="card-body">
            <div class="row g-3">
              <div class="col-6">
                <label for="inputNombre" class="form-label">Nombre</label>
                <input
                  v-model="nombre"
                  type="text"
                  class="form-control"
                  id="inputNombre"
                  placeholder="Nombre"
                />
              </div>
              <div class="col-6">
                <label for="inputApellidos" class="form-label">Apellidos</label>
                <input
                  v-model="apellidos"
                  type="text"
                  class="form-control"
                  id="inputApellidos"
                  placeholder="Apellidos"
                />
              </div>
              <div class="col-6">
                <label for="inputTelefono" class="form-label">Teléfono</label>
                <div class="input-group">
                  <span class="input-group-text" id="basic-addon1">+34</span>
                  <input
                    v-model="telefono"
                    type="text"
                    class="form-control"
                    placeholder="Teléfono"
                    aria-label="telefono"
                    aria-describedby="basic-addon1"
                  />
                </div>
              </div>
              <div class="col-6">
                <label for="inputCP" class="form-label">CP</label>
                <input
                  v-model="cp"
                  type="text"
                  class="form-control"
                  id="inputCP"
                  placeholder="CP"
                />
              </div>
              <div class="col-md-6">
                <label for="inputEmail" class="form-label">Email</label>
                <input
                  v-model="email"
                  type="email"
                  class="form-control"
                  id="inputEmail"
                  placeholder="Email"
                />
              </div>
              <div class="col-md-6">
                <label for="inputTarjeta" class="form-label">Tarjeta Fidelización (Opcional)</label>
                <input
                  v-model="tarjeta"
                  type="text"
                  class="form-control"
                  id="inputTarjeta"
                  placeholder="Nº"
                />
              </div>
              <div class="col-12 text-center">
                <button @click="crearTarjeta()" class="btn btn-success">
                  Registrarse
                </button>
              </div>
              <!-- <div class="col-12">
                <button @click="enviarCorreo()" class="btn btn-success">
                  prueba
                </button>
              </div> -->
            </div>
          </div>
          <!-- ventajas -->
          <div v-else class="card-body">
            <div class="row">
              <div class="col-6">
                <img class="img-thumbnail" src="../assets/bandaDeFruta.png" alt="" />
                <div class="card-body">
                  <h5 class="card-title">Banda de frutas</h5>
                  <p class="card-text">13000 pts</p>
                </div>
              </div>
              <div class="col-6">
                <img class="img-thumbnail" src="../assets/padecoca.png" alt="" />
                <div class="card-body">
                  <h5 class="card-title">Pa de coca</h5>
                  <p class="card-text">2500 pts</p>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <img
                  class="img-thumbnail"
                  src="../assets/cafeconleche.png"
                  alt=""
                />
                <div class="card-body">
                  <h5 class="card-title">Café con leche</h5>
                  <p class="card-text">2335 pts</p>
                </div>
              </div>
              <div class="col-6">
                <img class="img-thumbnail" src="../assets/Joanets.jpg" alt="" />
                <div class="card-body">
                  <h5 class="card-title">Joanets</h5>
                  <p class="card-text">1000 pts</p>
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
import { ref } from "vue";
import Swal from "sweetalert2";
import QR from "qrious";
//import axios from "axios";
//import {nodemailer} from "nodemailer";
export default {
  name: "loginComponent",
  setup() {
    // Variables
    const error = ref(false);
    const changecolor = ref(true);
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
        });
      }
      // comprobar si los apellidos estan vacios
      if (apellidos.value == "") {
        error.value = true;
        Swal.fire({
          title: "Error",
          text: "Debes introducir tus apellidos",
          icon: "error",
        });
      }
      // comprobar si el telefono esta vacio
      if (telefono.value == "") {
        error.value = true;
        Swal.fire({
          title: "Error",
          text: "Debes introducir un telefono",
          icon: "error",
        });
      } else {
        // comprobar si el telefono tiene un tamaño de 9 digitos y solo introducen numeros no texto(isNaN)
        if (
          telefono.value.length < 9 ||
          telefono.value.length > 9 ||
          isNaN(telefono.value)
        ) {
          error.value = true;
          Swal.fire({
            title: "Error",
            text: "Debes introducir un telefono de 9 digitos",
            icon: "error",
          });
        }
      }
      // comprobar si el codigo postal esta vacio
      if (cp.value == "") {
        error.value = true;
        Swal.fire({
          title: "Error",
          text: "Debes introducir un codigo postal",
          icon: "error",
        });
      } else {
        //comprobar que el tamaño del codigo postal sea de 5 digitos y solo introduzca numeros no texto(isNaN)
        if (cp.value.length < 5 || cp.value.length > 5 || isNaN(cp.value)) {
          error.value = true;
          Swal.fire({
            title: "Error",
            text: "Debes introducir un codigo postal de 5 digitos",
            icon: "error",
          });
        }
      }
      // comprobar si el email esta vacio
      if (email.value == "") {
        error.value = true;
        Swal.fire({
          title: "Error",
          text: "Debes introducir un email",
          icon: "error",
        });
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
      if (
        (tarjeta.value != "" && tarjeta.value.length < 13) ||
        tarjeta.value.length > 13 ||
        isNaN(tarjeta.value)
      ) {
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
        };
        console.log(datos);

        //Crear QR para coger los datos del telefono
        const qr = new QR({});

        qr.backgroundAlpha = 0.8;
        qr.foregroundAlpha = 0.8;
        qr.level = "H";
        qr.padding = 20;
        qr.size = 300;
        qr.value = datos.telefono;
        // Generar el dataURL del código QR
        imagenQR.value = qr.toDataURL();

        // Llama a enviarCorreo después de crear la tarjeta QR
        enviarCorreo();
        //Crear una alert para mostrar que la tarjeta se ha creado correctamente y mostrarle el QR
        Swal.fire({
          title: "<strong>Revisa tu Email</strong>",
          icon: "success",
          //html: '<img src="' + imagenQR.value + '" alt="">',
          showCloseButton: true,
          focusConfirm: false,
          confirmButtonText: '<i class="fa fa-thumbs-up"></i> OK',
          confirmButtonAriaLabel: "Thumbs up, great!",
        });
      }
    }
    //Enviar correo electronico
    async function enviarCorreo() {
      let correoDetalles = {
        to: "ismael@solucionesit365.com",
        subject: "Nueva tarjeta creada",
        text: `Una nueva tarjeta ha sido creada para el usuario ${nombre.value} ${apellidos.value}.`,
        html: `<p>Una nueva tarjeta ha sido creada para el usuario ${nombre.value} ${apellidos.value}.</p><br><button style="background-color: black; color: white; border: 2px solid black; padding: 10px 20px; border-radius: 4px;">+ Añadir a Wallet</button>
        `,
      };

      // Realizar una solicitud POST a tu servidor Node.js
      try {
        let response = await fetch("http://localhost:3000/sendmail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(correoDetalles),
        });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    //Retornar variables y funciones
    return {
      changecolor,
      crearTarjeta,
      nombre,
      apellidos,
      telefono,
      cp,
      email,
      tarjeta,
      imagenQR,
      enviarCorreo,
    };
  },
};
</script>

<style>
.colorActive {
  background-color: #ff9800 !important;
  color: black !important;
  padding: 0.6rem !important; 
  
}

.colorInactive {
  background-color: #d7d9e7 !important;
  color: rgb(119, 119, 119) !important;
  padding: 0.6rem !important;
}
</style>
