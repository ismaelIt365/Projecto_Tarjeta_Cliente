const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

// // Asegúrate de que Express sirva archivos .pkpass con el tipo de contenido correcto
// app.use(express.static('public', {
//   setHeaders: (res, path) => {
//     if (path.endsWith('.pkpass')) {
//       res.setHeader('Content-Type', 'application/vnd.apple.pkpass');
//     }
//   }
// }));

app.post("/sendmail", async (req, res) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ismael@solucionesit365.com", // reemplaza con tu correo
      pass: "tlznrguetfpsbdbz", // reemplaza con tu contraseña
    },
  });

  let mailOptions = {
    from: "ismael@solucionesit365.com",
    to: req.body.to,
    subject: req.body.subject,
    text: req.body.text,
    attachDataUrls: true,//to accept base64 content in messsage
    html: req.body.html,
    
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("error");
    } else {
      console.log("Email sent: " + info.response);
      res.send("Success");
    }
  });
});

app.listen(3000, () => console.log("Server started..."));
