import { Server, Socket } from "socket.io";
import { RoomsManager } from "../state/rooms-manager";
import ProgrammingCard from "../models/cards/ProgrammingCard";

export class GameSocket {
    private io: Server;
    private roomManager: RoomsManager;
    private client: Socket;

    constructor(io: Server, client: Socket, roomManager: RoomsManager) {
        this.io = io;
        this.client = client;
        this.roomManager = roomManager;
    }

    summonDigimons(){}
    playEnergyCard(idEnergyCard: string){}
    playEquipmentCard(){}
    playProgrammingCard({idProgrammingCard: string, playerId: string, targetCardOnStackId: string || null}) {

        // Assuming programmingCard has a method to execute its rules
        programmingCard.rules.forEach(rule => {
            // Apply the rule logic here
            console.log(`Applying rule: ${rule.action} on ${rule.targetZone}`);
        });

        // Emit an event to update the game state
        this.io.to(room.id).emit("programmingCardPlayed", {
            playerId: player.id,
            card: programmingCard
        });

    }
    playSummonDigimonCard(){}
    
    passPhase(){}


}