const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

console.log(`Connecting to MongoDB...`);
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})
  .then(res => console.log(`Connected to MongoDB`))
  .catch(e => console.log(`Error:`, e.message));

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
    unique: true
  },
  number: {
    type: String,
    match: /(\D*\d\D*){8,}/,
    required: true
  }
});

personSchema.plugin(uniqueValidator);

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

Person = mongoose.model('Person', personSchema);

module.exports = Person;
