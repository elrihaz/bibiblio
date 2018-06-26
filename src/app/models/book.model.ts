export class Book {
    photo: string;
    synopsis: string;

    constructor(public id: number, public title: string, public authorFirstName: string, public authorLastName: string) {}
}
