import Router from 'express';
import { getGitBranches, processGitCommand } from '../controllers/git.js'

const router = Router();

router.post('/branches', getGitBranches);

router.post('/git-command', processGitCommand);

export default router;