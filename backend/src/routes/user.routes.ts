import { Router } from 'express';
import {
  createUser,
  updateUser,
  deleteUser,
  getAllUsers
} from '../controllers/user.controller';

import { verifyToken } from '../middlewares/verifyToken';

const router = Router();

router.use(verifyToken(['PUSAT']));

router.get('/', getAllUsers);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
