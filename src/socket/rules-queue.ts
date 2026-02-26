export class RulesQueue {
    private io: Server;
    private roomManager: RoomsManager;
    private client: Socket;
    private eventQueue: any[] = [];
    private isProcessingQueue: boolean = false;
    constructor(io: Server, client: Socket, roomManager: RoomsManager) { 
        this.io = io;
        this.client = client;
        this.roomManager = roomManager;
    }

    async playProgrammingCard(programmingCard: ProgrammingCard, playerId: string, roomId: string) {
        // Agregar las reglas de la carta a la cola de eventos
        programmingCard.rules.forEach(rule => {
            this.eventQueue.push({
                action: rule.action,
                targetZone: rule.targetZone,
                playerId: playerId,
                cardId: programmingCard.id
            });
        });

        // Procesar la cola de eventos
        await this.processEventQueue(roomId);
    }

    private async processEventQueue(roomId: string) {
        if (this.isProcessingQueue) return; // Evitar procesar si ya está en curso
        this.isProcessingQueue = true;

        while (this.eventQueue.length > 0) {
            const event = this.eventQueue.shift(); // Obtener el siguiente evento

            if (event) {
                console.log(`Processing event: ${event.action} for player ${event.playerId}`);

                switch (event.action) {
                    case "discardCard":
                        await this.handleDiscardCard(event, roomId);
                        break;
                    case "drawCards":
                        this.handleDrawCards(event, roomId);
                        break;
                    default:
                        console.warn(`Unknown action: ${event.action}`);
                }

                // Emitir un evento al cliente para actualizar el estado
                this.io.to(roomId).emit("gameEventProcessed", event);
            }
        }

        this.isProcessingQueue = false;
    }

    private async handleDiscardCard(event: any, roomId: string) {
        console.log(`Waiting for player ${event.playerId} to select a card to discard...`);

        // Emitir un evento al cliente para solicitar la selección de una carta
        this.io.to(event.playerId).emit("selectCardToDiscard", { targetZone: event.targetZone });

        // Esperar la respuesta del cliente
        const selectedCardId = await this.waitForClientResponse(event.playerId, "cardSelected");

        console.log(`Player ${event.playerId} discarded card ${selectedCardId}`);
        // Implementar la lógica para descartar la carta seleccionada
    }

    private handleDrawCards(event: any, roomId: string) {
        console.log(`Player ${event.playerId} draws cards`);
        // Implementar la lógica para robar cartas
    }

    private waitForClientResponse(playerId: string, eventName: string): Promise<any> {
        return new Promise((resolve) => {
            const timeout = setTimeout(() => {
                console.warn(`Timeout waiting for response from player ${playerId}`);
                resolve(null); // Resolver con null si el cliente no responde a tiempo
            }, 30000); // Tiempo límite de espera (30 segundos)

            this.client.once(eventName, (data) => {
                clearTimeout(timeout); // Cancelar el timeout si el cliente responde
                resolve(data); // Resolver la promesa con los datos recibidos
            });
        });
    }

}

