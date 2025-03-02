import { Router } from 'express';
const router = Router();
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../../controllers/userController.js';

// /api/users
router.route('/').get(getAllUsers).post(createUser);

// /api/users/:userId
// Obtinaed from courseRoutes in the miniproject
router
    .route('/:userId')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

export { router as userRouter };