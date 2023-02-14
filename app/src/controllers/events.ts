/** src/controllers/events.ts */
import { Request, Response, NextFunction } from 'express';
import Events from '../models/events';
import EventsRawData from '../models/eventsRawData';

interface Query {
    gt:string;
    lt:string;
 };

// getting all events
const getEvents = async (req: Request, res: Response, next: NextFunction) => {
    // get some events
    try{
        let {lt, gt} = req.query as unknown as Query;
        let filteSaleStartDate : {$lt: number, $gt: number} | {$lt: number} | {$gt: number} | undefined = (lt && gt) ? {$lt: parseInt(lt), $gt: parseInt(gt)} : lt ? {$lt: parseInt(lt)} : gt ? {$gt: parseInt(gt)} : undefined;
        let query = filteSaleStartDate ? [
            {
                "$lookup": 
                {"from": "eventsRawData",
                  "localField": "id",
                  "foreignField": "eventId",
                  "as": "eventsRawData"
                }
            },
            { $unwind: '$eventsRawData' },
            {
                "$match":{
                    $and: [
                        {'eventsRawData.smartContract.saleParams.startTime' : filteSaleStartDate}
                    ]
                }
            }
        ] : [
            {
                "$lookup": 
                {"from": "eventsRawData",
                  "localField": "id",
                  "foreignField": "eventId",
                  "as": "eventsRawData"
                }
            },
        ];
        var users = await Events.aggregate(query);
        return res.status(200).json({
            message: users
        });
    }catch(e){
        console.log(e);
    }
};

// getting a single event
const getEvent = async (req: Request, res: Response, next: NextFunction) => {
    // get some events
    try{
        let id: string = req.params.id;
        let query = [
            {
                "$lookup": 
                {"from": "eventsRawData",
                  "localField": "id",
                  "foreignField": "eventId",
                  "as": "eventsRawData"
                }
            },
            { $unwind: '$eventsRawData' },
            {
                "$match":{
                    $and: [
                        {id : parseInt(id)}
                    ]
                }
            }
        ];
        var users = await Events.aggregate(query);
        return res.status(200).json({
            message: users
        });
    }catch(e){
        console.log(e);
    }
};

// updating an event
const updateEvent = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { eventTitle, lineUp, collectionName, eventUrl } = req.body;
    let eventUpdate = { eventTitle, lineUp, eventUrl };

    await Events.updateOne({ id: id }, eventUpdate);
    const eventUpdated = await Events.find({ id: id });
    
    let eventRawDataUpdate = { collectionName };
    await EventsRawData.updateOne({ eventId: id }, eventRawDataUpdate);
    const eventRawDataUpdated = await EventsRawData.find({ eventId: id });

    return res.status(200).json({ data: {rawUpdated: eventRawDataUpdated, updated: eventUpdated}});
};


export default { getEvents, getEvent, updateEvent};