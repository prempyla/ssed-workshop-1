export class Participant {
    private static idCounter = 1;
    private _id: number;
    private _name: string;
    private _email: string;
    private _college: string;
    private _events: string[];

    constructor(name: string, email: string, college: string) {
        this._id = Participant.idCounter++;
        this._name = name;
        this._email = email;
        this._college = college;
        this._events = [];
    }

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get email(): string {
        return this._email;
    }

    get college(): string {
        return this._college;
    }

    get events(): string[] {
        return [...this._events]; 
    }
    public updateDetails(name?: string, college?: string): void {
        if (name) this._name = name;
        if (college) this._college = college;
    }

    public registerForEvent(event: string): void {
        if (!this._events.includes(event)) {
            this._events.push(event);
        }
    }

    public getDetails(): string {
        return `ID: ${this._id}, Name: ${this._name}, College: ${this._college}, Events: ${this._events.join(", ")}`;
    }
}
