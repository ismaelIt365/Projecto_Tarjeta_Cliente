<template>
  <div class="landing-container" :lang="content.locale" :style="{ '--landing-background': content.backgroundColor, '--landing-primary': content.primaryColor, '--landing-accent': content.accentColor }">
    <div class="content-wrapper">
      <!-- Header Section -->
      <header class="header">
        <div class="header-main-row">
          <div
            class="logo-container"
            :class="{ 'content-hidden': !content.showLogo }"
          >
            <img
              :src="content.logoUrl || defaultLogo"
              @error="imageFallback($event, defaultLogo)"
              alt="365 Obrador"
              class="logo"
            />
          </div>
          <div class="headline-container">
            <h1
              class="headline"
              :class="{ 'content-hidden': !content.showHeadline }"
            >
              {{ content.headline }}
              <span class="bold">{{ content.headlineBold }}</span>
            </h1>
            <div
              class="address-pill desktop-only"
              :class="{
                'content-hidden':
                  !content.showAddress || !content.address.trim(),
              }"
            >
              {{ content.address }}
            </div>
          </div>
        </div>
        <div class="address-pill-mobile mobile-only">
          <div
            class="address-pill"
            :class="{
              'content-hidden': !content.showAddress || !content.address.trim(),
            }"
          >
            {{ content.address }}
          </div>
        </div>
      </header>

      <!-- Main Promotional Section -->
      <section class="promo-section">
        <div
          class="promo-text-container"
          :class="{ 'content-hidden': !content.showPromoText }"
        >
          <p class="promo-text">
            <template
              v-for="(line, index) in content.intro.split('\n')"
              :key="index"
              >{{ line }}<br /></template
            ><span class="bold">{{ content.offerFirst }}</span>
            {{ content.offerJoin }}
            <span class="bold">{{ content.offerSecond }}</span>
          </p>
        </div>
        <div
          class="promo-image-container"
          :class="{ 'content-hidden': !content.showPromoImage }"
        >
          <img
            :src="content.imageUrl || defaultImage"
            @error="imageFallback($event, defaultImage)"
            :alt="content.imageAlt"
            class="promo-image"
          />
        </div>
      </section>

      <!-- Form Section -->
      <section class="form-section">
        <h2 class="form-title">{{ content.formTitle }}</h2>

        <p v-if="inaugurationLoading" role="status">Comprovant inauguració…</p>
        <p v-else-if="inaugurationError" role="alert">
          {{ inaugurationError }}
        </p>
        <p v-else-if="inaugurationStore">{{ inaugurationStore }}</p>
        <form
          v-if="!mostrarForm"
          @submit.prevent="enviarCorreo"
          class="subscription-form"
        >
          <div class="input-group">
            <label for="email-input" class="visually-hidden">{{
              content.emailPlaceholder
            }}</label>
            <input
              id="email-input"
              type="email"
              v-model="email"
              :placeholder="content.emailPlaceholder"
              required
              class="email-input"
            />
          </div>

          <button
            type="submit"
            class="submit-button"
            :disabled="inaugurationLoading || !!inaugurationError"
          >
            {{ content.buttonText }}
          </button>

          <div v-if="content.showNewsletterCheckbox" class="checkbox-group">
            <label class="checkbox-container">
              <input type="checkbox" v-model="newsletter" />
              <span class="checkmark"></span>
              {{ content.newsletterLabel }}
            </label>
          </div>
        </form>
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
      </section>

      <!-- Footer Section -->
      <footer class="footer">
        <p class="footer-text">
          {{ content.privacyText }}
          <a
            :href="content.privacyUrl"
            rel="noopener noreferrer"
            target="_blank"
            class="footer-link"
            >{{ content.privacyLabel }}</a
          >
        </p>
      </footer>
    </div>
  </div>
</template>

<script>
import { useInauguration } from "../../promotions/useInauguration";
import { usePromotion, imageFallback } from "../../promotions/usePromotion";
import defaultLogo from "../../assets/flayer/Frame.png";
import defaultImage from "../../assets/flayer/cafe-croissant.png";

import { ref } from "vue";
import Swal from "sweetalert2";
// import QR from "qrious";
import axios from "axios";
//import {nodemailer} from "nodemailer";
export default {
  name: "loginComponent",
  setup() {
    const inauguration = useInauguration(
      "catalunya",
      process.env.VUE_APP_SERVICE_URL || "https://api.365equipo.com",
    );
    const content = usePromotion(
      "catalunya",
      process.env.VUE_APP_SERVICE_URL || "https://api.365equipo.com",
    );
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
    const newsletter = ref(true);

    function crearTarjeta() {
      if (
        inauguration.inaugurationLoading.value ||
        inauguration.inaugurationError.value
      )
        return;
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
      if (
        inauguration.inaugurationLoading.value ||
        inauguration.inaugurationError.value
      )
        return;
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
          newsletter: content.value.showNewsletterCheckbox && newsletter.value,
          email: email.value,
          nombre: nombre.value,
          apellidos: apellidos.value,
          telefono: telefono.value,
          codigoPostal: cp.value,
        };
      } else {
        datos = {
          nuevoCliente: false,
          newsletter: content.value.showNewsletterCheckbox && newsletter.value,
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
          // "http://localhost:3000/clientes/clientsForm",
          `${
            process.env.VUE_APP_SERVICE_URL || "https://api.365equipo.com"
          }/clientes/clientsForm`,
          {
            ...datos,
            ...(inauguration.inauguracionId
              ? { inauguracionId: inauguration.inauguracionId }
              : {}),
          },
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
        Swal.fire({
          icon: "error",
          html: "<strong>Aquest correu ja ha estat utilitzat</strong>",
          showCloseButton: true,
          focusConfirm: false,
          confirmButtonColor: "#FBCA9B",
          confirmButtonText: '<i class="fa fa-thumbs-up"></i> OK',
          confirmButtonAriaLabel: "Thumbs up, great!",
        });
      }
    }

    //Retornar variables y funciones
    return {
      ...inauguration,
      content,
      defaultLogo,
      defaultImage,
      imageFallback,
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
@font-face {
  font-family: "HvDTrial Livory";
  src: url("../../assets/flayer/fonts/Livory-Regular.otf") format("opentype");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "HvDTrial Livory";
  src: url("../../assets/flayer/fonts/Livory-Bold.otf") format("opentype");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Proxima Nova";
  src: url("../../assets/flayer/fonts/ProximaNovaSoft-Regular.ttf")
    format("truetype");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Proxima Nova";
  src: url("../../assets/flayer/fonts/ProximaNovaSoft-Medium.ttf")
    format("truetype");
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Proxima Nova";
  src: url("../../assets/flayer/fonts/ProximaNovaSoft-Semibold.ttf")
    format("truetype");
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Proxima Nova";
  src: url("../../assets/flayer/fonts/ProximaNovaSoft-Bold.ttf")
    format("truetype");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

/* Versión específica para el botón con redondeado forzado */
@font-face {
  font-family: "Proxima Nova Soft";
  src: url("../../assets/flayer/fonts/ProximaNovaSoft-Semibold.ttf")
    format("truetype");
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}
</style>
<style scoped>
.content-hidden {
  visibility: hidden;
}

.landing-container {
  height: auto; /* Cambiado de min-height: 100vh para que no fuerce espacio extra */
  background-color: var(--landing-background, #ece9e3);
  font-family: "Proxima Nova", sans-serif;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 2.5rem;
  padding-bottom: 2.5rem; /* Añadido para que el footer no pegue abajo */
  color: #413029;
  animation: fadeIn 0.3s ease-out; /* Reducido de 0.8s para que sea más instantáneo */
  box-sizing: border-box;
  overflow-x: hidden;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.content-wrapper {
  width: 100%;
  text-align: center;
}

/* Header Styles */
.header {
  display: flex;
  flex-direction: column;
  gap: 0.9375rem;
  margin-bottom: 1.25rem;
  position: relative;
  z-index: 2;
}

.header-main-row {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 30px;
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo {
  width: 8.125rem; /* 130px */
  height: 6.6525rem; /* 106.44px */
  object-fit: contain;
}

.headline-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.headline {
  font-family: "Proxima Nova", sans-serif;
  width: 11.375rem; /* 182px */
  height: auto;
  font-size: 2.0625rem; /* 33px */
  line-height: 1.1;
  font-weight: 400; /* Regular */
  margin: 0;
  color: #413029;
  text-transform: uppercase;
  text-align: start; /* Center text */
}

.bold {
  font-weight: 700;
}

.address-pill {
  background-color: var(--landing-accent, #e66c5a);
  color: #413029;
  width: 18.125rem; /* 290px */
  height: 2.25rem; /* 36px */
  border-radius: 3.125rem;
  font-size: 1.5rem;
  font-weight: 600; /* Semibold */
  box-shadow: 0 0.25rem 0.375rem rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  margin-left: auto;
  margin-right: auto;
}

.address-pill-mobile {
  width: 100%;
  display: flex;
  justify-content: center;
}

/* Keep the header spacing and logo position when the address is blank. */
.address-pill:empty {
  visibility: hidden;
}
/* Promo Section Styles */
.promo-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.promo-text-container {
  width: 21.4375rem; /* 343px */
  height: auto; /* Changed to auto to fit long text */
  min-height: 5.125rem;
  margin-bottom: 0.5rem;
}

.promo-text {
  font-family: "HvDTrial Livory", serif;
  font-size: 1.2rem; /* Slighly smaller for mobile (from 1.4rem) */
  font-weight: 400; /* Regular */
  line-height: 1.2;
  color: #413029;
  text-transform: uppercase;
  margin: 0;
}

.promo-image-container {
  width: 19.1875rem; /* 307px */
  height: 14rem; /* 224px */
}

.promo-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* Form Section Styles */
.form-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: -10px;
}

.form-title {
  font-family: "HvDTrial Livory", serif;
  width: 27.0625rem !important; /* 433px */
  height: 1.6875rem !important; /* 27px */
  font-size: 1.6875rem; /* 27px */
  line-height: 1.6875rem;
  font-weight: 400; /* Regular */
  margin: 0 0 30px;
  text-transform: uppercase;
  color: #413029;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.subscription-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
}

.input-group {
  width: 19.4375rem !important; /* 311px / 16 */
  height: 1.375rem !important; /* 22px / 16 */
  display: flex;
  align-items: flex-end;
}

.email-input {
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  border-bottom: 0.0625rem solid #413029; /* 1px line */
  padding: 0;
  font-size: 0.875rem; /* 14px approx */
  text-align: center;
  outline: none;
  color: #413029;
  font-family: "Proxima Nova", sans-serif;
  line-height: 1.375rem;
}

.email-input::placeholder {
  color: #413029;
  opacity: 0.6;
  font-size: 0.9rem;
}

.submit-button {
  background-color: var(--landing-primary, #ea7463);
  color: #fff;
  border: none;
  font-family: "Proxima Nova Soft", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 1.5rem; /* 24px / 16 */
  font-weight: 600; /* Semibold */
  border-radius: 0.25rem;
  cursor: pointer;
  width: 12.5rem !important; /* 200px / 16 */
  height: 2.6875rem !important; /* 43px / 16 */
  padding: 0;
  line-height: 2.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.0625rem;
}

.checkbox-container {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 0.85rem;
}

.checkbox-container input {
  margin-right: 10px;
  background-color: #d9d9d9;
  width: 1.1875rem; /* 19px */
  height: 1.1875rem; /* 19px */
  border: 1px solid #413029;
}

/* Footer */
.footer {
  margin-top: 0px;
}

.footer-text {
  font-size: 0.75rem;
  color: #413029;
}

.footer-link {
  color: #413029;
  text-decoration: underline;
}

/* Desktop Styles */
@media (min-width: 768px) {
  .landing-container {
    padding-top: 7.25rem; /* 196px */
    align-items: flex-start;
  }

  .content-wrapper {
    max-width: 1200px;
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  .header {
    margin-bottom: 0;
    position: relative;
    z-index: 2;
  }

  .header-main-row {
    gap: 55px; /* (809 - 528) - 226 = 55px */
    align-items: flex-start;
  }

  .logo {
    width: 14.125rem !important; /* 226px */
    height: 11.5625rem !important; /* 185px */
    max-width: none;
    object-fit: contain;
    margin-bottom: -1rem; /* Pull image up even more */
  }

  .headline-container {
    margin-top: 1.375rem; /* 22px */
    align-items: center;
  }

  .headline {
    font-size: 3.3125rem; /* 53px */
    white-space: nowrap;
    width: 31.3125rem; /* 501px */
    height: 3.3125rem; /* 53px */
    text-align: center;
    font-weight: 400; /* Regular */
  }

  .address-pill {
    background-color: var(--landing-accent, #e66c5a);
    font-size: 2.7rem; /* Increased from 2.7rem to feel more substantial */
    font-weight: 600;
    color: #413029;
    letter-spacing: -0.05rem;
    line-height: 1.3;
    margin-top: 1rem;
    width: 32.49rem; /* Increased from 32.5rem to be clearly wider than the 31rem headline */
    height: 3.5rem;
    border-radius: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    box-shadow: 0 0.25rem 0.375rem rgba(0, 0, 0, 0.1);
    white-space: nowrap;
    text-transform: uppercase;
  }

  .promo-section {
    flex-direction: row-reverse;
    justify-content: center;
    align-items: center;
    text-align: left;
    margin-top: -3.5rem;
    gap: 4rem;
    position: relative;
    z-index: 1;
  }

  .promo-text-container {
    width: 34.5625rem !important; /* 553px */
    height: 9.1875rem !important; /* 147px */
    display: block;
    flex-shrink: 0;
    position: relative;
    left: -7rem; /* Increased push to be right next to the coffee board */
  }

  .promo-image-container {
    flex: none;
    width: 34.3125rem; /* 549px */
    height: 25.0625rem; /* 401px */
    max-width: none;
  }

  .promo-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .promo-text {
    font-size: 2.5rem; /* 40px */
    line-height: 1;
    text-align: left;
    font-weight: 400;
    width: 34.5625rem; /* 553px */
    margin: 0;
  }

  .form-title {
    font-size: 3.0625rem; /* 49px font height approx */
    width: 48.375rem !important; /* 774px */
    height: 3.0625rem !important; /* 49px */
    line-height: 3.0625rem;
    margin-left: 9rem;
    margin-right: auto;
    margin-bottom: 6.75rem;
    display: block;
    white-space: nowrap;
    margin-top: -1.5rem;
  }

  .input-group {
    width: 30rem !important; /* 480px / 16 */
    height: 2.4375rem !important; /* 39px / 16 */
    max-width: none;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    align-items: flex-end;
    margin-bottom: 1.5rem;
  }

  .email-input {
    width: 100% !important;
    font-size: 1.5rem; /* 24px */
    line-height: 2.4375rem;
    padding: 0;
    border-bottom: 0.0625rem solid #413029;
  }

  .email-input::placeholder {
    font-size: 1.5rem; /* Match input text size */
    opacity: 0.6;
  }

  .submit-button {
    width: 22.4375rem !important; /* 359px / 16 */
    height: 4.8125rem !important; /* 77px / 16 */
    max-width: none;
    padding: 0;
    font-family: "Proxima Nova Soft", sans-serif;
    font-weight: 600; /* Proxima Nova Semi Bold */
    line-height: 4.8125rem;
    font-size: 1.875rem; /* 30px */
    letter-spacing: 0.1rem;
    margin-bottom: 1.5rem;
  }

  .checkbox-container {
    font-size: 1.1875rem; /* 19px */
    width: 15.75rem; /* 252px */
    height: 1.375rem; /* 22px */
    justify-content: center;
  }

  .footer {
    width: 39.6875rem; /* 635px */
    height: 1.375rem; /* 22px */
    margin-left: auto;
    margin-right: auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .footer-text {
    font-size: 1.1875rem; /* 19px */
    font-weight: 400;
  }
}

/* Helpers */
.desktop-only {
  display: none;
}

.mobile-only {
  display: block;
}

@media (min-width: 768px) {
  .desktop-only {
    display: block;
  }
  .mobile-only {
    display: none;
  }
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

/* Fit the Catalan heading and the host Bootstrap container. */
.landing-container {
  width: 100vw;
  margin-left: calc(50% - 50vw);
  min-height: 100vh;
}
.form-title {
  max-width: calc(100vw - 32px);
  height: auto !important;
  white-space: nowrap;
}
.checkbox-container {
  width: auto;
}
@media (max-width: 767px) {
  .form-title {
    font-size: 1.4rem;
    white-space: normal;
  }
}
</style>
