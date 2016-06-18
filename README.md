# API
Main API server including handler logic.

#Supported Actions

**Keywords**,
(Variables)

1. Github
    1. Commits (GET /repos/:owner/:repo/git/commits/:branch)
        1. Show my **commits** in (repo) on Github ->  Get commit history on specific repo
        2. Show my **commits** in (repo) on (branch) branch -> Get commit history on specific repo in specific branch
    2. Users (GET /users/:username)
        1. Search (username) on Github -> Return JSON w/user information (name, location, URL, bio, email, followers, following)
        2. Show my **account URL** on Github -> Return user URL
        3. Show my **account information** on Github -> Return JSON w/user information (name, location, URL, bio, email, followers, following)
    3. Repositories (GET /search/repositories)
        1. Search (repository) on Github -> return links to top 3 repositories w/that search
2. Spotify WIP
