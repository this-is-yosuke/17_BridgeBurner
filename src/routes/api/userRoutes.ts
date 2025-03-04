import { Router } from 'express';
const router = Router();
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} from '../../controllers/userController.js';

router.route('/').get(getAllUsers).post(createUser);

router
    .route('/:userId')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

router.route('/:userId/friends/:friendId').post(addFriend);

router.route('/:userId/friends/:friendId').delete(deleteFriend);

export default router;