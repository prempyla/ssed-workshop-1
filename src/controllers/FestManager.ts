import { Participant } from '../models/Participant';

class FestManager {
    private participants: Map<number, Participant>;

    constructor() {
        this.participants = new Map();
    }

    public addParticipant(participant: Participant): void {
        this.participants.set(participant.id, participant);
        console.log(`[Create] Participant added: ${participant.name} (ID: ${participant.id})`);
    }
    public getParticipant(id: number): Participant | undefined {
        return this.participants.get(id);
    }
    public getAllParticipants(): Participant[] {
        return Array.from(this.participants.values());
    }
    public updateParticipantDetails(id: number, name?: string, college?: string): boolean {
        const participant = this.participants.get(id);
        if (participant) {
            participant.updateDetails(name, college);
            console.log(`[Update] Participant updated: ID ${id}`);
            return true;
        }
        console.log(`[Update] Error: Participant with ID ${id} not found.`);
        return false;
    }
    public deleteParticipant(id: number): boolean {
        if (this.participants.has(id)) {
            this.participants.delete(id);
            console.log(`[Delete] Participant deleted: ID ${id}`);
            return true;
        }
        console.log(`[Delete] Error: Participant with ID ${id} not found.`);
        return false;
    }
}
export default FestManager;