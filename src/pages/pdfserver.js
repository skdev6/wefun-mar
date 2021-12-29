const { PDFDocument,StandardFonts,rgb,degrees } =  require('pdf-lib');
const nodemailer = require("nodemailer");
const express = require("express");
const app = express();
const cors = require("cors");
const fs = require('fs');

// middleware
app.use(express.json());
app.use(cors());

let amount, date, name, title,email;
let pdfFile;
let signFile;
let pdfPath = "../../public/PDF/";
let serverPath = "http://d9e0-188-43-136-33.ngrok.io/";

async function embedImages() {

  const url = "../../public/" + 'PDFTemplate.pdf';
  let existingPdfBytes = fs.readFileSync(url);

  //const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())
  //const existingPdfBytes = await fs.read();
  console.log(existingPdfBytes.length);
  
  const pdfDoc = await PDFDocument.load(existingPdfBytes)
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

  const pages = pdfDoc.getPages()
  const firstPage = pages[0]
  const { width, height } = firstPage.getSize()
  console.log("width:"+width);
  console.log("height:"+height);

  firstPage.drawText(amount, {
    x: 167,
    y: 672,
    size: 12,
    font: helveticaFont,
    color: rgb(0, 0, 0)
  })
  firstPage.drawText(date, {
    x: 435,
    y: 672,
    size: 10,
    font: helveticaFont,
    color: rgb(0, 0, 0)
  })

  const nextpage = pages[4] //pdfDoc.addPage()
  nextpage.drawText(name, {
    x: 366,
    y: 415,
    size: 12,
    font: helveticaFont,
    color: rgb(0, 0, 0)
  })
  nextpage.drawText(title, {
    x: 366,
    y: 391,
    size: 12,
    font: helveticaFont,
    color: rgb(0, 0, 0)
  })
  nextpage.drawText(email, {
    x: 366,
    y: 367,
    size: 12,
    font: helveticaFont,
    color: rgb(0, 0, 0)
  })

  const signPNG = pdfPath + signFile;
  let pngImageBytes = fs.readFileSync(signPNG);
  //const jpgImageBytes = await fetch(jpgUrl).then((res) => res.arrayBuffer())
  //const pngImageBytes = await fetch(pngUrl).then((res) => res.arrayBuffer())
  //const pdfDoc = await PDFDocument.create()

  const pngImage = await pdfDoc.embedPng(pngImageBytes)
  // const pngDims = pngImage.scale(0.5)

  nextpage.drawImage(pngImage, {
    x: 340,
    y: 442,
    width: 150,
    height: 50,
  })

  const res = await pdfDoc.save({ dataUri: true });

  pdfFile = name + "_pdf.pdf";
  console.log("write file:" + pdfPath + pdfFile);
  fs.writeFileSync(pdfPath + pdfFile, res);
  return true;
}
function SendMail(){
  const htmlEmail = `
    <h3>Contact Details</h3>
    <h1><a href="${serverPath}${pdfPath}${pdfFile}">Click to see your pdf</a></h1>
    <h3>Message</h3>
    <p>Testing</p>
    `
  let mailOptions = {
    from: `alenzer0902@gmail.com`,
    to: "simkin0902@gmail.com",
    subject: 'Message from: server',
    html: htmlEmail,
    };
  
  let transporter = nodemailer.createTransport({
    // service: "gmail",
    host: 'smtp.gmail.com',
    port:587, 
    secure: false,
    requireTLS: true,
    auth: {
    // type: "OAuth2",
    user: "jameszook0902@gmail.com",
    pass: "ypsecskymkiccmxa",
    // clientId: '958471293842-kipnnfth137ajici3iuka6a92ltbn64e.apps.googleusercontent.com',
    // clientSecret: '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',
    // refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
    // tls: {rejectUnauthorized: false}
  });   
  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
        console.log(err)
        return false;
    } else {
        console.log("== Message Sent ==");
        return true;
    }
  });
}

app.post("/pdfmake", async function (req, res) {
  amount = req.body.Amount;
  date = req.body.Date;
  name = req.body.Name;
  title = req.body.Title;
  email = req.body.Email;

  const sign = req.body.Sign;

  let buff = Buffer.from(sign.substr(22), 'base64');
  signFile = name + "_sign.png";
  fs.writeFileSync(pdfPath + signFile, buff);

  await embedImages();
console.log("Create pdf file:"+pdfFile);
console.log("Sending email");
  SendMail();

  res.json({
    status: "success",
    data: pdfFile,
  });
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});