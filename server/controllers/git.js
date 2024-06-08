import simpleGit from 'simple-git';

export async function getGitBranches(req, res, next) {
    try {
        const { path } = req.body;
        const git = simpleGit(path);
        const branches = await git.branchLocal();
        res.json(branches);
    } catch (error) {
        next(error);
    }
};

export async function processGitCommand(req, res, next) {
    try {
        const { command, args, path } = req.body;
        const git = simpleGit(path);

        let result;
        if (command === 'commit') {
            const message = args[0];
            if (!message) {
                return res.status(400).json({ success: false, error: 'Commit message is required.' });
            }
            result = await git.commit(message);
        } else {
            result = await git[command](...args);
        }
        res.json({ success: true, result });
    } catch (error) {
        res.json({ success: false, error });
        next(error);
    }
};