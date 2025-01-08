import express from "express";
import { createUser, getAllActors, getAllProducers } from "../controllers/users";
import { trimMiddleware } from "../middleware/trim";

const router = express.Router();

// Get all producers
router.get('/producers', getAllProducers);

// Get all actors
router.get('/actors', getAllActors);

// Get all actors
router.post('/', trimMiddleware, createUser);

module.exports = router;