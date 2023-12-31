require('dotenv').config();

const express = require('express');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const routerUser = require('./routes/users');
const routerCard = require('./routes/cards');
const routerSignIn = require('./routes/SignIn');
const auth = require('./middlewares/auth');
const { errorLogger, requestLogger } = require('./middlewares/logger');
const routerSignUp = require('./routes/SignUp');

const handleError = require('./middlewares/handleError');

const NotFoundError = require('./errors/NotFoundError');

const { PORT } = process.env;

const app = express();
app.use(cors({ origin: ['http://localhost:3000', 'https://plum.nomoreparties.co'], credentials: true }));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/', routerSignUp);
app.use('/', routerSignIn);

app.use(auth);
app.use('/users', routerUser);
app.use('/cards', routerCard);

app.use(errorLogger);
app.use((req, res, next) => next(new NotFoundError('Произошла ошибка: Not Found')));
app.use(errors());
app.use(handleError);

app.listen(PORT);
