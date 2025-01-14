import express from "express";
import { create, getAll, getById, remove, update } from "../controllers/movies";
import { trimMiddleware, trimQueryMiddleware } from "../middleware/trim";

const router = express.Router();

// Get all movies
router.get('/', trimQueryMiddleware, getAll);

// Get single movie
router.get('/:id', getById);

// Create a movie
router.post('/', trimMiddleware, create);

// Update a movie
router.put('/:id', trimMiddleware, update);

// Delete single movie
router.delete('/:id', remove);

module.exports = router;