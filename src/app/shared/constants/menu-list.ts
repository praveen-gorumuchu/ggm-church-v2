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
        name: 'home',
        title: 'Home',
        url: 'dashboard/home',
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
        url: 'dashboard/quiz',
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
    {
        name: 'playQuiz',
        title: 'Play Quiz',
        url: 'play-ground/auidence',
        subMenu: [],
        icon: 'video_library'
    },
]

export const PlayGroundMenu = [
    {
        name: 'dashboard',
        title: 'Dashboard',
        url: 'dashboard/home',
        subMenu: [],
        icon: ''
    },
    {
        name: 'leaderBoard',
        title: 'Leader Board',
        url: 'play-ground/leaderboard',
        subMenu: [],
        icon: ''
    },
    {
        name: 'endQuiz',
        title: 'End Quiz',
        url: 'dashboard/evaluation',
        subMenu: [],
        icon: ''
    },
    // {
    //     name: 'demo',
    //     title: 'Demo',
    //     url: 'play-ground/leaderboard',
    //     subMenu: [],
    //     icon: 'group'
    // },
]



export interface MenuListModel {
    name: string,
    title: string,
    url: string,
    subMenu: Array<MenuListModel>,
    icon: string
}

export enum MenuListNameEnum {
    leaderBoard = 'leaderBoard',
    endQuiz = 'endQuiz',
}