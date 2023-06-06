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
                Registre
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
                Avantatges
              </button>
            </div>
          </div>
          <img
            v-if="changecolor"
            src="../assets/logo.png"
            class="card-img-top img-fluid mx-auto"
            alt="..."
            style="width: 15rem"
          />
          <div v-if="changecolor" class="div text-center">
            <h1>Aconsegueix el teu</h1>
            <h1 style="color: orange">CAFÈ O PA GRATIS</h1>
            <h1>només posant el teu mail</h1>
          </div>
          <template v-if="!mostrarForm">
            <div v-if="changecolor" class="col-md-12">
              <label for="inputEmail" class="form-label">Correu</label>
              <input
                v-model="email"
                type="email"
                class="form-control"
                id="inputEmail"
                placeholder="e-mail"
              />
              <div class="text-center">
                <button
                  @click="enviarCorreo()"
                  class="btn w-50 mt-2"
                  style="background-color: #fbca8b"
                >
                  Enviar email
                </button>
              </div>
            </div>
          </template>

          <div v-if="changecolor" class="div mt-2">
            <p>
              <img src="../assets/gorrito.png" alt="" width="20" />Formar part
              del #Club365 té la seva recompensa<img
                src="../assets/gorrito.png"
                alt=""
                width="20"
              />
            </p>
          </div>

          <template v-if="mostrarForm">
            <div v-if="changecolor" class="card-body">
              <div class="row g-3">
                <div class="col-6">
                  <label for="inputNombre" class="form-label">Nom</label>
                  <input
                    v-model="nombre"
                    type="text"
                    class="form-control"
                    id="inputNombre"
                    placeholder="Nom"
                  />
                </div>
                <div class="col-6">
                  <label for="inputApellidos" class="form-label">Cognoms</label>
                  <input
                    v-model="apellidos"
                    type="text"
                    class="form-control"
                    id="inputApellidos"
                    placeholder="Cognoms"
                  />
                </div>
                <div class="col-6">
                  <label for="inputTelefono" class="form-label">Telèfon</label>
                  <div class="input-group">
                    <span class="input-group-text" id="basic-addon1">+34</span>
                    <input
                      v-model="telefono"
                      type="text"
                      class="form-control"
                      placeholder="Telèfon"
                      aria-label="telefono"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                </div>
                <div class="col-6">
                  <label for="inputCP" class="form-label">Codi Postal</label>
                  <input
                    v-model="cp"
                    type="text"
                    class="form-control"
                    id="inputCP"
                    placeholder="Codi Postal"
                  />
                </div>
                <div class="col-12">
                  <label for="inputEmail" class="form-label">Correu</label>
                  <input
                    v-model="email"
                    type="text"
                    class="form-control"
                    id="inputEmail"
                    placeholder="e-mail"
                  />
                </div>
                <div class="col-12 text-center">
                  <button
                    @click="crearTarjeta()"
                    class="btn"
                    style="background-color: #fbca8b"
                  >
                    Unir-me al club
                  </button>
                </div>
                <!-- <div class="col-12">
                <button @click="enviarCorreo()" class="btn btn-success">
                  prueba
                </button>
              </div> -->
              </div>
            </div>
          </template>
          <div v-if="changecolor">
            <div class="form-check">
              <input
                v-model="mostrarForm"
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="form-check-label" for="flexCheckDefault">
                Fes-te membre del club
              </label>
            </div>
            <div class="form-check">
              <input
                v-model="newsletter"
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="form-check-label" for="flexCheckDefault">
                Subscriu-te a la newsletter
              </label>
            </div>
          </div>
          <!-- ventajas -->
          <div v-if="changecolor == false" class="card-body">
            <div class="row">
              <div class="col-6">
                <img
                  class="img-thumbnail"
                  src="../assets/bandaDeFruta.png"
                  alt=""
                />
                <div class="card-body">
                  <h5 class="card-title">Banda de fruites</h5>
                  <p class="card-text">13000 pts</p>
                </div>
              </div>
              <div class="col-6">
                <img
                  class="img-thumbnail"
                  src="../assets/padecoca.png"
                  alt=""
                />
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
                  <h5 class="card-title">Cafè amb llet</h5>
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

// import QR from "qrious";
import axios from "axios";
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
    const imagenQR = ref("");
    const mostrarForm = ref(false);
    const newsletter = ref(false);

    function crearTarjeta() {
      error.value = false;
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
      if (mostrarForm.value) {
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
      }
      // Controlar error
      if (!error.value) {
        console.log("Entra");
        let datos = null;
        if (mostrarForm.value) {
          datos = {
            nuevoCliente: true,
            newsletter: newsletter.value,
            email: email.value,
            nombre: nombre.value,
            apellidos: apellidos.value,
            telefono: telefono.value,
            codigoPostal: cp.value,
          };
        } else {
          datos = {
            nuevoCliente: false,
            newsletter: newsletter.value,
            email: email.value,
            nombre: nombre.value,
            apellidos: apellidos.value,
            telefono: telefono.value,
            codigoPostal: cp.value,
          };
        }

        // Llama a enviarCorreo después de crear la tarjeta QR
        console.log(datos);
        enviarCorreo(datos);
        //Crear una alert para mostrar que la tarjeta se ha creado correctamente y mostrarle el QR
        Swal.fire({
          title: "<strong>Revisa el teu correu</strong>",
          icon: "success",
          html: "<strong>i trobaràs la teva recompensa</strong>",
          //html: '<img src="' + imagenQR.value + '" alt="">',
          showCloseButton: true,
          focusConfirm: false,
          confirmButtonColor: "#FBCA9B",
          confirmButtonText: '<i class="fa fa-thumbs-up"></i> OK',
          confirmButtonAriaLabel: "Thumbs up, great!",
        });
      }
    }
    //Enviar correo electronico
    async function enviarCorreo(datos) {
      // Realizar una solicitud POST a tu servidor Node.js
      try {
        // "https://365equipo.cloud/clientes/clientsForm"
        const response = await axios.post(
          // "http://localhost:3000/clientes/clientsForm",
          "https://365equipo.cloud/clientes/clientsForm",
          datos
        );
        console.log(response);
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
      imagenQR,
      enviarCorreo,
      mostrarForm,
      newsletter,
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
