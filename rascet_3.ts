
class Film {
    nazvanie: string;
    rezhiser: string;
    godVypuska: number;





    constructor(nazvanie: string, rezhiser: string, godVypuska: number) {
        this.nazvanie = nazvanie;
        this.rezhiser = rezhiser;
        this.godVypuska = godVypuska;
    }
    proigratFilm(): void {
        console.log("Текущий фильм: " + this.nazvanie + " (" + this.godVypuska + ")");
        console.log("Режисер: " + this.rezhiser);
    }
}

let Films = new Film("Tokyo Ghoul", "Sui Ishida",  2014);
Films.proigratFilm();
 
