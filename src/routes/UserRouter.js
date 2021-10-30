import { Router } from 'express';
import { logRequest, debugLogger } from '../util/log';
import { doAnalytics } from '../util/analytics';
import {
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from '../controllers/UserController';

const UserRouter = new Router();
const middleware = [logRequest, doAnalytics];

const validateSignupData = (req, res, next) => {
  // check if signup data is valid
  console.log("checking signup data");
  if (!req.body.name) {
    debugLogger.error('Missing name in signup');
    return res.status(400).json({ error: 'post body missing user id' });
  }
  // more sanity checks...

  next();
};

const validateUpdateData = (req, res, next) => {
  if (!req.body.name) {
    debugLogger.error('Missing user name in update');
    return res.status(400).json({ error: 'update body missing new username' });
  }
  next();
};

UserRouter.post('/', async (req, res, next) => {
  const {
    name,
  } = req.body;

  try {
    console.log("creating user");
    const result = await createUser(name);
    res.json({
      status: 'OK, CREATED',
      id: result.id,
    });
  } catch (e) {
    if (e.code == 'ER_DUP_ENTRY') {
      return res.status(400).json({ eror: 'name already taken' });
    }
    return res.status(400).json({ error: e.message });
  }
});

UserRouter.get('/:userId', middleware, async (req, res, next) => {
  const {
    userId,
  } = req.params;
  try {
    res.json(await getUser(userId));
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

UserRouter.delete('/:userId', middleware, async (req, res, next) => {
  // TODO: Auth this endpoint w/ user jwt
  const {
    userId,
  } = req.params;
  try {
    const result = await deleteUser(userId);
    res.json({
      status: 'OK, DELETED',
      result,
    });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

UserRouter.put('/:userId', [middleware, validateUpdateData], async (req, res, next) => {
  // TODO: Auth this endpoint w/ user jwt
  const {
    userId,
  } = req.params;

  try {
    const result = await updateUser(userId, req.body.name);
    res.json({
      status: 'OK, UPDATED',
      result,
    });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

export default UserRouter;
