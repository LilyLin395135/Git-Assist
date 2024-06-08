import Router from 'express';
import { getGitBranches, processGitCommand } from '../controllers/git.js'

const router = Router();

router.get('/branches', getGitBranches);

router.post('/git-command', processGitCommand);

export default router;