export interface BibleBooksModel {
    list: Array<BibleBookTypes>
}

export interface BibileBookList {
    name: string,
    id: string,
    chapterCount: number,
    transliteration: string[];
}

export interface BibleBookTypes {
    name: BibeBookType,
    books: Array<BibileBookList>;
}

export enum BibeBookType {
    OLD = "oldTestment",
    NEW = "newTesetment"
}

export interface BibleBook {
    isBookMark: boolean,
    chapters: Array<ChapterList>;
    name: string,
    id: string
}

export interface ChapterList {
    name: string,
    id: string,
    verses: Array<VerseModel>
}

export interface VerseModel {
    des: string,
    id: string
}

export interface BookmarkListModel {
    verseId: string,
    currentChapterId: string,
    currentBookId: string,
    bookName: string,
    chapterName: string,
}