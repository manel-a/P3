class Station {
    constructor(jcstation) {
        this.number = jcstation.number;
        this.lat = jcstation.position.lat;
        this.lng = jcstation.position.lng;
        this.name = jcstation.name;
        this.address = jcstation.address;
        this.bike_stands = jcstation.bike_stands;
        this.available_bikes = jcstation.available_bikes;
        this.status = jcstation.status;
    }
}
