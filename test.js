// 提供的 git log 数据
const gitLog = `
b5dd352aff40ac61406e4213221a4bf076638e708783dfbcd4cc9e7c3d9e25aa873b619fb4a602f2 ded2bcdb9c183a0f597d5aecedba3fda49ca7564 (upstream/lily_develop, origin/develop, develop)
ded2bcdb9c183a0f597d5aecedba3fda49ca75645af007e8d4ba427544e87c25770453b7b9c0b1b2 (origin/week_3_part_3, week_3_part_3)
5af007e8d4ba427544e87c25770453b7b9c0b1b23b281b4be4d6869aed033416579206c5c064c806
3b281b4be4d6869aed033416579206c5c064c8068783dfbcd4cc9e7c3d9e25aa873b619fb4a602f2
8783dfbcd4cc9e7c3d9e25aa873b619fb4a602f280774b7628164aa1c9581a14c0f69070b9ad2483 7ca2c6e22b3b3c4910fcf8f8d0c2846a6e4531b3
7ca2c6e22b3b3c4910fcf8f8d0c2846a6e4531b380774b7628164aa1c9581a14c0f69070b9ad2483 (origin/week_3_part_2, week_3_part_2)
80774b7628164aa1c9581a14c0f69070b9ad24836ad67fcabf21bbf1a6a4561923b201ac76dc5d19 016e0313fe1f7aed9c290e0b7a1747be945e1a6e
6ad67fcabf21bbf1a6a4561923b201ac76dc5d198d0f73d00b5cb04b7f30300a0f895011f2aced4f 1bbcab54217370a88c71785f687724a15e9e7807
8d0f73d00b5cb04b7f30300a0f895011f2aced4f3bef59d3420325cb6f4acd98d67e63cc70ec1056 4dd1f4c319b0df06a4bb0af5afc14494a5a9570b
3bef59d3420325cb6f4acd98d67e63cc70ec105674f76e58eedc6ab9276afb14d7160b04377fbcf8 482632f958048779fcf7c2999748b920aabf6bdf
016e0313fe1f7aed9c290e0b7a1747be945e1a6e8d9f3535069c0550487e4a90bb4990f93daef2e4 (origin/week_3_part_1, week_3_part_1)
8d9f3535069c0550487e4a90bb4990f93daef2e41bbcab54217370a88c71785f687724a15e9e7807
1bbcab54217370a88c71785f687724a15e9e78070184314f46c566f823b2763c0c610097102c109b (origin/week_2_part_5, week_2_part_5)
0184314f46c566f823b2763c0c610097102c109b9ba05863cd217a07f48377ae39db46f5bc400e32
9ba05863cd217a07f48377ae39db46f5bc400e32515e084c73729ab38e35ce5834062259b6c0a60b
515e084c73729ab38e35ce5834062259b6c0a60b007e196f14d842adf630ce79eb152ca362a4199a
007e196f14d842adf630ce79eb152ca362a4199a3939a3cee95054732d23eada123c96abeb9dd860
3939a3cee95054732d23eada123c96abeb9dd8604dd1f4c319b0df06a4bb0af5afc14494a5a9570b
`;

// 解析 git log
function parseGitLog(log) {
  const lines = log.trim().split("\n");
  const commits = [];
  lines.forEach(line => {
    const parts = line.split(/\s+/);
    const commitHash = parts[0];
    const parentHash = parts[1] || null;
    const branches = parts.slice(2).map(branch => branch.replace(/[(),]/g, ''));
    commits.push({ commitHash, parentHash, branches });
  });
  return commits;
}

// 建立 commit 与分支的映射
function buildBranchCommitMap(commits) {
  const branchCommitMap = {};
  commits.forEach(({ commitHash, branches }) => {
    branches.forEach(branch => {
      if (!branchCommitMap[branch]) {
        branchCommitMap[branch] = [];
      }
      branchCommitMap[branch].push(commitHash);
    });
  });
  return branchCommitMap;
}

// 建立父子关系
function buildCommitRelationships(commits) {
  const relationships = [];
  commits.forEach(({ commitHash, parentHash }) => {
    if (parentHash) {
      relationships.push({ child: commitHash, parent: parentHash });
    }
  });
  return relationships;
}

// 输出分支与 commit 关系
function printBranchCommitMap(branchCommitMap, commitMessages) {
  for (const [branch, commitList] of Object.entries(branchCommitMap)) {
    const branchInfo = branch.split('/').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('/');
    console.log(`${branchInfo} 分支：\n`);
    commitList.forEach(commit => {
      console.log(`${commit} (${commitMessages[commit]})`);
    });
    console.log("");
  }
}

// 解析 commit 信息中的描述
function extractCommitMessages(log) {
  const lines = log.trim().split("\n");
  const commitMessages = {};
  lines.forEach(line => {
    const parts = line.split(/\s+/);
    const commitHash = parts[0];
    const message = line.substring(line.indexOf(' ') + 1).trim();
    commitMessages[commitHash] = message;
  });
  return commitMessages;
}

const commits = parseGitLog(gitLog);
const branchCommitMap = buildBranchCommitMap(commits);
const commitMessages = extractCommitMessages(gitLog);

console.log("Branch to Commit Map:");
printBranchCommitMap(branchCommitMap, commitMessages);

console.log("\nCommit Relationships:");
const commitRelationships = buildCommitRelationships(commits);
commitRelationships.forEach(({ child, parent }) => {
  console.log(`${child} -> ${parent}`);
});
