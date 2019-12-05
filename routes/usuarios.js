const express = require('express');
const router = express.Router();
//modelos
const usuarios = require('../model/usuarios');

router.post('/usuario/add', async (req, res) => {
    const { id, nombre, apellido, edad } = req.body;
    const data_users = {
        id,
        nombre,
        apellido,
        edad
    };
    console.log(data_users);
   const idInsert = await usuarios.Insert(data_users);
   console.log(idInsert);
   if(idInsert){
    res.json({"mensaje": "success"});
   }else{
    res.json({"mensaje": "danger"});
   }  
});
router.put('/usuario/update', async (req, res) => {
    const { id, nombre, apellido, edad } = req.body;
    const data_users = {
        nombre,
        apellido,
        edad
    };
    console.log(data_users);
   const result = await usuarios.Update(data_users, id);
   console.log(result);
   if(result){
    res.json({"mensaje": "success"});
   }else{
    res.json({"mensaje": "danger"});
   }  
});

router.delete('/usuario/deleter/:id', async (req, res) => {
    const { id } = req.params;
    const result = await usuarios.Delete(id);
    console.log(result);
    if(result){
        res.json({"mensaje": "success"});
       }else{
        res.json({"mensaje": "danger"});
       } 
});

router.get('/usuario/findall', async (req, res) => {
    const colls = await usuarios.FindAll();
    console.log(colls);
    res.json(colls);
});

router.get('/usuario/find/:id', async (req, res) => {
    const { id } = req.params;
    const result = await usuarios.Find(id);
    console.log(result);
    res.json(result);
});

module.exports = router;