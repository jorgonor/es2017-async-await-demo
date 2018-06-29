import React from 'react';
import PropTypes from 'prop-types';
import services from '../services';

export default class UserDashboardAppPromiseAll extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            loading: true,
            errorMessage: null,
            repos: [],
            gists: [],
            followers: []
        };

        this._client = services.client;
    }

    componentDidMount()
    {
        const user = this.props.user;

        let promises = [
            this._client.listRepos(user),
            this._client.listGists(user),
            this._client.listFollowers(user),
            this._client.listStarred(user)
        ];

        Promise.all(promises)
               .then(results => {
                   const [repos, gists, followers, starred] = results;
                   this.setState({
                       loading: false,
                       repos: repos.map(repo => ({
                           id: repo.id,
                           fullName: repo.full_name,
                           url: repo.html_url
                       })),
                       gists: gists.map(gist => ({
                           id: gist.id,
                           files: gist.files,
                           url: gist.html_url
                       })),
                       followers: followers.map(follower => ({
                           id: follower.id,
                           login: follower.login,
                           url: follower.html_url
                       })),
                       starred: starred.map(starGiven => ({
                           id: starGiven.id,
                           name: starGiven.name,
                           fullName: starGiven.full_name,
                           url: starGiven.html_url,
                       }))
                    });
               })
               .catch(e => {
                   console.error(e);
                   this.setState({
                       loading: false,
                       errorMessage: "An error occured while fetching " + user + " content."
                   });
               });
    }

    render()
    {
        if (this.state.errorMessage) {
            return this.renderError();
        }

        if (this.state.loading) {
            return this.renderLoading();
        }

        return this.renderContent();
    }

    renderError()
    {
        return (<div>
            <h3>An unexpected error occured</h3>
            <div className="alert alert-warning">{this.state.errorMessage}</div>
        </div>
        );
    }

    renderLoading()
    {
        return <p>Loading...</p>;
    }

    renderContent()
    {
        const gistsCount = this.state.gists.length;
        const followersCount = this.state.followers.length;
        const starGivenCount = this.state.starred.length;

        return (<div>
            <h3>{this.props.user} repos</h3>
            <ul className="list-group">
                {this.state.repos.map(repo => <li key={repo.id} className="list-group-item"><a href={repo.url} target="_blank" rel="noopener noreferrer">{repo.fullName}</a></li>)}
            </ul>
            <div className="row text-center">
                <div className="col-4"><h3>{gistsCount} gists</h3></div>
                <div className="col-4"><h3>{followersCount} followers</h3></div>
                <div className="col-4"><h3>Given {starGivenCount} stars</h3></div>
            </div>
        </div>);
    }
}

UserDashboardAppPromiseAll.propTypes = {
    user: PropTypes.string.isRequired
};