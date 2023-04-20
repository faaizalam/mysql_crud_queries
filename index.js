import express from "express"
import mysql from "mysql"

const app=express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"faaiz",
    database:"crudweb"
})
const Port =5000

app.get("/",(req,res)=>{
    res.send("hello this is backend")
})
app.get("/books",(req,res)=>{
    let q="SELECT * FROM books"
    // let q = "SELECT * FROM books WHERE idbooks=?";

    db.query(q,(err,data)=>{
        if(err){
            return res.send("error")

        }
        res.send(data)
    })
})
app.get("/id",(req,res)=>{
    // let q="SELECT * FROM books"
    let q = "SELECT * FROM books WHERE idbooks=?";

    db.query(q,[2],(err,data)=>{
        if(err){
            return res.send("error")

        }
        res.send(data)
    })
})


// post create
app.post("/books",(req,res)=>{
    console.log(req.body)
    let q="INSERT INTO books (`book_title`,`desc`,`cover`) VALUES (?)"
    const values=["title from","desc from","cover from"]
    db.query(q,[values],(err,data)=>{
        if(err){
            return res.send("error")

        }
        res.send("been created sucessfully")
    })
})






// delete

app.delete("/book/delete",(req,res)=>{
    console.log(req.body.bid)
    const idbooks=Number(req.body.bid)

    const q="DELETE FROM books WHERE idbooks = ?"
    db.query(q,[idbooks],(err,data)=>{
        if (err) {
            return res.send("error in deleting",err)
        }
            res.send("deleted")


        let q="SELECT * FROM books"
    db.query(q,(err,data)=>{
        if(err){
            return res.send("error")

        }
    })
        

    })

})

app.put("/put",(req,res)=>{
    const id=req.body.bid
    const q="UPDATE books SET `book_title`=?,`desc`=?,`cover`=? WHERE idbooks=?"
    const values=["title updated from","desc updated from","cover updated from"]
    db.query(q,[...values,id],(err,data)=>{
        if (err) {
            return res.send("error")
        }
        res.send("been updated")
    })

})


app.listen(process.env.PORT||Port,()=>{
    console.log(`you server working on http://localhost:5000`)

})