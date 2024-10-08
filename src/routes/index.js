import { createRouter, createWebHistory } from "vue-router"

const routes = [
    {
        path:"/admin",
        name:"admin",
        component: () =>
            import("@/views/Dashboard.vue"),
    },
    {
        path:"/admin/manager-product",
        name:"manager-product",
        component: () =>
            import("@/views/ManagerProduct.vue"),
    },
    {
        path:"/admin/manager-category",
        name:"manager-category",
        component: () =>
            import("@/views/ManagerCategories.vue"),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router;