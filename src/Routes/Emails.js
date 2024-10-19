const { Router } = require("express");
const router = Router();

// Importar la librería Nodemailer
const nodemailer = require("nodemailer");
const { User } = require("../Models/User.model");
const { decode } = require("../Middlewares/secure");
//user: "unihopwheels@gmail.com"
//pass: "maito1234!",

const sendEmail = (mailOption) => {
  // Crear un objeto de transporte
  const transporter = nodemailer.createTransport({
    service: "gmail", // Usando Gmail
    auth: {
      user: "unihopwheels@gmail.com", // Tu correo de Gmail
      pass: "jrml vpsw bstp vbjr", // Tu contraseña de Gmail o contraseña de app
    },
  });

  transporter.sendMail(mailOption, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Email enviado: " + info.response);
    return info.response;
  });
};

router.post("/forgottenpass", async (req, res) => {
  try {
    const { userName } = req.body;
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const mailOption = {
      from: "UniHop Servicio de Wheels",
      to: user.email,
      subject: "Reestablecer contraseña",
      html: `<p>Hola, para reestablecer tu contraseña, haz clic en el
        siguiente enlace: <a href='http://localhost:3000/recovery-password'>Re
        establecer contraseña</a></p>`,
    };
    sendEmail(mailOption);
    res.json({ message: "Email sent" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Fallo algo Enviando el Email" + err.message });
  }
});

router.post("/validate", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(404).json({ message: "Email is required" });
    }
    const mailOption = {
      from: "UniHop Servicio de Wheels",
      to: email,
      subject: "Validación de cuenta",
      html: `<p>Hola, para validar tu cuenta, haz clic en el siguiente enlace
        <a href='http://localhost:3000/validate'>Validar cuenta</a></
        p>`,
    };
    sendEmail(mailOption);
    res.json({ message: "Email sent" });
  } catch (error) {
    res.status(500).send({ message: "Fallo algo" + error.message });
  }
});

module.exports = router;
