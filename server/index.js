const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const cors = require('cors');
const schema = require('../graphqlShema/schema');
const users = require('./preudoDB');

const port = 7007;

const app = express();
app.use(cors());

const root = {
  getAllUsers: () => {
    return users;
  },
  getUser: ({id}) => {
    return users.find(it => it.id === id);
  },
  createUser: ({input}) => {
    const id = Date.now();
    const user = {id, ...input};
    users.push(user);
    return user;
  }
}

app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema,
  rootValue: root
}));

app.listen(port, () => console.log(`Server started on the port: ${port}`));