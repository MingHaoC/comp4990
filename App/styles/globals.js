class rgba{
    constructor(r, g, b, a){
        let _r = r;
        this.r = () =>   {setR(r); return _r;}
        let setR = (r) =>  {_r = isValidRGB(r)}

        let _g = g;
        this.g = () =>   {setG(g); return _g;}
        let setG = (g) =>  {_g = isValidRGB(g)}

        let _b = b;
        this.b = () =>  {setB(b); return _b;}
        let setB = (b) => {_b = isValidRGB(b)}

        let _a = a;
        this.a = () =>  {setA(a); return _a;}
        let setA = (a) => {_a = isValidAlpha(a)}

        let isValidRGB = (value) => {
            if(value <= 255 && value >= 0){
                return value;
            }
            return 255
        }

        let isValidAlpha = (value) => {
            if(value <= 1 && value >= 0){
                return value;
            }
            return 1
        }
    }

    toString(){
        return `rgba(${this.r()},${this.g()},${this.b()},${this.a()})`
    }
}

let lightMode = true;

const textColours = {
    primary: lightMode ? new rgba(33,33,33,1) : new rgba(255,255,255,1),
    background: lightMode ? new rgba(255,255,255,1) : new rgba(0,0,0,1),
    muted: new rgba(155, 155, 159, 1),
    secondary: new rgba(91, 91, 96, 1),
    attention: new rgba(138, 16, 5, 1), 
    attention_1: new rgba(224, 0, 52, .7)
}

const colours = {
    primary: new rgba(136, 16, 5, 1),
    secondary: new rgba(224, 0, 52, .7), //lighter primary
    complement: new rgba(15, 188, 185, 1),
    foreground: lightMode ? new rgba(33, 33, 33, 1) : new rgba(248, 248, 248, 1),
    middleground: new rgba(111, 111, 111, 1),
    background: lightMode ? new rgba(248, 248, 248, 1) : new rgba(33, 33, 33, 1),
}
const fontFamily = ''

export {fontFamily,textColours, colours, rgba }