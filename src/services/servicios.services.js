const { MercadoPagoConfig, Preference } = require("mercadopago");

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
          success: "http://localhost:5173/success", //url del front
          pending: "http://localhost:5173/pending", //url del front
          failure: "http://localhost:5173/failure", // url del front
        },
      },
    });

    console.log(res);

    return {
      msg: "Compra realizada con exito",
      responseMp: res.sandbox_init_point,
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      error,
      statusCode: 500,
    };
  }
};

module.exports = mercadoPagoServices;
