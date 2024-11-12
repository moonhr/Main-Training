class Animal {
  constructor(type) {
    this.type = type;
  }

  identify() {
    console.log(`I am a ${this.type}.`);
  }
}

const cat = new Animal('cat');
cat.identify();