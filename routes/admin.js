const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Categoria')
require('../models/Postagem')
const Postagem = mongoose.model('postagens')
const Categoria = mongoose.model('categorias')
const {eAdmin} = require('../helpers/eAdmin')


router.get('/', (req, res)=>{
  res.render('admin/index')
})

router.get('/posts', eAdmin, (req, res) => {
  res.send('Página de posts')
})

router.get('/categorias', eAdmin, (req, res)=>{
  Categoria.find().sort({date:'desc'}).then((categorias) =>{
    res.render('admin/categorias', {categorias:categorias})
  })
  
})
router.get("/categorias/add", eAdmin, (req, res) => {
  res.render("admin/addcategorias")
})

router.post('/categorias/nova', eAdmin, (req, res) => {

  var erros = []

  if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
    erros.push({texto: 'Nome Inválido'})
  }
  
  if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
    erros.push({texto: 'Slug Inválido'})
  }

  if(req.body.nome.length < 2){
    erros.push({texto: 'Nome da categoria é muito pequeno'})
  }

  if(erros.length > 0){
    res.render('admin/addcategorias', {erros: erros})
  }else{
    const novaCategoria = {
      nome: req.body.nome,
      slug: req.body.slug
    }
  
    new Categoria(novaCategoria).save().then(() => {
      req.flash('success_msg', 'Categoria criada com sucesso')
      res.redirect('/admin/categorias')
      console.log(success_msg)
    }).catch((err) => {
      req.flash('error_msg', 'Houve um erro ao salvar a categoria, entre em contato com adm')
      res.redirect('/admin')
    }) 
  }
  console.log(erros);
  
})

router.get('/categorias/edit/:id', eAdmin, (req, res) =>{
  Categoria.findOne({_id: req.params.id}).then((categoria) => {
    res.render('admin/editcategorias', {categoria: categoria})
  }).catch((error) => {
    req.flash('error_msg', 'esta categoria não existe')
    res.redirect('/admin/categorias')
  })  
  
})

router.post('/categorias/edit', eAdmin, (req, res) => {

  Categoria.findOne({_id: req.body.id}).then((categoria) => {

    categoria.nome = req.body.nome
    categoria.slug = req.body.slug

    categoria.save().then(() => {
      req.flash('success_msg', 'Categoria editada com sucesso')
      res.redirect('/admin/categorias')
    }).catch((error) => {
      req.flash('error_msg', 'Houve um erro na edição da categoria')
      res.redirect('/admin/categorias')
    })


  }).catch((error) => {
    req.flash('error_msg', 'houve um erro ao editar a categoria')
    res.redirect('/admin/categorias')
  })
})

router.post('/categorias/deletar', eAdmin, (req, res) => {
  Categoria.remove({_id: req.body.id}).then(()=> {
    req.flash('success_msg', 'categoria deletada com sucesso')
    res.redirect('/admin/categorias')
  }).catch((error) => {
    req.flash('error_msg', 'houve um erro ao deletar a categoria')
    res.redirect('/admin/categorias')
  })
})

router.get('/postagens', eAdmin, (req, res) => {
  Postagem.find().populate('categoria').sort({data:'desc'}).then((postagens) => {
    res.render('admin/postagens', {postagens: postagens})
  }).catch((error) =>{
    req.flash('error_msg', 'Houve um erro ao listar a postagem')
    res.redirect('/admin')
  })
  
})

router.get('/postagens/add', eAdmin, (req, res) =>{
  Categoria.find().then((categorias) => {
    res.render('admin/addpostagem', {categorias: categorias})
  }).catch((error) =>{
    req.flash('error_msg', 'houve um errro ao carregar o form')
    res.redirect('/admin')
  })
  
})
router.post('/postagens/nova', eAdmin, (req, res) => {
  var erros = []

  if(req.body.categoria == '0'){
    erros.push({texto: 'categoria invalida, registre uma categoria'})
  }

  if(erros.length > 0){
    res.render('admin/addpostagem', {erros: erros})
  }else{
    const novaPostagem = {
      titulo: req.body.titulo,
      descricao: req.body.descricao,
      conteudo: req.body.conteudo,
      categoria: req.body.categoria,
      slug: req.body.slug
    }

    new Postagem(novaPostagem).save().then(() => {
      req.flash('success_msg', 'Postagem criada com sucesso')
      res.redirect('/admin/postagens')
    }).catch((err) => {
      req.flash('error_msg', 'Houve um erro durante o salvamento da postagem')
      res.redirect('/admin/postagens')
    })
  }
})

router.get('/postagens/edit/:id', eAdmin, (req, res) => {
  Postagem.findOne({_id: req.params.id}).then((postagem) => {
    Categoria.find().then((categorias) => {
      res.render('admin/editpostagens', {categorias: categorias, postagem: postagem})
    }).catch((err) => {
      req.flash('error_msg', 'houve um erro ao listar as categorias')
      res.redirect('/admin/postagens')
    })
  }).catch((err) => {
    req.flash('error_msg', 'houve um erro ao carregar o formulário da edição')
    res.redirect('/admin/postagens')
  })  
})

router.get('/postagens/deletar/:id', eAdmin, (req, res) => {
  Postagem.remove({_id: req.params.id}).then(()=>{
    req.flash('success_msg', 'postagem deletada com sucesso!')
    res.redirect('/admin/postagens')
  }).catch((err) => {
    req.flash('error_msg', 'houve um erro interno')
    res.redirect('/admin/postagens')
  })
})
module.exports = router