const mongoose = require('mongoose');

// eslint-disable-next-line no-undef
if (process.argv.length < 3) {
  console.log('Please input db password');
  // eslint-disable-next-line no-undef
  process.exit(1);
}

// eslint-disable-next-line no-undef
const password = process.env.MONGODB_URI;

const url = `mongodb+srv://carrot:${password}@cluster0.iholn.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch(() => console.log('Error in accessing database, please check password or network connection'));

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

const Person = mongoose.model('Person', personSchema);

// eslint-disable-next-line no-undef
if (process.argv.length >= 5) {
  // eslint-disable-next-line no-undef
  const [name, number]  = process.argv.slice(3);

  const person = new Person({
    name,
    number
  });

  person.save()
    .then(result => {
      console.log(`added ${result.name} number ${result.number} to phonebook`);
      mongoose.connection.close();
    });
} else {
  Person.find({})
    .then(results => {
      console.log('phonebook:');
      results.forEach(result => console.log(`${result.name} ${result.number}`));
      mongoose.connection.close();
    });
}
