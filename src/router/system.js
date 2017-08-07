/* system */
const user = resolve => require(['../views/system/user'], resolve);
const role = resolve => require(['../views/system/role'], resolve);

export const systemChild = [
    {
        path: 'user',
        component: user,
        name: 'user',
        meta: { flag: 'admin_user', menuname: '用户管理'}
    },
    {
        path: 'role',
        component: role,
        name: 'role',
        meta: { flag: 'role', menuname: '角色管理'}
    }
]
