const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
const voituresRouter = require('./routes/voiture_route');
const setupSwagger = require('./swagger'); 

// app.use('/swagger', swaggerUi.serve, swaggerUi.setup(specs));

// const object = [
//   { id: 1, name: "khalil", prenom: "barhoumi" },
//   { id: 2, name: "Adem", prenom: "barhoumi" },
//   { id: 3, name: "Omar", prenom: "barhoumi" },
// ];
// voitures = [{id:1,name:"clio"},{id:2,name:"megane"},{id:3,name:"range"}]

app.use('/voitureAPi', voituresRouter);


app.get('/', (req, res) => {
  res.send("Hello word !!");
});
 
setupSwagger(app);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
