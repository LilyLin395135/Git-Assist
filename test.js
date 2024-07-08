// 提供的 git log 数据
const gitLog = `
b5dd352 8783dfb ded2bcd (HEAD -> develop, origin/develop)
ded2bcd 5af007e (origin/week_3_part_3, week_3_part_3)
5af007e 3b281b4
3b281b4 8783dfb
8783dfb 80774b7 7ca2c6e
7ca2c6e 80774b7 (origin/week_3_part_2, week_3_part_2)
80774b7 6ad67fc 016e031
6ad67fc 8d0f73d 1bbcab5
8d0f73d 3bef59d 4dd1f4c
3bef59d 74f76e5 482632f
016e031 8d9f353 (origin/week_3_part_1, week_3_part_1)
8d9f353 1bbcab5
1bbcab5 0184314 (origin/week_2_part_5, week_2_part_5)
0184314 9ba0586
9ba0586 515e084
515e084 007e196
007e196 3939a3c
3939a3c 4dd1f4c
4dd1f4c bb31801 (origin/week_2_part_4, week_2_part_4)
bb31801 9c209bf
9c209bf 5822c24
5822c24 482632f
482632f ba3f81c (origin/week_2_part_3, week_2_part_3)
ba3f81c be90f01
be90f01 dc34344
dc34344 26a8205
26a8205 1751815
1751815 55ad78c
55ad78c f9fc480
f9fc480 74f76e5
74f76e5 1297b3d 9a9eb6c
9a9eb6c 6d97d21 (origin/week_2_part_2.5, week_2_part_2.5)
6d97d21 1297b3d
1297b3d 802bd79 86017fe
86017fe 6985de0 (origin/week_2_part_2, week_2_part_2)
6985de0 3bfbffa
3bfbffa e3236a8
e3236a8 b7349c5
b7349c5 9c8fd15
9c8fd15 b607f57
b607f57 802bd79
802bd79 c38eb9b 6f7e37f
6f7e37f dd500a8 (origin/week_2_part_1, week_2_part_1)
dd500a8 c38eb9b
c38eb9b fd3874f 066c454
fd3874f 488f0e2 1a92247
066c454 ed187cf (origin/week_1_part_5, week_1_part_5)
ed187cf 1a92247
1a92247 ad8ec32 43569d8 (origin/week_1_part_4, week_1_part_4)
ad8ec32 8bc17ef
8bc17ef 488f0e2
43569d8 3a980e0
488f0e2 a5efec0 3a980e0
3a980e0 d343415 (origin/week_1_part_3, week_1_part_3)
d343415 f742b5c
f742b5c c2e1ade
c2e1ade 0e3dcee
0e3dcee fd6d9b0
fd6d9b0 0f765b4
0f765b4 a5efec0
a5efec0 68156b6 b15446c
b15446c 92874d5 (origin/week_1_part_2, week_1_part_2)
92874d5 c934f89
c934f89 1754905
1754905 e517920
e517920 68156b6
68156b6 3d71bf1 ca29742
ca29742 fabda0d (origin/week_1_part_1, week_1_part_1)
fabda0d cfb5be5
cfb5be5 b8eda69
b8eda69 3d71bf1
3d71bf1 a8db5e6 75b3947
75b3947 d163f13 (origin/week_0_part_3, week_0_part_3)
d163f13 f2431eb
f2431eb 7f727b3
7f727b3 bfabc8e
bfabc8e 29d8878
29d8878 d6dd41a
d6dd41a 8efe329
8efe329 2bf5abe
2bf5abe af28a28
af28a28 1fbf16d
1fbf16d 3aa6d86
3aa6d86 2450f77
2450f77 78d60aa
78d60aa a8db5e6
a8db5e6 222bd3e 0bef796 (week_0_part_2)
0bef796 1fca8cf (origin/week_0_part_2)
1fca8cf 157dd56 92794ae
157dd56 be052fe
92794ae 81625a0
81625a0 be052fe
be052fe 222bd3e
222bd3e 0d54bb0 f57be34
f57be34 0d54bb0 (origin/week_0_part_1, week_0_part_1)
0d54bb0 7cb3ceb (upstream/tzuhua_develop, origin/main, origin/HEAD, main)
7cb3ceb`;

$currentBranch = "develop"  # 请替换为你的当前分支名称
git log --decorate=short --oneline --pretty=format:'%h %p%d' $currentBranch | ForEach-Object {
  $parts = $_ -split ' ', 3  # 仅分割成三部分
  $hash1 = $parts[0].Substring(0, 5)
  $hash2 = if ($parts[1].Length -ge 5) { $parts[1].Substring(0, 5) } else { $parts[1] }
  $refs = if ($parts.Length -ge 3) { $parts[2] } else { "" }
  "$hash1 $hash2 $refs".Trim()
}

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
