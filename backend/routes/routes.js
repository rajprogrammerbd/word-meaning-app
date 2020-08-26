const express = require("express");
const routes = express.Router();
const database = require("./../database");

// Joi Validator
const Joi = require('joi');

// Getting All Data
routes.get('/', async (req, res) => {
    if ( Object.keys(req.body).length === 0 ) {
        await database.getFullData().then(r => res.send(r));
    } else res.status(500).send("Bad Request");
});

// Special Request to get Data While Typing.
routes.get('/async', async (req, res) => {
    if ( req.body.word ) {
        const schema = Joi.object({
            word: Joi.string().required()
        });

        try {
            await schema.validateAsync({ word: req.body.word }).then(async obj => {
                await database.userType(obj.word).then(succ => res.send(succ)).catch(err => res.send(err));
            });
        } catch ( ex ) {
            res.status(500).send({ status: false, statusCode: 500, message: "Validation Failed Appears" });
        }

    } else res.status(404).send({ status: false, statusCode: 404, message: "Request Word should be send" });
});

// Getting Single Data
routes.get('/single', async (req, res) => {
    if ( req.body.wordName ) {
        const newSchema = Joi.object({
            wordName: Joi.string().required()
        });

        try {
            await newSchema.validateAsync({ wordName: req.body.wordName }).then(async obj => {
                await database.singleData(obj.wordName).then(succ => res.send(succ)).catch(err => res.send(err));
            }).catch(err => req.send(err));
        } catch ( ex ) {
            res.status(500).send({ status: false, statusCode: 500, message: "Validation Failed Appears" });
        }
    } else res.send( { status: false, message: "Function expects a parameter" } );
});

// Posting Data
routes.post('/', async (req, res) => {
    if (!(Object.keys(req.body).length === 0) && Object.keys(req.body).length === 8 ) {
        const { word, bangla, definitionStatus, definationArr, synonymsStatus, synonymsArr, exceptionalStatus, exceptionalArr } = req.body;

        // Joi Validation
        const validationSchema = Joi.object({
            word: Joi.string().min(3).max(50).required(),
            bangla: Joi.string().required(),
            definitionStatus: Joi.boolean().required(),
            definationArr: Joi.array().items(Joi.string()).required(),
            synonymsStatus: Joi.boolean().required(),
            synonymsArr: Joi.array().items(Joi.string()).required(),
            exceptionalStatus: Joi.boolean().required(),
            exceptionalArr: Joi.array().items(Joi.string()).required(),
        });

        try {
            await validationSchema.validateAsync({ word, bangla, definitionStatus, definationArr, synonymsStatus, synonymsArr, exceptionalStatus, exceptionalArr }).then(ans => {
                database.add_work( ans.word, ans.bangla, ans.definitionStatus, ans.definationArr, ans.synonymsStatus, ans.synonymsArr, ans.exceptionalStatus, ans.exceptionalArr ).then(() => res.send({ status: true, statusCode: 200, message: "Data Inserted Success" })).catch(err => res.send(err));

            }).catch(err => res.status(500).send({ status: false, statusCode: 500, message: "Validation Failed Appears" }));
        }
        catch (err) {
            res.status(500).send({ status: false, statusCode: 500, message: "Validation Failed Appears" });
        }

    } else res.status(500).send({ status: false, statusCode: 500, message: "Bad Request" });
});

module.exports = routes;