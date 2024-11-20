const { Router } = require("express");
const router = Router();
require("dotenv").config();

// Importar la librería Nodemailer
const nodemailer = require("nodemailer");
const { User } = require("../Models/User.model");
const { newUser } = require("../Middlewares/secure");

const sendEmail = (mailOption) => {
  // Crear un objeto de transporte
  const transporter = nodemailer.createTransport({
    service: "gmail", // Usando Gmail
    auth: {
      user: process.env.EmailUser, // Tu correo de Gmail
      pass: process.env.EmailPass, // Tu contraseña de Gmail o contraseña de app
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

const templateHtml = (add) => {
  return `<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <tr>
            <td align="center" bgcolor="#003366" style="padding: 40px 0;">
                <h1 style="color: #ffffff; font-size: 24px; margin: 0;">UniHop</h1>
            </td>
        </tr>
        <tr>
            <td style="padding: 40px 30px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                        <td>
                            <table border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    ${add}
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
                <p style="color: #666666; font-size: 14px; line-height: 20px; margin: 0;">
                    &copy; 2023 UniHop. Todos los derechos reservados.
                </p>
            </td>
        </tr>
    </table>
</body>`;
};

/*

<h2 style="color: #003366; font-size: 20px; margin: 0 0 20px 0;">Estimado Usuario,</h2>
                            <p style="color: #333333; font-size: 16px; line-height: 24px; margin: 0 0 20px 0;">
                                Esperamos que este mensaje te encuentre bien. Queremos informarte sobre las últimas novedades y oportunidades disponibles en UniHop.
                            </p>
                            <p style="color: #333333; font-size: 16px; line-height: 24px; margin: 0 0 20px 0;">
                                UniHop se dedica a mejorar la experiencia universitaria de nuestros estudiantes. Hemos implementado nuevas características en nuestra plataforma para hacer tu vida académica más fácil y productiva.
                            </p>
                            <p style="color: #333333; font-size: 16px; line-height: 24px; margin: 0 0 30px 0;">
                                Para conocer más sobre estas novedades y cómo pueden beneficiarte, te invitamos a visitar nuestra página de información:
                            </p>

<td align="center" bgcolor="#003366" style="border-radius: 4px;">
                                        <a href='http://localhost:3000/validate/${token}' target="_blank" style="display: inline-block; padding: 16px 36px; font-size: 16px; color: #ffffff; text-decoration: none;">Ver Novedades</a>
                                    </td>

`<p>Hola, para validar tu cuenta, haz clic en el siguiente enlace
        <a href='http://localhost:3000/validate/${token}'>Validar cuenta</a></
        p>`
*/

router.post("/forgottenpass", async (req, res) => {
  try {
    const { userName } = req.body;
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const html = `<td align="center" bgcolor="#003366" style="border-radius: 4px;">
                                        <a href='${process.env.URL_FRONTEND}?token=${token}' target="_blank" style="display: inline-block; padding: 16px 36px; font-size: 16px; color: #ffffff; text-decoration: none;">Ver Novedades</a>
                                    </td>`;
    const messageHtml = templateHtml(html);
    const mailOption = {
      from: "UniHop Servicio de Wheels",
      to: user.email,
      subject: "Reestablecer contraseña",
      html: messageHtml,
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
    const token = await newUser(req.body);
    const { email } = req.body;
    if (!email) {
      return res.status(404).json({ message: "Email is required" });
    }
    const html = `<td align="center" bgcolor="#003366" style="border-radius: 4px;">
                                        <a href='${process.env.URL_FRONTEND}/verify-email?token=${token}' target="_blank" style="display: inline-block; padding: 16px 36px; font-size: 16px; color: #ffffff; text-decoration: none;">Ver Novedades</a>
                                    </td>`;
    const messageHtml = templateHtml(html);
    const mailOption = {
      from: "UniHop Servicio de Wheels",
      to: email,
      subject: "Validación de cuenta",
      html: messageHtml,
    };
    sendEmail(mailOption);
    res.json({ message: "Email sent" });
  } catch (error) {
    res.status(500).send({ message: "Fallo algo" + error.message });
  }
});

module.exports = router;
