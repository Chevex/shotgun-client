// "this" === shotgun shell instance
module.exports = exports = {

    // Create a shell helper function for setting cookies on the client.
    setCookie: function (name, value, days) {
        var newCookies = this.getVar('newCookies') || {};
        newCookies[name] = { value: value, days: days };
        return this.setVar('newCookies', newCookies);
    },

    // Create a shell helper function for retrieving a cookie.
    getCookie: function (name) {
        var cookies = this.getVar('cookies');
        if (!cookies) return;
        if (cookies.hasOwnProperty(name)) return cookies[name];
    },

    // Create a shell helper function for deleting a cookie.
    delCookie: function (name) {
        return this.setCookie(name, null, -1);
    },

    // Create a shell send function that will broadcast to all clients.
    sendToAll: function (data) {
        this.io.of('/' + this.settings.namespace).emit('data', data);
        return this;
    },

    // Create a shell send function that will broadcast to all clients except the current one.
    sendToOthers: function (data) {
        var socket = this.getVar('socket');
        socket.broadcast.emit('data', data);
        return this;
    },

    // Log helper functions.
    logAll: function (text, options) {
        return this.sendToAll({
            line: {
                options: options || {},
                type: 'log',
                text: text ? text.toString() : ''
            }
        });
    },
    warnAll: function (text, options) {
        return this.sendToAll({
            line: {
                options: options || {},
                type: 'warn',
                text: text ? text.toString() : ''
            }
        });
    },
    errorAll: function (text, options) {
        return this.sendToAll({
            line: {
                options: options || {},
                type: 'error',
                text: text ? text.toString() : ''
            }
        });
    },
    debugAll: function (text, options) {
        return this.sendToAll({
            line: {
                options: options || {},
                type: 'debug',
                text: text ? text.toString() : ''
            }
        });
    },

    // Create a shell send function for multi line inputs.
    multiLine: function () {
        return this.send({ multiLine: true });
    }
};