const permission = {
  state: {
    permissionRoutes: []
  },
  init(data) {
    //const roles = data.roles;
    const router = data.router;
    // const permissionRoutes = _matchRouter(router);

    // function _matchRouter(router, menus) {
    //     return router.filter(v => {
    //         if (v.meta && v.meta.flag) {
    //             return menus.some(menu => {
    //                 let isMatch = menu.flag === v.meta.flag;
    //                 if (isMatch && v.children && menu.sub_menu) {
    //                     v.children = _matchRouter(v.children, menu.sub_menu);
    //                 }
    //
    //                 return isMatch;
    //             })
    //         }
    //
    //         return true;
    //     })
    // }

    // this.permissionRoutes = permissionRoutes;
    this.permissionRoutes = data.router;
  },
  hasPermission(menus, flag) {
      return menus.some(menu => {
          let isMatch = menu.flag === flag;
          if (!isMatch && menu.sub_menu) {
              isMatch = menu.sub_menu.some(sub => {
                  return sub.flag === flag;
              })
          }

          return isMatch;
      })
  },
  get() {
    return this.permissionRoutes
  }
};

export default permission;
