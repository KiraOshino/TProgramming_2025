abstract class Igrok {
    imya: string;
    zdorove: number;
    sila: number;
    tipGeroia: string; 
    propuskaetHod: boolean = false; 
    gorit: boolean = false;         



    constructor(imya: string, zdorove: number, sila: number, tipGeroia: string) {
        this.imya = imya;
        this.zdorove = zdorove;
        this.sila = sila;
        this.tipGeroia = tipGeroia;
    }
    abstract sdelatHod(protivnik: Igrok): void;
}







class Ricar extends Igrok {
    constructor(imya: string, zdorove: number, sila: number) {
        super(imya, zdorove, sila, "Ricar");
    }
    sdelatHod(protivnik: Igrok): void {
        let shans = Math.random() < 0.3;
        if (shans) {
            Logger.sposobnost(this.tipGeroia, this.imya, "Udar vozmezdia");
            let uron = Math.round(this.sila * 1.3);
            protivnik.zdorove -= uron;
            Logger.udar(this.tipGeroia, this.imya, uron, protivnik.tipGeroia, protivnik.imya);
        } else {
            protivnik.zdorove -= this.sila;
            Logger.udar(this.tipGeroia, this.imya, this.sila, protivnik.tipGeroia, protivnik.imya);
        }
    }
}
class Mag extends Igrok {
    constructor(imya: string, zdorove: number, sila: number) {
        super(imya, zdorove, sila, "Mag");
    }
    sdelatHod(protivnik: Igrok): void {
        let shans = Math.random() < 0.3;

        if (shans) {
            Logger.sposobnost(this.tipGeroia, this.imya, "Zavorozhenie");
            protivnik.propuskaetHod = true; 
            Logger.soobshenie("--> Protivnik zavorozhen i propustit sleduiushiy hod!");
        } else {
            protivnik.zdorove -= this.sila;
            Logger.udar(this.tipGeroia, this.imya, this.sila, protivnik.tipGeroia, protivnik.imya);
        }
    }
}
class Luchnik extends Igrok {
    bafIspolzovan: boolean = false;
    constructor(imya: string, zdorove: number, sila: number) {
        super(imya, zdorove, sila, "Luchnik");
    }
    sdelatHod(protivnik: Igrok): void {
        let shans = Math.random() < 0.3;

        if (shans && !this.bafIspolzovan) {
            Logger.sposobnost(this.tipGeroia, this.imya, "Ognennie streli");
            protivnik.gorit = true; 
            this.bafIspolzovan = true; 
            Logger.soobshenie("--> Protivnik zagorilsya!");
        } else {
            let itogUron = this.sila;
            if (this.bafIspolzovan) {
                itogUron += 2;
            }
            protivnik.zdorove -= itogUron;
            Logger.udar(this.tipGeroia, this.imya, itogUron, protivnik.tipGeroia, protivnik.imya);
        }
    }
}
class Game {
    static bazaImen: string[] = [
        "Artur", "Eldar", "Gendalf", "Villiams", "Legolas", "Aragorn", 
        "Boromir", "Gimli", "Ilidan", "Artas", "Trall", "Silvana"
    ];
    static sozdatSluchaynogoIgroka(): Igrok {
        let randImya = this.bazaImen[Math.floor(Math.random() * this.bazaImen.length)];
        let randZdorove = Math.floor(Math.random() * 51) + 100;
        let randSila = Math.floor(Math.random() * 11) + 15;     
        let randTip = Math.floor(Math.random() * 3);            
        if (randTip === 0) return new Ricar(randImya, randZdorove, randSila);
        if (randTip === 1) return new Mag(randImya, randZdorove, randSila);
        return new Luchnik(randImya, randZdorove, randSila);
    }
    static provediDuel(igrok1: Igrok, igrok2: Igrok): Igrok {
        Logger.duel(igrok1.tipGeroia, igrok1.imya, igrok2.tipGeroia, igrok2.imya);
        if (igrok1 instanceof Luchnik) igrok1.bafIspolzovan = false;
        if (igrok2 instanceof Luchnik) igrok2.bafIspolzovan = false;
        igrok1.gorit = false; igrok1.propuskaetHod = false;
        igrok2.gorit = false; igrok2.propuskaetHod = false;
        while (igrok1.zdorove > 0 && igrok2.zdorove > 0) {
            if (igrok1.propuskaetHod) {
                Logger.soobshenie("(" + igrok1.tipGeroia + ") " + igrok1.imya + " propuskaet hod iz-za zavorozhenia!");
                igrok1.propuskaetHod = false; 
            } else {
                if (igrok1.gorit) {
                    igrok1.zdorove -= 2;
                    Logger.soobshenie("(" + igrok1.tipGeroia + ") " + igrok1.imya + " poluchaet 2 urona ot gorenia. Ostalos HP: " + igrok1.zdorove);
                }
                if (igrok1.zdorove > 0) igrok1.sdelatHod(igrok2);
            }
            if (igrok2.zdorove <= 0) break; 
            if (igrok2.propuskaetHod) {
                Logger.soobshenie("(" + igrok2.tipGeroia + ") " + igrok2.imya + " propuskaet hod iz-za zavorozhenia!");
                igrok2.propuskaetHod = false; 
            } else {
                if (igrok2.gorit) {
                    igrok2.zdorove -= 2;
                    Logger.soobshenie("(" + igrok2.tipGeroia + ") " + igrok2.imya + " poluchaet 2 urona ot gorenia. Ostalos HP: " + igrok2.zdorove);
                }
                if (igrok2.zdorove > 0) igrok2.sdelatHod(igrok1);
            }
        }
        if (igrok1.zdorove > 0) {
            Logger.smert(igrok2.tipGeroia, igrok2.imya);
            return igrok1;
        } else {
            Logger.smert(igrok1.tipGeroia, igrok1.imya);
            return igrok2;
        }
    }
    static zapustitTurnir(kolichestvoIgrokov: number): void {
        if (kolichestvoIgrokov % 2 !== 0) {
            console.log("Oshibka: kolichestvo igrokov dolzhno bit chetniym!");
            return;
        }
        let uchastniki: Igrok[] = [];
        for (let i = 0; i < kolichestvoIgrokov; i++) {
            uchastniki.push(this.sozdatSluchaynogoIgroka());
        }
        let konNomer = 1;
        while (uchastniki.length > 1) {
            Logger.kon(konNomer);
            let pobediteliKona: Igrok[] = [];
            uchastniki.sort(() => Math.random() - 0.5);
            for (let i = 0; i < uchastniki.length; i += 2) {
                let pobeditel = this.provediDuel(uchastniki[i], uchastniki[i+1]);
                pobediteliKona.push(pobeditel);
            }
            uchastniki = pobediteliKona;
            konNomer++;
        }
        console.log("Победитель Турнира: (" + uchastniki[0].tipGeroia + ") " + uchastniki[0].imya);
    }
}









class Logger {
    static kon(nomerKona: number): void {
        console.log("\nKon " + nomerKona + ".");
    }

    static duel(tip1: string, imya1: string, tip2: string, imya2: string): void {
        console.log("\n(" + tip1 + ") " + imya1 + " vs (" + tip2 + ") " + imya2);
    }

    static udar(tip1: string, imya1: string, uron: number, tip2: string, imya2: string): void {
        console.log("(" + tip1 + ") " + imya1 + " nanosit uron " + uron + " protivniku (" + tip2 + ") " + imya2);
    }

    static sposobnost(tip: string, imya: string, nazvanieSposobnosti: string): void {
        console.log("(" + tip + ") " + imya + " ispolzuet (" + nazvanieSposobnosti + ")");
    }

    static soobshenie(tekst: string): void {
        console.log(tekst);
    }

    static smert(tip: string, imya: string): void {
        console.log("(" + tip + ") " + imya + " pogibaet");
    }
}
Game.zapustitTurnir(4);//выбор колво участников партейки
