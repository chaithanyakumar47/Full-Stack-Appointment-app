const path = require('path');

const userRoutes = require('./routes/user');

const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./util/database');

const User = require('./models/User');
var cors = require('cors');
const { connected } = require('process');

const app = express();

app.use(cors());

app.use(bodyParser.json({ extented: false}));

app.post('/user/add-user', async(req, res, next) => {
    try {
        
        const name = req.body.name;
        const email = req.body.email;
        const phone = req.body.phone;

        const data = await User.create( { name: name, phone: phone, email: email});
        res.status(201).json({newUserDetail: data});
    } catch(err) {
        res.status(500).json({
            error: err
        });

    }

});

app.get('/user/get-users', async (req, res, next) => {
    const users = await User.findAll();
    res.status(200).json({allUsers: users});
})

//app.use('/user',userRoutes);

app.delete('/user/delete-user/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      await User.destroy({
        where: {
          id: userId  
        }
      });
      res.status(200).json({ message: 'User deleted'});
    } catch (err) {
      res.status(500).json({error: err});
    }
  });

sequelize
.sync()
.then(result => {
    //console.log(result);
    app.listen(3000);
})
.catch(err => console.log(err));