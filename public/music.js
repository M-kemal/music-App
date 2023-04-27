class Music {
    constructor (title, singer, img, file) {
        this.title = title;
        this.singer = singer;
        this.img = img;
        this.file = file;
    }

    getName() {
       return this.title + " - ";
    }
}

const musicList = [
    new Music("Ben Kimim", " Candan Erçetin", "1.jpg", "1.mp3"),
    new Music("Deli Kız", "Buray", "2.jpg", "2.mp3"),
    new Music("Dünyanın Sonuna Doğmuşum", "Manga", "3.jpg", "3.mp3"),
    new Music("Akdeniz", "Ayna", "4.jpg", "4.mp3"),
    new Music("Karşıyım", "Sezen Aksu", "5.jpg", "5.mp3"),
]