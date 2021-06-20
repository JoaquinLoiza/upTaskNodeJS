const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text');
const util = require('util');

if(process.env.NODE_ENV != 'production') {
  require('dotenv').config({path: 'variables.env'});
}

let transport = nodemailer.createTransport({
    host: process.env.EM_HOST,
    port: process.env.EM_PORT,
    auth: {
      user:process.env.EM_USER,
      pass: process.env.EM_PASS, 
    },
});

// generar html
const generarHTML = (archivo, opciones = {}) => {
  const html = pug.renderFile(`${__dirname}/../views/emails/${archivo}.pug`, opciones);
  return juice(html);
};

exports.enviar = async (opciones) => {
  const html = generarHTML(opciones.archivo, opciones);
  const text = htmlToText.fromString(html);
  let mailOptions = {
    from: 'UpTask <no-reply@uptask.com>',
    to: opciones.usuario.email,
    subject: opciones.subject,
    text: text,
    html: html,
  };
  const enviarEmail = util.promisify(transport.sendMail, transport);
  return enviarEmail.call(transport, mailOptions);
}
