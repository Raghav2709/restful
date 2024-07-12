const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.model.js")
const app = express();


app.use(express.json())

app.listen(3000, () => {
    console.log("app running on server 3000")
});


app.get('/', (req, res) => {
    res.send("Hello from Node API");
})

app.get('/api/products', async (req,res) => {
    try {
         const products = await Product.find({});
         res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/api/product/:id', async (req,res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//update a product
app.put('/api/product/:id', async (req, res) => {
    try {
        const {id} = req.params;

        const product = await Product.findByIdAndUpdate(id, req.body);

        if(!product){
            return res.status(404).json({message: "Product not found"})
        }

        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


app.post('/api/products', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


//delete a product

app.delete('/api/product/:id', async (req, res) => {
    try {
      const {id} = req.params;
     const product =  await Product.findByIdAndDelete(id);

     if(!product){
        return res.status(404).json({message: "Product not found"})
     }

     res.status(200).json({message:"product deleted successfully"})

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


mongoose.connect("mongodb+srv://kakraniachirag:Kakrania123@cluster0.iqtaspe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() => {
    console.log("db connected")
}).catch(() => {
    console.log("db error")
})