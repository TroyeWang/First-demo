/**
 * Created by troye on 2017/8/3.
 */
const serverUrl = 'ws://192.168.123.69:18888/websocket?station_no=01&client=webpage';

const config = {
    reconnect: false,
    reconnectTimeout: 6000
}

const State = {
    OPENING: 0,
    OPEN: 1,
    CLOSING: 2,
    CLOSE: 3
}

function Socket() {
    if (typeof Socket.instance === 'object') {
        return Socket.instance;
    }

    var self = this,
        eventMap = {},
        ws = null;

    self.$init = function () {
        ws = new WebSocket(serverUrl);

        ws.onopen = function (evt) {
            console.log('已建立socket连接！！')
        }

        ws.onmessage = function (evt) {
            try {
                var recMsg = JSON.parse(evt.data);
                if (recMsg.cmd) {
                    self.$on(recMsg.cmd)
                    self.$fireEvent(recMsg.cmd, recMsg.res);
                }
            } catch (err) {
                console.log(err)
                self.$fireEvent('$error', err.data)
            }
        }

        ws.onclose = function (evt) {
            console.log('websocket closed!')
            if (config.reconnect) {
                setTimeout(function () {
                    self.$init();
                }, config.reconnectTimeout)
            }
        }

        ws.onerror = function (evt) {
            console.log('webocket error!')
        }
    }

    self.$events = function (events) {
        for (let i = 0, len = events.length; i < len; i++) {
            let ev = events[i]
            eventMap[ev] = []
        }
    }


    self.$on = function (event) {
        return new Promise((resolve, reject) => {
            eventMap[event].push(
                function (data) {
                    resolve(data);
                })
        })
    }


    self.$fireEvent = function (event, data) {
        if (event in eventMap) {
            let handle = eventMap[event].shift();
            if (typeof handle === 'function') {
                handle.call(self, data)
            }
        } else {
            console.log('不存在该cmd')
        }
    }

    self.$off = function (event) {
        if (event in eventMap) {
            eventMap[event]
        }
    }

    self.$init();

    Socket.instance = self;

}

export function socketStart(events, data = {}) {
    var socket = new Socket();
    socket.$events(events)
}
export function socketOn(event, data = {}) {
    var socket = new Socket();
    return socket.$on(event, data);
}

export function socketOff(event) {
    var socket = new Socket();
    socket.$off(event);
}
