import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.listen(8787, () => {
    console.log("Server started!");
});

app.get("/", (req, res) => {
    res.send("Hello World!");
}
);


//add get request that check if the request body has name = "admin" and password = 123456
//path: localhost:8787/login
app.post("/login", (req, res) => {
    const body = req.body;
    if (body.name === "admin" && body.password === "123456") {
        res.statusCode = 200;
        res.send("Login success!");
    } else {
        res.statusCode = 401;
        res.send("Login failed!");
    }
});

// add post request that add new appointment to the appointments array and check in the array if the time is available or not
const appointments = [];

app.post("/appointment", (req, res) => {
    const body = req.body;
    let isAvailable = true;
    // from foreach loop to for of loop
    for (const appointment of appointments) {
        if (appointment.dateTime.y === body.dateTime.y
            && appointment.dateTime.m === body.dateTime.m
            && appointment.dateTime.d === body.dateTime.d) {
                if(appointment.dateTime.h-body.dateTime.h<1&&appointment.dateTime.h-body.dateTime.h>-1){
                    isAvailable = false;
                }
        }
    }

    if (isAvailable) {
        appointments.push(body);
        res.statusCode = 200;
        res.send("Appointment added successfully!");
    } else {
        res.statusCode = 400;
        res.send("Appointment is not available!");
    }
});

// add get request that return all appointments
app.get("/appointments", (req, res) => {
    res.send(appointments);
});

let services = [
    {
        name: "Tax Preparation",
        description: "We prepare everything you need for your tax return",
        price: "300",
    },
    {
        name: "Start-up Package",
        description: "We build financial models you can pitch to investors",
        price: "350",
    },
    {
        name: "Wealth Management",
        description: "We deliver thoughtful investment advisory services",
        price: "450",
    },
];

app.post("/service", (req, res) => {
    const serviceExists = services.find((service) => service.name === req.body.name);
    if (serviceExists) {
        res.statusCode = 400;
        res.send("Service already exists!");
        return;
    }
    const body = req.body;
    services.push(body);
    res.statusCode = 200;
    res.send("Service added successfully!");
});

app.get("/services", (req, res) => {
    res.send(services);
});

let businessData = {
    name: "Stratford Accounting",
    vision: "Expertise. Commitment. Value."
};

app.post("/businessData", (req, res) => {
    const body = req.body;
    businessData = body;
    res.statusCode = 200;
    res.send(businessData);
});


app.put("/businessData", (req, res) => {
    const body = req.body;
    businessData = body;
    res.statusCode = 200;
    res.send(businessData);
});

app.get("/businessData", (req, res) => {
    res.send(businessData);
});
