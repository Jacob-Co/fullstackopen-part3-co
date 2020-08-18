import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  },
  {
    "name": "Jacob",
    "number": "2953589325",
    "id": 5
  },
  {
    "name": "Isa",
    "number": "4398432",
    "id": 6
  }
]

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// morgan.token('type', function (req, res) { return req.headers['content-type'] })
morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(cors());

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('hello');
});

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/api/info', (req, res) => {
  const timeInfo = new Date().toString();
  const numberOfPersons = persons.length;
  const htmlMessage = `<p>Phonebooko has info for ${numberOfPersons} people` +
    `<p>${timeInfo}</p>`;

  res.send(htmlMessage);
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(person => person.id === id);

  if (!person) return res.status(404).end();

  res.json(person);
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter(person => person.id !== id);
  
  res.status(204).end()
})

const generateId = () => {
  return Math.ceil(Math.random() * 10 + 1) + persons.length;
}

app.post('/api/persons', (req, res) => {
  const body = req.body;
  if (!body.name || !body.number) return res.status(400).send({error: 'Missing name or number'});
  const name = body.name;
  const number = body.number
  const duplicateName = persons.find(person => person.name.toLowerCase() === name.toLowerCase());
  if (duplicateName) return res.status(400).send({error: 'Name must be unique'});

  const newPerson = {
    name,
    number,
    id: generateId()
  }

  persons = persons.concat(newPerson);
  res.send(newPerson);
})