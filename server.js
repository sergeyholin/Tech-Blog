const path = require('path');
const express = require("express")
const exphbs = require('express-handlebars');
const session = require('express-session');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
// Require connection for connection & enable handlebar helpers.
const sequelize = require('./config/connection');
const hbs = exphbs.create({ helpers });
// Express dependencies
const app = express();
const PORT = process.env.PORT || 3001;
// Express sessions
const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
  };
// Express use session
app.use(session(sess));
// Set Handlebars as the default template engine.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
// Express Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));
// Express use routes
app.use(routes);
// Activate port, listen for input
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});