// ----------> Controller des NOTES DE COURS <----------

var connection = require('../db.js'); //connexion BDD

let NotesCours = require('../models/notescoursModel.js');
listNotescours = [];

//Route pour la page "Notes de cours" + affichage des données de la BDD pour les notes de cours
exports.notesdecours = function(req, res){
    connection.query('SELECT * FROM notescours',(err,data)=>{
        if(err){
            res.status(400).send(err);
        } 
        else{
            res.status(200);
            console.log({listNotescours:data});
            res.render('notescours.ejs', {listNotescours:data});
        }
    })  
};

//Ajouter un élément à la liste des notes de cours
    //route ajout de notes de cours
    exports.formulairenotescours = function(req, res){
        res.render('addnotescours.ejs');
    };

    // route ajout de note de cours
    exports.ajoutnotescours = function(req,res){
        let notesdecours = new NotesCours(req.body.n_title, req.body.codecours, req.body.identificationstudent, req.body.n_description);
        console.log(notesdecours);
        connection.query('INSERT INTO notescours SET ?', notesdecours, (err,data)=>{
            if(err){
                res.status(400).send(err);
            } 
            else{
                console.log('Ajout réussi');
                res.status(201).redirect('/accueil/notesdecours');
            }
        })
    };
            
//Supprimer un élément de la liste des notes de cours