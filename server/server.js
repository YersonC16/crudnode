import express from 'express'
import mysql from 'mysql'
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crudts"
});

db.connect(err => {
    if (err) {
        console.error("Error conectando a la base de datos:", err);
        return;
    }
    console.log("Conectado a la base de datos MySQL");
});

app.get('/', (req, res) => {
    const sql = "SELECT * FROM student";
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error en la consulta:", err);
            return res.status(500).json({ message: "Error dentro del servidor" });
        }
        console.log("Datos enviados al frontend:", result); // Verifica qué se envía
        return res.json(result);
    });
});

app.post('/student', (req, res) =>{
    const sql = "INSERT INTO student (`name`, `email`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email
    ]
    db.query(sql, [values], (err, result) => {
        if(err) return res.json(err);
        return res.json(result);
    })
})

app.get('/read/:id', (req, res) => {
    const sql = "SELECT * FROM student WHERE ID = ?";
    const id = req.params.id;
    db.query(sql, [id],(err, result) => {
        if (err) {
            console.error("Error en la consulta:", err);
            return res.status(500).json({ message: "Error dentro del servidor" });
        }
        console.log("Datos enviados al frontend:", result); // Verifica qué se envía
        return res.json(result);
    });
});

app.put('/edit/:id', (req,res) =>{
    const sql = 'UPDATE student SET `name`=?, `email`=? WHERE id=? ';
    const id = req.params.id;
    db.query(sql, [req.body.name, req.body.email, id], (err, result)=>{
        if(err) return res.json({Message:"Error en el Servidor..."});
        return res.json(result);
    })
})

app.delete('/delete/:id', (req,res) =>{
    const sql = "DELETE FROM student WHERE id=?";
    const id = req.params.id;
    db.query(sql, [id], (err,result) => {
        if(err) return res.json({Message: "Error al eliminar dentro del servidor...."});
        return res.json(result);
    })
})

app.listen(8081, ()=>{
    console.log("Escuchando algo xd")
})