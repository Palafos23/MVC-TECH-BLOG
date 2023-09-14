const router = require('express').Router();
const { User } = require ('../../models');

//sign-up route
router.post('/', async (req, res) => {
    try {
      const newUser= await User.create({
        username: req.body.username,
        password: req.body.password,
      });
  
      // Set up sessions with a 'loggedIn' variable set to `true`
      req.session.save(() => {
        req.session.loggedIn = true;
      });
        const existingUser = await User.findOne({ where: { username: req.body.username}});
        
            if(existingUser){
                res
                .status(400).json({message: 'Name taken, choose another'});
                return;
            }else{
                res.status(200).json(newUser);
            }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  

//sign-in route 
router.post('/login', async (req, res) => {
    try {
        const username = await User.findOne({ where: { username: req.body.username }});
    
        if (!username) {
          res
            .status(400)
            .json({ message: 'Incorrect username or password, please try again' });
          return;
        }
    
        const correctPassword = await username.checkPassword(req.body.password);
    
        if (!correctPassword) {
          res
            .status(400)
            .json({ message: 'Incorrect username or password, please try again' });
          return;
        }
    
        req.session.save(() => {
          req.session.logged_in = true;
          
          res.json({ user: username, message: 'You are now logged in!' });
        });
    }catch (err) {
        res.status(400).json(err);
    }
});

//sign-out route
router.post('/logout', async (req, res) => {
        if(req.session.logged_in){
            req.session.destroy(() => {
                res.status(204).end();
            })
        }else{
            res.status(404).end();
        }
});

//get all users route

router.get('/all', async (req, res) => {
    try {
      const userData = await User.findAll();
      
      res.status(200).json(userData);
    }catch (err) {
      res.status(500).json(err)
    }
    
  });



module.exports = router;

