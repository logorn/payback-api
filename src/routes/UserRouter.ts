import {Router, Request, Response, NextFunction} from 'express' 
const User = require('../data') 
var MongoClient = require('mongodb').MongoClient 
var Db = require('mongodb').Db
var assert = require('assert') 

export class UserRouter {
  router: Router

  /**
   * Initialize the UserRouter
   */

   private url: string 

   constructor() {
     this.router = Router() 
     this.init() 
     this.url = 'mongodb://localhost:27017/data' 

     MongoClient.connect(this.url, function(err, db) {
       if(err !== null){
         console.error(err)  
       }else{
         Db = db
         console.log("Connected successfully to server") 
       }
     }) 
   }

  /**
   * POST create a new User.
   */

   public createOne(req: Request, res: Response, next: NextFunction) {
     var collection = Db.collection('users') 

     collection.insertOne({nome: "Jefferson Lucena"}, function(err, r) {
       assert.equal(null, err) 
       assert.equal(1, r.insertedCount) 

       Db.close() 
       if (err !== null) {
         res.send("Error")
       } else {
         res.send("User stored")
       }
     }) 
   }

  /**
   * GET all Users.
   */
   public getAll(req: Request, res: Response, next: NextFunction) {
     var collection = Db.collection('users') 
     var users

     collection.find({}).toArray(function(err, docs) {
       if (err !== null) {
         res.send(err)
       } else {
         Db.close()   
         res.send(docs)
       }
     }) 
   }

  /**
   * GET one user by id
   */
   public getOne(req: Request, res: Response, next: NextFunction) {
     let query = parseInt(req.params.id) 
     let user = User.find(user => user.id === query) 
     if (user) {
       res.status(200)
       .send({
         message: 'Success',
         status: res.status,
         user
       }) 
     }
     else {
       res.status(404)
       .send({
         message: 'No user found with the given id.',
         status: res.status
       }) 
     }
   }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
   init() {
     this.router.get('/', this.getAll) 
     this.router.get('/:id', this.getOne) 
     this.router.post('/', this.createOne) 
   }

 }

 // Create the UserRouter, and export its configured Express.Router
 const userRoutes = new UserRouter() 
 userRoutes.init() 

 export default userRoutes.router 