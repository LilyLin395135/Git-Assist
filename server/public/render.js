const { ipcRenderer } = require('electron');

document.getElementById('selectProject').addEventListener('click', async () => {
  const result = await ipcRenderer.invoke('select-directory');
  if (result) {
    const response = await fetch('/api/branches', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ path: result })
    });
    const branches = await response.json();
    document.getElementById('branches').innerText = JSON.stringify(branches, null, 2);
  }
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
  let message = '';
  while (!message) {
    message = await ipcRenderer.invoke('show-prompt', {
      label: 'Enter commit message (cannot be empty):',
      value: ''
    });
    if (message === null) {
      //user canceled prompt
      return;
    }
  }

  const response = await fetch('/api/git-command', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ command: 'commit', args: [message] })
  });
  const result = await response.json();
  console.log(result);
});


