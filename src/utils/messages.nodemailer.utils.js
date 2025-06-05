const transporter = require("../helpers/nodemailer.helpers");

const registroExitoso = async (userEMail, nameUser) => {
  const info = await transporter.sendMail({
    from: `"Comision-Web-9" <${process.env.GMAIL_USER}>`,
    to: `${userEMail}`,
    subject: `Bienvenido  ${nameUser}✔`,
    text: "Gracias por tu registro!!!", // plain‑text body
    html: `
    <img src="https://i.pinimg.com/originals/37/1a/c8/371ac843551c2f299675c76d510eab62.gif" alt="gif1">
    <h1>Ya puedes ir a ver tu pagina y hacer compras</h1>
    `, // HTML body
  });

  return {
    info: info.response.includes("OK"),
    rejected: info.rejected,
  };
};

const recuperarContrasenia = async (userEMail, token) => {
  await transporter.sendMail({
    from: `"Comision-Web-9" <${process.env.GMAIL_USER}>`,
    to: `${userEMail}`,
    subject: `Recupera tu contraseña en pocos pasos✔`,
    text: "Haz click en el boton de abajo!!!", // plain‑text body
    html: `
    <img src="https://i.gifer.com/89WP.gif" alt="gif2">
    <h1>Ya falta menos para que puedas ingresar a tu cuenta de nuevo.</h1>
    <a href=${process.env.FRONT_URL}/recoveryPass?token=${token}>Ir a recuperar contraseña</a>
    `, // HTML body
  });
};

module.exports = {
  registroExitoso,
  recuperarContrasenia,
};
