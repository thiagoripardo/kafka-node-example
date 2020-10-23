import { rootList } from '../../controllers/rootController';
import express from 'express';

const route = express.Router();

route.get('/', rootList);

export default route;