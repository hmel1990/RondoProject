export class Product {
  constructor(
    id, category, name, frame, tyres,
    deraileurFront, deraileurRear,
    saddle, shifters, price, color) 
    {
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
    this.color = color;
    }
}