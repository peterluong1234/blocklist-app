import { RequestHandler } from "express";
import BlocklistModel from '../models/blocklist';
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getBlocklists: RequestHandler = async (req, res, next) => {
    try {
        const blocklists = await BlocklistModel.find().exec();
        res.status(200).json(blocklists);
    } catch (error) {
        next(error);
    }
}


export const getBlockList: RequestHandler = async (req, res, next) => {
    const blocklistId = req.params.blocklistId;

    try {
        if (!mongoose.isValidObjectId(blocklistId)) {
            throw createHttpError(400, "Invalid blocklist id")
        }

        const blocklist = await BlocklistModel.findById(blocklistId).exec();

        if (!blocklist) {
            throw createHttpError(404, "Blocklist not found");
        }
        res.status(200).json(blocklist);
    } catch (error) {
        next(error);
    }
}

interface CreateBlocklistBody {
    name?: string,
    listOfURL?: string[],
}

export const createBlocklist: RequestHandler<unknown, unknown, CreateBlocklistBody, unknown > = async (req, res, next) => {
    // send name and array out of body
    const name = req.body.name;
    const listOfURL = req.body.listOfURL;

    try {
        if (!name) {
            throw createHttpError(400, "Blocklist must have a name");
        }
        const newBlocklist = await BlocklistModel.create({
            name: name,
            listOfURL: listOfURL,
        })

        res.status(201).json(newBlocklist);
    } catch (error) {
        next(error);
    }
}

interface UpdateBlocklistParams {
    blocklistId: string,
}

interface UpdateBlocklistBody {
    name?: string,
    listOfURL?: string[],
}

export const updateBlocklist: RequestHandler<UpdateBlocklistParams, unknown, UpdateBlocklistBody, unknown> = async(req, res, next) => {
    const blocklistId = req.params.blocklistId;
    const newName = req.body.name;
    const newListOfURL = req.body.listOfURL;
    
    try {
        if (!mongoose.isValidObjectId(blocklistId)) {
            throw createHttpError(400, "Invalid blocklist id")
        }
         
        if (!newName) {
            throw createHttpError(400, "Blocklist must have a name");
        }

        const blocklist = await BlocklistModel.findById(blocklistId).exec();

        if (!blocklist) {
            throw createHttpError(404, "blocklist not found");
        }

        blocklist.name = newName;

        // look into this to understand why type "string | undefined" cannot be just "string"
        // or how to navigate around this
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        blocklist.listOfURL = newListOfURL!;

        const updatedBlocklist = await blocklist.save();

        res.status(200).json(updatedBlocklist);
    } catch (error) {
        next(error);
    }
}

export const deleteBlocklist: RequestHandler = async(req, res, next) => {
    const blocklistId = req.params.blocklistId;

    try {
         if (!mongoose.isValidObjectId(blocklistId)) {
            throw createHttpError(400, "Invalid blocklist id")
        }

        await BlocklistModel.findByIdAndDelete(blocklistId).exec();

        // const blocklist = await BlocklistModel.findById(blocklistId).exec();
        // if (!blocklist) {
        //     throw createHttpError(404, "Blocklist not found");
        // }
        // why does .remove not work?
        // await blocklist.remove();
        
        res.sendStatus(204)

    } catch (error) {
        next(error);       
    }
}