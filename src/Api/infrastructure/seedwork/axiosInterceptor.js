module.exports = {
    decorate: function (axios) {
        axios.interceptors
            .response
            .use((response) => [null, response.data],
                (error) => [error]);
    }
}