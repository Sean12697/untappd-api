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
        const response = await fetch(this.apiGetFriends(username));
        const data = await response.json();
        return data.response;
    }

    async getAllFriends(username) {
        let initialResponse = await this.getFriends(username);
        let friends = initialResponse.items;

        if (initialResponse.found > initialResponse.count) {
            let offsetCount = initialResponse.count, toLoop = Math.ceil((initialResponse.found / initialResponse.count) - 1);
            for (let i = 0; i < toLoop; i++) {
                let response = await this.getFriends(username, (i + 1) * offsetCount);
                friends.concat(response.items);
            }
        }

        return friends;
    }

    async getAllFriendsProfiles(username) {

    }

    async getAllFriendsStats(username) {

    }
}

module.exports = untappd;