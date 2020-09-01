const express = require('express'),
      bp = require('body-parser'),
      qrC = require('qrcode');


const app = express();

app.set('view engine', 'ejs');
app.use(bp.urlencoded({ extended: false}));
app.use(bp.json());
app.use(express.static('public'));

const port = process.env.PORT || 3000;

app.get('/', (req, res) =>{
    res.render('app')
});

app.post('/scan', (req, res) =>{
    const bDy = req.body;
    if(bDy.name && bDy.phone){
        let temp = [];
        let name = {data: bDy.name};
        temp.push(name);
                    
        let phone = {data: bDy.phone};
        temp.push(phone);

        qrC.toDataURL(temp, {errorCorrectionLevel: 'H'} ,(err, data)=>{
            if(err) res.send('<h1>Error occured</h1>');
            
            console.log(data);
            res.redirect('/');

        })

    }else{
        res.send('<h1>Empty Data</h1>');
    }
})

app.listen(port, () => {console.log(`listen on localhost:${port}`)});