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
            src="../../assets/logo.png"
            class="card-img-top img-fluid mx-auto"
            alt="..."
            style="width: 15rem"
          />
          <div v-if="changecolor" class="div text-center">
            <div style="position: relative; text-align: center">
              <!-- Imagen SVG como fondo -->
              <img
                src="../../assets/Recurso7.svg"
                alt="Recurso 7"
                style="width: 90%; height: auto"
              />

              <!-- Texto posicionado sobre la imagen -->
              <div class="texto-sobre-imagen">
                <h1>Et regalem un</h1>
                <h2>CAFÈ O UNA BARRA DE PA</h2>
                <h5>Inscriu-te amb el teu mail per a aconseguir-lo</h5>
              </div>
            </div>
          </div>
          <template v-if="!mostrarForm">
            <div v-if="changecolor" class="card-body row ms-2 g-2">
              <div class="col-12 col-md-8">
                <div class="input-group mb-3">
                  <span
                    class="input-group-text border-0 texto"
                    style="background-color: white"
                    id="basic-addon1"
                    >Correu electrònic:</span
                  >
                  <input
                    v-model="email"
                    type="email"
                    class="form-control"
                    id="inputEmail"
                    placeholder="e-mail"
                  />
                </div>
              </div>
              <div class="col-12 col-md-4">
                <button @click="enviarCorreo()" class="btn w-100">
                  <img
                    src="../../assets/Recurso8.svg"
                    alt="Recurso 7"
                    style="width: 90%; height: auto"
                  />
                </button>
              </div>
            </div>
          </template>
          <div v-if="changecolor" class="mt-1 text-center">
            <h5 class="texto">
              𝓕𝓸𝓻𝓶𝓪𝓻 𝓹𝓪𝓻𝓽 𝓭𝓮𝓵
              <span style="color: #e86d5a; font-weight: bold">#Club 365 </span>
              𝓽é 𝓶𝓸𝓵𝓽𝓼 𝓪𝓿𝓪𝓷𝓽𝓪𝓽𝓰𝓮𝓼
            </h5>
          </div>

          <div
            v-if="changecolor"
            class="d-flex flex-wrap justify-content-center p-2 mb-2"
          >
            <div class="form-check me-2 me-md-4 mb-2 mb-md-0">
              <input
                v-model="mostrarForm"
                class="form-check-input"
                type="checkbox"
                id="flexCheckDefault"
              />
              <label class="form-check-label texto" for="flexCheckDefault">
                Fes-te membre del club
              </label>
            </div>
            <div class="form-check">
              <input
                v-model="newsletter"
                class="form-check-input"
                type="checkbox"
                id="flexCheckNewsletter"
              />
              <label class="form-check-label texto" for="flexCheckNewsletter">
                Subscriu-te a la newsletter
              </label>
            </div>
            <!-- <p class="text-center mt-4 text-muted">
              En fer ús d'aquesta app acceptes les nostres
              <router-link to="/Politicas">
                <span class="fw-bold" style="color: #03a55a"
                  >polítiques de privacitat</span
                >
              </router-link>
            </p> -->
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
                  <label for="inputEmail" class="form-label"
                    >Correu electrònic</label
                  >
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
              </div>
            </div>
          </template>

          <!-- ventajas -->
          <div v-if="changecolor == false" class="card-body">
            <div class="row">
              <div class="col-6">
                <img
                  class="img-thumbnail"
                  src="../../assets/bandaDeFruta.png"
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
                  src="../../assets/padecoca.png"
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
                  src="../../assets/cafeconleche.png"
                  alt=""
                />
                <div class="card-body">
                  <h5 class="card-title">Cafè amb llet</h5>
                  <p class="card-text">2335 pts</p>
                </div>
              </div>
              <div class="col-6">
                <img
                  class="img-thumbnail"
                  src="../../assets/Joanets.jpg"
                  alt=""
                />
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
      if (mostrarForm.value) {
        // comprobar si el nombre esta vacio
        if (nombre.value == "") {
          error.value = true;
          Swal.fire({
            title: "Error",
            text: "Has d'introduir el teu nom",
            icon: "error",
          });
        }
        // comprobar si los apellidos estan vacios
        if (apellidos.value == "") {
          error.value = true;
          Swal.fire({
            title: "Error",
            text: "Has d'introduir els teus cognoms",
            icon: "error",
          });
        }
        // comprobar si el telefono esta vacio
        if (telefono.value == "") {
          error.value = true;
          Swal.fire({
            title: "Error",
            text: "Has d'introduir un telèfon",
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
              text: "Has d'introduir un telèfon de 9 digits",
              icon: "error",
            });
          }
        }
        // comprobar si el codigo postal esta vacio
        if (cp.value == "") {
          error.value = true;
          Swal.fire({
            title: "Error",
            text: "Has d'introduir un codi postal",
            icon: "error",
          });
        } else {
          //comprobar que el tamaño del codigo postal sea de 5 digitos y solo introduzca numeros no texto(isNaN)
          if (cp.value.length < 5 || cp.value.length > 5 || isNaN(cp.value)) {
            error.value = true;
            Swal.fire({
              title: "Error",
              text: "Has d'introduir un codi postal de 5 digits",
              icon: "error",
            });
          }
        }
        // comprobar si el email esta vacio
        if (email.value == "") {
          error.value = true;
          Swal.fire({
            title: "Error",
            text: "Has d'introduir un email",
            icon: "error",
          });
        } else {
          // comprobar si el email es valido
          if (!validEmail.test(email.value)) {
            error.value = true;
            Swal.fire({
              title: "Error",
              text: "El format de correu electrònic és incorrecte",
              icon: "error",
            });
          }
        }
      }
      // Llama a enviarCorreo después de crear la tarjeta QR
      enviarCorreo();
      // Controlar error
      if (!error.value) {
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
    function vaciarForm() {
      email.value = "";
      nombre.value = "";
      apellidos.value = "";
      cp.value = "";
      telefono.value = "";
    }
    //Enviar correo electronico
    async function enviarCorreo() {
      // comprobar si el email esta vacio
      if (email.value == "") {
        error.value = true;
        Swal.fire({
          title: "Error",
          text: "Has d'introduir un email",
          icon: "error",
        });
        return;
      } else {
        // comprobar si el email es valido
        if (!validEmail.test(email.value)) {
          error.value = true;
          Swal.fire({
            title: "Error",
            text: "El format de correu electrònic és incorrecte",
            icon: "error",
          });
          return;
        }
      }
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

      console.log(mostrarForm.value);
      console.log(datos);
      try {
        const response = await axios.post(
          //"http://localhost:3000/clientes/clientsForm",
          "https://api.365equipo.com/clientes/clientsForm",
          datos
        );
        console.log(response);
        if (response.data.ok) {
          console.log("entra");
          vaciarForm();

          //Crear una alert para mostrar que el email se ha enviado correctamente
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
      vaciarForm,
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
/* Estilos por defecto */
.texto-sobre-imagen {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.texto-sobre-imagen h1 {
  color: #e86d5a;
  margin: 0;
  font-size: 3em;
  font-weight: bold;
}

.texto-sobre-imagen h2 {
  color: #e86d5a;
  margin: 0;
  font-size: 1.8em;
  font-weight: bold;
}

.texto-sobre-imagen h5 {
  margin: 0;
  font-size: 1.07em;
  font-weight: bold;
}

/* Media queries para ajustar los estilos en dispositivos más pequeños */
@media (max-width: 810px) {
  .texto-sobre-imagen h1 {
    font-size: 0.9em; /* Tamaño más pequeño para móviles */
  }

  .texto-sobre-imagen h2 {
    font-size: 0.9em; /* Tamaño más pequeño para móviles */
  }

  .texto-sobre-imagen h5 {
    font-size: 0.7em; /* Tamaño más pequeño para móviles */
    font-weight: bold;
  }
  .texto {
    font-size: 0.7em; /* Tamaño más pequeño para móviles */
  }
}
</style>
