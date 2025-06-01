export class Product {
  constructor(
    id, category, name, frame, tyres,
    deraileurFront, deraileurRear,
    saddle, shifters, price, color, image) 
    {
    this.id = id;
    this.category = category;
    this.name = name;
    this.frame = frame;
    this.tyres = tyres;
    this["deraileur front"] = deraileurFront;
    this["deraileur rear"] = deraileurRear;
    this.saddle = saddle;
    this.shifters = shifters;
    this.price = price;
    this.color = color;
    this.image = image;
    }
}