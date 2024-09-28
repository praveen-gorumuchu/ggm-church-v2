

export const CardsConstant = [
    {
        name: 'bible',
        title: 'Explore the Bible',
        icon: '',
        des: 'Dive into Scripture for guidance, inspiration, and spiritual growth.',
        path: 'bible',
        img: 'assets/images/bible.avif'
    },
    {
        name: 'songs',
        title: 'Worship in Song',
        icon: '',
        des: 'Experience uplifting melodies that inspire faith and joy.',
        path: 'songs',
        img: 'assets/images/songs.avif'
    },
    {
        name: 'prayer',
        title: 'Embrace Prayer',
        icon: '',
        des: 'Connect with God through heartfelt prayer and reflection.',
        path: 'songs',
        img: 'assets/images/prayer.avif'
    }
];

export interface CardsModel {
    name: string,
    title: string,
    icon: string,
    des: string,
    path: string,
    img: string
}