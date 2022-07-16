const router = requirer('express').Router();
const {User} = require('../../models');

//Get /api/users
router.get('/', (req, res)=> {
    //Access our User model and run .findAll () method).. 
    //findAll is like SELECT * FROM users; (on mysql)
    User.findAll
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);res.status(500).json(err);
    });
});

//Get /api/users/1
router.get('/:id', (req,res)=> {
    User.findOne({
        //like SELECT * FROM users WHERE id=1 (on mysql)
        where:{
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status (404).json({ message: 'No user found with this id'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Post /api/users
router.post('/', (req, res)=> {
 // expects {username: 'Lernantino', email:'lernantino@gmail.com', password: 'password1234'}
 User.create({
     username: req.body.email,
     password: req.body.password
 })
 .then(dbUserData => res.json(dbUserData))
 .catch(err => {
     console.log(err);
     res.status(500).json(err);
 });  
});

//Put/api/users/1
router.put('/:id', (req, res) => {
    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}

  // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
  User.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData[0]) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
});
});

//Delete/api/users/1
router.delete('/:id', (req, res)=> {
    User.destroy({
        where: {
          id: req.params.id
        }
      })
        .then(dbUserData => {
          if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
          }
          res.json(dbUserData);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
});

module.exports=router;

