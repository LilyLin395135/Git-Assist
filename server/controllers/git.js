import simpleGit from 'simple-git';

export async function getGitBranches(req, res, next) {
    try {
        const git = simpleGit();
        const branches = await git.branchLocal();
        res.json(branches);
    } catch (error) {
        next(error);
    }
};

export async function processGitCommand(req, res, next){
    try{
        const{command,args}=req.body;
        const git=simpleGit();
        const result =await git[command](...args);
        res.json({success:true, result});
    }catch(error){
        res.json({ success: false, error });
        next(error);
    }
};