import Movie from './models/Movie'
import User from './models/User'
import MovieActor from './models/MovieActor'

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import sequelize from "./config/db";

import movieRoutes from './routes/movies'
import userRoutes from './routes/users'

sequelize
  .authenticate()
  .then(() => console.log('Database connected!'))
  .catch((err) => console.error('Unable to connect to the database:', err));

sequelize.sync({ alter: false }).then(() => {
  console.log('Database & tables created!');
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/movies', movieRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));