const { MercadoPagoConfig, Preference } = require("mercadopago");
const UsuariosModel = require("../model/usuarios.model");
const { recuperarContrasenia } = require("../utils/messages.nodemailer.utils");
const jwt = require("jsonwebtoken");
const argon = require("argon2");

const mercadoPagoServices = async (carrito) => {
  try {
    const client = new MercadoPagoConfig({
      accessToken: process.env.MP_API_TOKEN,
    });

    const prefenrece = new Preference(client);
    const res = await prefenrece.create({
      body: {
        items: [
          {
            id: "Sound system",
            title: "Dummy Title",
            description: "Dummy description",
            picture_url: "https://www.myapp.com/myimage.jpg",
            category_id: "car_electronics",
            quantity: 1,
            currency_id: "ARS",
            unit_price: 2500,
          },
        ],
        back_urls: {
          success: `${process.env.FRONT_URL}/user/cart?success`, //url del front
          pending: `${process.env.FRONT_URL}/user/cart?pending`, //url del front
          failure: `${process.env.FRONT_URL}/user/cart?failure`, // url del front
        },
      },
    });

    /*  return {
      msg: "Compra realizada con exito",
      responseMp: res.sandbox_init_point,
      statusCode: 200,
    }; */

    return {
      msg: "Compra realizada con exito",
      responseMp: res.id,
      statusCode: 200,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

const recoveryPassUserServices = async (emailUsuario) => {
  try {
    const usuarioExiste = await UsuariosModel.findOne({ emailUsuario });

    if (!usuarioExiste) {
      return {
        msg: "ERR: Hubo un problema al intentar obtener el email solicitado",
        statusCode: 404,
      };
    }

    const payloadRecovery = {
      idUsuario: usuarioExiste._id,
    };

    const tokenRecoveryPass = jwt.sign(
      payloadRecovery,
      process.env.JWT_SECRET_RECOVERY
    );

    await recuperarContrasenia(emailUsuario, tokenRecoveryPass);
    return {
      msg: "Envio de correo exitoso",
      statusCode: 200,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

const changePassUserServices = async (token, nuevaContrasenia) => {
  try {
    const verificarUsuario = jwt.verify(token, process.env.JWT_SECRET_RECOVERY);
    if (!verificarUsuario) {
      return {
        msg: "Error al leer el token",
        statusCode: 400,
      };
    }

    const usuario = await UsuariosModel.findOne({
      _id: verificarUsuario.idUsuario,
    });

    const nuevaContraseniaHash = await argon.hash(nuevaContrasenia);

    usuario.contrasenia = nuevaContraseniaHash;

    await usuario.save();

    return {
      msg: "La contraseña se actualizo con exito",
      statusCode: 200,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

module.exports = {
  mercadoPagoServices,
  recoveryPassUserServices,
  changePassUserServices,
};
