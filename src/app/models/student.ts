export class Student {
  identification: number;
  name: string;
  surname: string;
  email: string;
  phone: string;
  birthdate: Date;
  address: string;
  active?: boolean;

  constructor(
    id:number,
    identification: number,
    name: string,
    surname: string,
    email: string,
    phone: string,
    birthdate: Date,
    address: string,
    active: boolean = true
  ) {
    this.identification = identification;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.phone = phone;
    this.birthdate = birthdate;
    this.address = address;
    this.active = active;
  }
}
