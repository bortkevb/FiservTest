const express = require('express');
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//req assumed as 
//"data": "JOHN0000MICHAEL0009994567"


app.post("/api/v1/parse",(req,res)=>{
    let props = {"data":{"firstName":"", "lastName":"", "clientId":""}};
    let ids=["","",""];
    let splitted=req.body.data.split(/(0)/g).filter(Boolean);
    let tot = 0;

    for (i = 0; i < ids.length; i++) {
        ids[i] += splitted[tot]; 
        tot++; 
        for (j = tot; j <= splitted.length; j++,tot++) {
            
            if (splitted[j] !== "0") {
                break;
            }
            else {
                ids[i] += splitted[j]; 
            }
        }
    }

    props.data.firstName = ids[0];
    props.data.lastName = ids[1];
    props.data.clientId = ids[2]; //.substr(0, 3) + "-" + ids[2].substr(4);   
    res.send(props);
})

app.post("/api/v2/parse",(req,res)=>{
    let props = {"data":{"firstName":"", "lastName":"", "clientId":""}};
    let splitted=req.body.data.split("0")
    splitted = splitted.filter(Boolean);
    
    props.data.firstName = splitted[0];
    props.data.lastName = splitted[1];
    props.data.clientId = splitted[2].substr(0, 3) + "-" + splitted[2].substr(4); 
   
    res.send(props);
})



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));