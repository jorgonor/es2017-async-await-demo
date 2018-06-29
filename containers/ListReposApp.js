import React from 'react';
import PropTypes from 'prop-types';
import services from '../services';

export default class ListReposApp extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            loading: true,
            errorMessage: null,
            items: [],
        };

        this._client = services.client;
    }

    async componentDidMount()
    {
        try {
            let repos = await this._client.listRepos(this.props.user);

            this.setState({
                loading: false,
                items: repos.map(repo => ({
                    id: repo.id,
                    fullName: repo.full_name,
                    url: repo.html_url
                }))
            });
        } catch (e) {
            console.error(e);
            this.setState({
                loading: false,
                errorMessage: "An error occured while fetching " + this.props.user + " repositories."
            });
        }
    }

    render()
    {
        if (this.state.errorMessage) {
            return this.renderError();
        }

        if (this.state.loading) {
            return this.renderLoading();
        }

        return this.renderRepos();
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

    renderRepos()
    {
        return (<div>
            <h3>{this.props.user} repos</h3>
            <ul className="list-group">
                {this.state.items.map(repo => <li className="list-group-item"><a href={repo.url} target="_blank" rel="noopener noreferrer">{repo.fullName}</a></li>)}
            </ul>
        </div>);
    }
}

ListReposApp.propTypes = {
    user: PropTypes.string.isRequired
};