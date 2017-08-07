// const serverUrl = 'ws://localhost:8080';
const serverUrl = 'ws://192.168.36.114:8080';

const config = {
    reconnect: true,
    reconnectTimeout: 6000,
    enqueue: false
}

const State = {
    OPENING: 0,
    OPEN: 1,
    CLOSING: 2,
    CLOSE: 3
}

function Socket(url, data) {

    if (typeof Socket.instance === 'object') {
        return Socket.instance;
    }

    var self = this,
        eventMap = {},
        queue = [], // message queue
        ws = null;

    self.$init = function() {
        ws = new WebSocket(serverUrl);

        ws.onopen = function(evt) {
            console.log('websocket opened!')
            // console.log(ws.readyState)

            if (config.enqueue && queue.length > 0) {
                while(queue.length > 0) {
                    if (ws.readyState === State.OPEN) {
                        self.$send(queue.shift())
                    } else {
                        break;
                    }
                }
            }
        }

        ws.onmessage = function(evt) {

            try {
                var msg = JSON.parse(evt.data);

                if (msg.event) {
                    self.$fireEvent(msg.event, msg.data);
                }
            } catch(err) {
                self.$fireEvent('$error', evt.data)
            }
        }

        ws.onclose = function(evt) {
            console.log('websocket closed!')
            // console.log(ws.readyState)
            // reconnect
            if (config.reconnect) {
                 setTimeout(function() {
                    self.$init();
                }, config.reconnectTimeout)
            }
        }

        ws.onerror = function(evt) {
            console.log('webocket error!')
            // console.log(ws.readyState)
        }
    }

    self.$send = function(msg) {
        if (ws.readyState === State.OPEN) {
            ws.send(msg)
        } else if (ws.readyState === State.OPENING) {
            setTimeout(function() {
                self.$send(msg);
            }, 100)
        } else if (config.enqueue) {
            queue.push(msg)
        }
    }

    self._$on = function() {
        var handlers = [];

        Array.prototype.push.apply(handlers, arguments);

        var event = handlers.shift();

        if (typeof event !== 'string' || handlers.length === 0) {
            throw new Error('_$on receive error parameters')
        }

        eventMap[event] = eventMap[event] || [];

        for (var i = 0, len = handlers.length; i < len; i++) {
            eventMap[event].push(handlers[i])
        }
    }

    self.$off = function(event) {
        if (event in eventMap) {
            delete eventMap[event]
        }
    }

    self.$emit = function(event, data) {
        if (typeof event !== 'string') {
            throw new Error('$emit: event must be string')
        }

        var msg = {
            event: event,
            data: data
        }

        return new Promise((resolve, reject) => {
            self._$on(event, function(data) {
                resolve(data);
            })

            self.$send(JSON.stringify(msg));
        })
    }

    self.$fireEvent = function(event, data) {
        var handlers = eventMap[event];

        while (handlers && handlers.length > 0) {
            let handle = handlers.shift();

            if (typeof handle === 'function') {
                handle.call(self, data)
            }
        }

        self.$off(event);
    }

    self.$init();

    Socket.instance = self;
}

export function on(event, data={}) {
    var socket = new Socket();
    return socket.$emit(event, data);
}

export function off(event) {
    var socket = new Socket();
    socket.$off(event);
}
