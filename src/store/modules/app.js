const app = {
    state: {
        sidebar: {
            opened: true,
        },
        laser: {}
    },
    mutations: {
        TOGGLE_SIDEBAR: state => {
            if (state.sidebar.opened) {
                sessionStorage.setItem('sidebarStatus', 1);
            } else {
                sessionStorage.setItem('sidebarStatus', 0);
            }
            state.sidebar.opened = !state.sidebar.opened;
        },
        ADD_DATA: (state, event) => {
            console.log(event)
            let name = event.name
            let data = event.data
            state.laser[name] = data
        }
    },
    actions: {
        ToggleSideBar: ({commit}) => {
            commit('TOGGLE_SIDEBAR')
        }
    }
}

export default app;
