
const getters = {
    sidebar: state => state.app.sidebar,
    token: state => state.user.token,
    authenticated: state => state.user.authenticated,
    name: state => state.user.name,
    laserData: state => state.app.laser
};
export default getters
