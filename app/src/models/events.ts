import * as mongoose from 'mongoose';
import { Model } from 'mongoose';

type EventType = EventModel & mongoose.Document;

export interface EventModel {
    id:{
        type: Number,
        required: true
    }
    eventTitle:{
        type: String,
        required: true
    }
    eventStartDate: {
        type: Date,
        required: true
    }
    eventEndDate: {
        type: Date,
        required: true
    }
    locationName: {
        type: String,
    }
    locationAddress: {
        type: String,
        required: true
    }    
    totalTicketNumber: {
        type: Number,
        required: true
    }    
    maximumTicketsPerUser: {
        type: Number,
        required: true
    }    
    saleStartDate: {
        type: Date,
        required: true
    }
    lineUp: {
        type: String,
    }    
    eventUrl: {
        type: String,
        required: true
    }
};

const EventSchema = new mongoose.Schema({
    id:{
        type: Number,
        required: true
    },
    eventTitle:{
        type: String,
        required: true
    },
    eventStartDate: {
        type: Date,
        required: true
    },
    eventEndDate: {
        type: Date,
        required: true
    },
    locationName: {
        type: String,
    },
    locationAddress: {
        type: String,
        required: true
    },    
    totalTicketNumber: {
        type: Number,
        required: true
    },    
    maximumTicketsPerUser: {
        type: Number,
        required: true
    },    
    saleStartDate: {
        type: Date,
        required: true
    },
    lineUp: {
        type: String,
    },    
    eventUrl: {
        type: String,
        required: true
    }
});

const Events: Model<EventType> = mongoose.model<EventType>('events', EventSchema);

export default Events;