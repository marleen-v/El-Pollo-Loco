class Contact extends Person {
    
    phone;
  
    constructor(firstName, lastName, phone) {
    super(firstName, lastName);
      
      this.phone = phone;
      console.log("New contact: " + this.firstName + " created");
    }
  
    call(){
        window.location.href = 'tel:' + this.phone;
    }

    printFullName (){
        console.log(`${this.firstName} ${this.lastName}`);
    }

  }