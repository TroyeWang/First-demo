/**
 * Created by troye on 2017/8/3.
 */

import store from '../store/index';
console.log(store)
const serverUrl = 'ws://192.168.123.69:18888/websocket?station_no=01&client=webpage';

const config = {
    reconnect: true,
    reconnectTimeout: 6000
}

const State = {
    OPENING: 0,
    OPEN: 1,
    CLOSING: 2,
    CLOSE: 3
}

function Socket(event) {


    var self = this,
        eventMap = event,
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
                    console.log(recMsg)
                    if (eventMap.indexOf(recMsg.cmd) != -1) {
                        store.commit('ADD_DATA', {name: recMsg.cmd, data: recMsg.res})
                    }
                }
            } catch (err) {
                console.log(err)
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


    self.$off = function (event) {
        eventMap = [];
    }

}

export function socketOn(event) {
    var socket = new Socket(event);
    return socket.$init()
}

export function socketOff(event) {
    var socket = new Socket();
    socket.$off(event);
}
