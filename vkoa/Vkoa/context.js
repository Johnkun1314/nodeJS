module.exports = {
    get body() {
        return this.response.bpdy
    },
    set body(val) {
        this.response.bpdy = val
    },
    get url() {
        return this.request.url
    },
    get method() {
        return this.request.method
    }
}