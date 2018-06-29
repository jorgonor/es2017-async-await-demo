const processGithubResponse = res => {
    if (res.status < 200 || res.status >= 400) {
        throw new Error("Not accepted response code " + res.status);
    }
    return res.json();
};

export default class Client
{
    constructor()
    {
        this._baseUri = 'https://api.github.com/';
    }

    listRepos(username)
    {
        let url = this._baseUri + 'users/' + encodeURI(username) + '/repos';
        return fetch(url).then(processGithubResponse);
    }

    listGists(username)
    {
        let url = this._baseUri + 'users/' + encodeURI(username) + '/gists';
        return fetch(url).then(processGithubResponse);
    }

    listFollowers(username)
    {
        let url = this._baseUri + 'users/' + encodeURI(username) + '/followers';
        return fetch(url).then(processGithubResponse);
    }

    listStarred(username)
    {
        let url = this._baseUri + 'users/' + encodeURI(username) + '/starred';
        return fetch(url).then(processGithubResponse);
    }
}