export interface BibleBookState {
    bookName?: string,
    bookId?: string,
    chapterName?: string,
    chapterNumber?: string,
    verses?: any[],
    currentVerseID?: number,
    showChapterName?: boolean,
    showBookname?: boolean,
    showVerseName?: boolean
}