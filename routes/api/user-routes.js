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
router.post('/', (req, res)=> {});

//Put/api/users/1
router.put('/:id', (req, res) => {});

//Delete/api/users/1
router.delete('/:id', (req, res)=> {});

module.exports=router;

