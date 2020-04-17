const fetch = require("node-fetch");

class untappd {
    constructor(params) {
        this.clientId = params.clientId;
        this.clientSecret = params.clientSecret;
        // API Endpoints
        this.params = `?client_id=${this.clientId}&client_secret=${this.clientSecret}`;
        this.apiGetProfile = (username) =>  `https://api.untappd.com/v4/user/info/${username}${this.params}`;
        this.apiGetFriends = (username, offset = 0) =>  `https://api.untappd.com/v4/user/friends/${username}${this.params}&offset=${offset}`;
    }

    async getProfile(username) {
        const response = await fetch(this.apiGetProfile(username));
        const data = await response.json();
        return data.response.user;
    }

    async getFriends(username) {

    }

    async getFriendsProfiles(username) {

    }

    async getFriendsStats(username) {

    }
}

module.exports = untappd;