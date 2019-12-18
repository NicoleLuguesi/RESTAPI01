console.log('Before');
getUser(1,(user) => {
    // console.log('User', user)
    getRepositories(user.gitHubUsername, (repos) => {
    console.log('Repos', repos);
    });
});
console.log('After');

function getUser(id) {
    return new Promise((resolve, reject) => {
          setTimeout(() => {
    console.log('Reading a user from a database...');
    resolve({ id: id, gitHubUsername: 'mosh'});
    }, 2000);

    });
}

function getRepositories(username) {
    return new Promise((resolve, reject) => {
            setTimeout(() => {
       console.log('Calling GitHub API...');
      resolve(['repo1', 'repo2', 'repo3']);
    }, 2000);
    });
}

function getCommits(repo) {
    return new Promise((resolve, reject) => {
            setTimeout(() => {
       console.log('Calling GitHub API...');
      resolve(['commit']);
    }, 2000);
    });
}
