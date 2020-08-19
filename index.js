// import express from 'express';
// import morgan from 'morgan';
// import cors from 'cors';

require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/persons');

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan('  :method :url :status :res[content-length] - :response-time ms :body'));
app.use(cors());
app.use(express.static('build'));

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => res.json(persons));
});

app.get('/api/info', (req, res) => {
  const timeInfo = new Date().toString();
  const numberOfPersons = persons.length;
  const htmlMessage = `<p>Phonebooko has info for ${numberOfPersons} people` +
    `<p>${timeInfo}</p>`;

  res.send(htmlMessage);
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end();
      }
    })
    .catch(e => next(e));
});

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(result => res.status(204).end())
    .catch(e => next(e));
})

app.post('/api/persons', (req, res) => {
  const body = req.body;
  if (!body.name || !body.number) return res.status(400).send({error: 'Missing name or number'});

  const name = body.name;
  const number = body.number;
  // const duplicateName = persons.find(person => person.name.toLowerCase() === name.toLowerCase());
  // if (duplicateName) return res.status(400).send({error: 'Name must be unique'});

  const newPerson = new Person({
    name,
    number
  });

  newPerson.save().then(person => res.json(person));
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body;
  
  const person = {
    name: body.name,
    number: body.number
  }
  
  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => {
      if (updatedPerson) {
        res.json(updatedPerson)
      } else {
        res.status(404).end();
      }
    })
    .catch(e => next(e));
})

const errorHandler = (error, req, res, next) => {
  console.log(error.message);

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  }

  next(error);
}

app.use(errorHandler);