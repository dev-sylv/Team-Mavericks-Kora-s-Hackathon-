import mongoose, { Schema, model } from "mongoose";

import { BusinessDetails } from "../AllInterfaces/Interfaces";

import isEmail from "validator/lib/isEmail";

const BusinessSchema: Schema<BusinessDetails> = new Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        lowercase: true,
        trim: true,
        validate: [isEmail, "Please enter a valid email"],
    },
    logo: {
        type: String,
    },
    password: {
        type: String,
        required: [true, "Please enter your Password"]
    },
    confirmPassword: {
        type: String,
        required: [true, "Please confirm your password"]
    },
    BusinessCode: {
        type: String,
        unique: true,
    },
    