const { ipcRenderer } = require('electron');

document.getElementById('loadBranches').addEventListener('click', async () => {
    const response = await fetch('/api/branches');
    const branches = await response.json();
    document.getElementById('branches').innerText = JSON.stringify(branches, null, 2);
  });
  
  document.getElementById('gitAdd').addEventListener('click', async () => {
    const response = await fetch('/api/git-command', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ command: 'add', args: ['.'] })
    });
    const result = await response.json();
    console.log(result);
  });
  
  document.getElementById('gitCommit').addEventListener('click', async () => {
    const message = await ipcRenderer.invoke('show-prompt', {
      label: 'Enter commit message:',
      value: ''
    });
  
    if (message !== null) {
      const response = await fetch('/api/git-command', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ command: 'commit', args: ['-m', message] })
      });
      const result = await response.json();
      console.log(result);
    }
  });
  