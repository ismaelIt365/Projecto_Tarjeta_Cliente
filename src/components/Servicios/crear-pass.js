const fs = require("fs");
import { PKPass } from "passkit-generator";

// Define la plantilla de la tarjeta de fidelidad
const template = {
  formatVersion: 1,
  passTypeIdentifier: "pass.com.example.fidelidad",
  teamIdentifier: "ABCDEFG123",
  organizationName: "365 Pa, Cafè i molt més",
  description: "Tarjeta de fidelidad",
  logoText: "365 Pa, Cafè i molt més",
  foregroundColor: "rgb(255, 255, 255)",
  backgroundColor: "rgb(50, 50, 50)",
  images:{
    logo: fs.readFileSync(__dirname + "/logo.png"),
    icon: fs.readFileSync(__dirname + '/logo.ico'),
  },
  barcode: {
    message: "1234567890",
    format: "PKBarcodeFormatQR",
    messageEncoding: "iso-8859-1",
  },
  storeCard: {
    headerFields: [
      {
        key: "header",
        label: "Saldo",
        value: "10 Puntos",
      },
    ],
    primaryFields: [
      {
        key: "member",
        label: "Miembro",
        value: "John Doe",
      },
    ],
  },
};

// Crea la tarjeta de fidelidad
const pass = new PKPass(template);

// Añade imágenes a la tarjeta (logo, icono, etc.)
// pass.images.logo = fs.readFileSync(__dirname + "/logo.png");
// pass.images.icon = fs.readFileSync(__dirname + "/logo.ico");


// Genera el archivo .pkpass
pass.generate()
  .then((buffer) => {
    fs.writeFileSync("tarjeta-fidelidad.pkpass", buffer);
    console.log("Se ha creado el archivo tarjeta-fidelidad.pkpass");
  })
  .catch((error) => {
    console.error("Error al generar el archivo de pase:", error);
  });
