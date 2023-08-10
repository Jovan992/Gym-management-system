export class staffMember {

    constructor(id: number, photo: string, name: string, surname: string, phone: number, role: string, email: string) {
        this.photo = photo;
        this.name = name;
        this.surname = surname;
        this.phone = phone;
        this.role = role;
        this.email = email;
    }

    public photo: string;
    public name: string;
    public surname: string;
    public phone: number;
    public role: string;
    public email: string;
}