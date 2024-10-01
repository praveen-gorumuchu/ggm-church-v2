export const MenuList = [
    {
        name: 'home',
        title: 'Home',
        url: 'home',
        subMenu: [],
        icon: ''
    },
    {
        name: 'bible',
        title: 'Bible',
        url: 'bible',
        subMenu: [],
        icon: ''
    },
    
    {
        name: 'about',
        title: 'About',
        url: 'about',
        subMenu: [],
        icon: ''
    },
    {
        name: 'prayer',
        title: 'Prayer',
        url: 'prayer',
        subMenu: [],
        icon: ''
    },
    {
        name: 'dashboard',
        title: 'Dashboard',
        url: 'dashboard',
        subMenu: [],
        icon: ''
    }
]

export const DashboardMenu = [
    {
        name: 'dashboard',
        title: 'Dashboard',
        url: 'dashboard',
        subMenu: [],
        icon: 'space_dashboard'
    },
    {
        name: 'students',
        title: 'Students',
        url: 'dashboard/students',
        subMenu: [],
        icon: 'group'
    },
    {
        name: 'quiz',
        title: 'Quiz',
        url: 'dashboard/play-quiz',
        subMenu: [],
        icon: 'quiz'
    },
    {
        name: 'evaluation',
        title: 'Evaluation',
        url: 'dashboard/evaluation',
        subMenu: [],
        icon: 'library_books'
    },

]

export interface MenuListModel {
    name: string,
    title: string,
    url: string,
    subMenu: Array<MenuListModel>,
    icon: string
}