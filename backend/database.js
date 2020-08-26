const mongoose = require("mongoose");
const port = require("./app");
const { required } = require("joi");
const databaseConnect = require("debug")("app:databaseConnect");
const failedConnect = require("debug")("app:failedConnect");
const failedToGetData = require("debug")("app:failedToGetData");

// Connect to the database...
mongoose.connect(`mongodb://localhost/Grammer`, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => databaseConnect("Successfully database is connected")).catch(err => failedConnect("Failed to connect to database"));

// Create Schema
const schema = mongoose.Schema({
    word: {
        type: String,
        required: true
    },
    bangla: {
        type: String,
        required: true
    },
    definition: {
        type: Object,
        required: true,
        validate: {
            validator: function(v) {
                const result = ( Object.keys(v).length < 2 ) ? false : true;
                return result;
            },
            message: "Definition object is not validate"
        }
    },
    synonyms: {
        type: Object,
        required: true,
        validate: {
            validator: function (v) {
                const result = ( Object.keys(v).length < 2 ) ? false : true;
                return result;
            },
            message: "Synonyms object is not validate"
        }
    },
    exceptionalBanglaMeanning: {
        type: Object,
        required: true,
        validate: function(v) {
            const result = ( Object.keys(v).length < 2 ) ? false : true;
            return result;
        }
    }
});

// Create a Model
const Grammer = new mongoose.model('Grammer', schema);


async function add_work( word, bangla, definitionStatus, definationArr, synonymsStatus, synonymsArr, exceptionalStatus, exceptionalArr ) {

    if ( word && bangla && (definitionStatus === true || definitionStatus === false) && definationArr && (synonymsStatus === true || synonymsStatus === false) && synonymsArr && (exceptionalStatus === true || exceptionalStatus === false) && exceptionalArr) {



        return new Promise(async (resolve, reject) => {
            await Grammer.find().then(async arr => {

                const find = arr.filter(o => o.word.toUpperCase() === word.toUpperCase());

                if ( find.length > 0 ) {
                    reject({ status: false, message: "Data is already saved in database" });
                } else {
                    const grammer = new Grammer({
                        word,
                        bangla,
                        definition: {
                            status: definitionStatus,
                            arr: definationArr
                        },
                        synonyms: {
                            status: synonymsStatus,
                            arr: synonymsArr
                        },
                        exceptionalBanglaMeanning: {
                            status: exceptionalStatus,
                            arr: exceptionalArr
                        }
                    });

                    await grammer.save().then(ans => resolve(ans)).catch(err => reject("Failed to save data"));
                }

            }).catch(err => failedToGetData('Failed to get data from servers'));
        });
    } else throw new Error('Parameters are not appopriate');
}

// Custom Function...
function getFullData() {
    return new Promise(async (resolve, reject) => {
        await Grammer.find().then(r => resolve(r)).catch(er => reject({ status: false }) );
    });
}

// Getting Data While User Typing Something
function userType(text) {
    if ( text ) {
        return new Promise(async (resolve, reject) => {
            await Grammer.find().then(arr => {
                const ans = arr.filter(obj => {
                    if ( obj.word.toUpperCase().search(text.toUpperCase()) > -1 ) {
                        return obj;
                    }
                });

                if ( ans.length === 0 ) {
                    reject({ status: false, message: "Nothing Found" });
                } else {
                    resolve({ status: true, statusCode: 200, array: ans });
                }
            }).catch(err => console.log('Failed to Getting Data'));
        });
    } else throw new Error("Function expects an a parameter");
}

// Getting Single Data from Database
function singleData( text ) {
    return new Promise(async (resolve, reject) => {
        await Grammer.find().then(arr => {
            const ans = arr.find(obj => obj.word.toUpperCase() === text.toUpperCase());

            if ( ans ) {
                resolve(ans);
            } else {
                reject( { status: false, message: "No word found!" } );
            }

        }).catch(err => reject( { status: false, statusCode: 404, message: "Word Doesn't Found" } ));
    });
}

module.exports = {
    getFullData,
    add_work,
    userType,
    singleData
}