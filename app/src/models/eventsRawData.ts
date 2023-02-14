import * as mongoose from 'mongoose';
import { Model } from 'mongoose';

type EventRawDataType = EventRawDataModel & mongoose.Document;

export interface EventRawDataModel {
    eventId:{
        type: Number,
    }
    collectionName:{
        type: String,
    }
    smartContract: {
        crowdsale: String,
        collection: String,
        multisig: String,
        saleParam: {
            isPresale: Boolean,
            metadataList: Array<String>,
            pricePerToken: Number,
            maxMintPerUser: Number,
            saleSize: Number,
            saleCurrency: {
                xtz: String
            },
            startTime: Number,
            endTime: Number
        }
    }
};

const EventRawDataSchema = new mongoose.Schema({
    eventId:{
        type: Number,
    },
    collectionName:{
        type: String,
    },
    smartContract: {
        crowdsale: String,
        collection: String,
        multisig: String,
        saleParam: {
            isPresale: Boolean,
            metadataList: Array<String>,
            pricePerToken: Number,
            maxMintPerUser: Number,
            saleSize: Number,
            saleCurrency: {
                xtz: String
            },
            startTime: Number,
            endTime: Number
        }
    }
});

const EventsRawData: Model<EventRawDataType> = mongoose.model<EventRawDataType>('EventsRawData', EventRawDataSchema, 'eventsRawData');

export default EventsRawData;