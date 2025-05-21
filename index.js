class Bike {
    constructor({
                    id,
                    category,
                    name,
                    frame,
                    tyres,
                    deraileurFront,
                    deraileurRear,
                    saddle,
                    shifters,
                    price,
                    image,
                    color
                }) {
        this.id = id;
        this.category = category;
        this.name = name;
        this.frame = frame;
        this.tyres = tyres;
        this.deraileurFront = deraileurFront;
        this.deraileurRear = deraileurRear;
        this.saddle = saddle;
        this.shifters = shifters;
        this.price = price;
        this.image = image;
        this.color = color;
    }

    getFullName() {
        return `${this.category} ${this.name}`;
    }

    toString() {
        return `${this.getFullName()} — ${this.frame}, ${this.tyres}, Цена: €${this.price}`;
    }
}

