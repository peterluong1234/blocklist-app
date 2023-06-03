import { RequestHandler } from "express";
import UserModel from "../models/user";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import env from "../util/validateEnv";
import bcrypt from "bcrypt";

interface UserBody {
    username: string,
    email: string,
    password?: string,
}

export const createUser: RequestHandler<unknown, unknown, UserBody, unknown> = async (req, res, next) => {
    try {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const newUser = await UserModel.create({
            username: username,
            email: email,
            password: password,
        })
        const token = createJWT(newUser);
        res.status(201).json(token);
    } catch (error) {
        next(error);
    }
}

interface LoginBody {
    username: string,
    password: string,
}

export const loginUser: RequestHandler<unknown, unknown, LoginBody, unknown> = async (req, res, next) => {
    try {
        const user = await UserModel.findOne({ username: req.body.username});
                console.log(user);
        if(!user) throw new Error();
        // console.log(user);
        const match = await bcrypt.compare(req.body.password, user.password);
        if(!match) throw new Error();
        const token = createJWT(user);
        res.json(token);
    } catch (error) {
        next(error);
    }
}

const createJWT = (user: UserBody) => {
    return jwt.sign(
        { user },
        env.SECRET,
        { expiresIn: '48hr' }
    )
}