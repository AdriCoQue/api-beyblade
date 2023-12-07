const express = require('express')
const router = express.Router()
const Beyblade = require('../models/beyblades')
const upload = require('../libs/storage') //cargar codigo para subir archivos


//GET todos los beyblades
router.get('/', async (req,res)=>{
    try{
        const beyblades = await Beyblade.find()
        res.json({beys: beyblades})
    }catch(err){
        res.status(500).json({message: err.message})
    }
})
//GET especificado en id
router.get('/:id', getBeyblade, (req,res)=>{
    res.json(res.beyblade)
})
//POST para crear un beyblade (incluye carga de una imagen)
router.post('/', upload.single('image'), async (req,res)=>{
    const bey = new Beyblade({
        name: req.body.name,
        jpname: req.body.jpname,
        type: req.body.type,
        spin: req.body.spin,
        system: req.body.system,
        series: req.body.series,
        blader: req.body.blader,
        image: req.file.filename
        })
    try{
        const newBeyblade = await bey.save()
        res.status(201).json(newBeyblade)
        
    }catch (err){
        res.status(400).json({message: err.message})
    }
})
//PATCH para atualizar beyblade especificado en id
router.patch('/:id', upload.single('image'), getBeyblade, async (req,res)=>{
    if(req.body.name != null){
        res.beyblade.name = req.body.name
    }
    if(req.body.jpname != null){
        res.beyblade.jpname = req.body.jpname
    }
    if(req.body.type != null){
        res.beyblade.type = req.body.type
    }
    if(req.body.spin != null){
        res.beyblade.spin = req.body.spin
    }
    if(req.body.system != null){
        res.beyblade.system = req.body.system
    }
    if(req.body.series != null){
        res.beyblade.series = req.body.series
    }
    if(req.body.blader != null){
        res.beyblade.blader = req.body.blader
    }
    if(req.file != null){
        res.beyblade.image = req.file.filename
    }
    try{
        const updatedBey = await res.beyblade.save()
        res.json(updatedBey)
    }catch (err){
        res.status(400).json({message: err.message})
    }
})
//DELETE para eliminar beyblade especificado en id
router.delete('/:id', getBeyblade, async (req,res)=>{
    try{
        await res.beyblade.deleteOne()
        res.json({message: "Eliminado correctamente"})
    }catch (err){
        res.status(500).json({message: err.message})
    }
})

//Funcion para obtener un beyblade en base a su id
async function getBeyblade(req, res, next){
    let beyblade
    try{
        beyblade = await Beyblade.findById(req.params.id)
        if(beyblade == null){
            return res.status(404).json({message: "No se encontró el beyblade"})
        }
    }catch (err){
        return res.status(500).json({message: err.message})
    }
    res.beyblade = beyblade
    next()
}

module.exports = router