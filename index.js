var express = require('express') 
var cors = require('cors')
var bodyParser = require('body-parser')

var port = 2017
var arr=[{
    id:1,
    nama: 'Javascript',
    harga: 150000,
    description: 'mastering javascript'
},{
    id:2,
    nama: 'Android Kotlin',
    harga: 250000,
    description: 'Menjadi Android Kotlin expert'
},{
    id:3,
    nama: 'android java',
    harga: 100000,
    description: 'Pemrograman Web App'
}]
var app = express()
app.use(cors()) // eksekusi cros
app.use(bodyParser.json())


app.get('/', (req,res)=>{ 
    res.send('<h1>Hello guys</h1>')
}) 

app.get('/home', (req, res)=>{
    res.send({message: 'ini Home'})
})

app.get('/products/:id',(req, res)=>{
    console.log('masuk /products/id') // inputan user di dalam url pada address bar
    res.send(arr.filter((item)=> item.id == req.params.id)[0])
})

app.get('/products',(req, res)=>{
    // console.log('Masuk /products')
    console.log(req.query)
    var newArr = arr
    if(req.query.nama){
        console.log(req.query.nama)
        newArr = res.send(newArr.filter((item)=>item.nama.toLowerCase().includes(req.query.nama.toLowerCase())))
    }
    if(req.query.hargaMin){
        newArr = res.send(newArr.filter((item)=>item.harga >= parseInt(req.query.hargaMin)))
    }
    if(req.query.hargaMax){
        newArr = res.send(newArr.filter((item)=> item.harga <= parseInt(req.query.hargaMax) ))
    }
    
    res.send(newArr)
    
    // res.send(arr)
})

app.get('/test', (req,res)=>{
    try{
        console.log('Masuk Test')
        res.status(202).send('Request Test page berhasil.')
    }catch(err){
        console.log(err.message)
        res.status(500).send(err.message)
    }
})

// POST

app.post('/addproduct', (req, res) => {
    console.log(req.body)
    arr.push(req.body)
    res.status(201).send({ message:'Add product Success!', newData: arr})
})


app.listen(port, ()=> console.log(`API aktif di port ${port}`))