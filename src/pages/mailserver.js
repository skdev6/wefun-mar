const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const cors = require("cors");
require("dotenv").config();

// middleware
app.use(express.json());
app.use(cors());

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
    type: "OAuth2",
    user: "wefund.project@gmail.com",
    pass: process.env.WORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
});
    // transporter.verify((err, success) => {
    // err
    // ? console.log(err)
    // : console.log(`=== Server is ready to take messages: ${success} ===`);
    // });

app.post("/sendproject", function (req, res) {
    console.log("Send project");
    
    const htmlEmail = `
    <h3>Contact Details</h3>
    <ul>
        <li>Name: ${req.body.Pjname}</li>
        <li>Email: ${req.body.Pjemail}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.Pjtdescription}</p>
    `

    let mailOptions = {
    from: `${req.body.Pjemail}`,
    to: "wefundofficial@gmail.com",
    subject: `Message from: ${req.body.Pjdescription}`,
    text: htmlEmail,
    };

    transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
        console.log(err)
        res.json({
        status: "fail",
        });
    } else {
        console.log("== Message Sent ==");
        res.json({
        status: "success",
        });
    }
    });
    });

    let helptransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
        type: "OAuth2",
        user: "wefund.help@gmail.com",
        pass: process.env.WORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        },
    });
        // transporter.verify((err, success) => {
        // err
        // ? console.log(err)
        // : console.log(`=== Server is ready to take messages: ${success} ===`);
        // });
    
    app.post("/sendhelp", function (req, res) {
        
        const htmlEmail = `
        <h3>Contact Details</h3>
        <ul>
            <li>Name: Customer</li>
            <li>Email: ${req.body.helperemail}</li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.helperdescription}</p>
        `
    
        let mailOptions = {
        from: `${req.body.helperemail}`,
        to: "wefundofficial@gmail.com",
        subject: `Message from: ${req.body.helperdescription}`,
        text: htmlEmail,
        };
    
        helptransporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log(err)
            res.json({
            status: "fail",
            });
        } else {
            console.log("== Message Sent ==");
            res.json({
            status: "success",
            });
        }
        });
        });
    

    const port = 3001;
    app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
    });


