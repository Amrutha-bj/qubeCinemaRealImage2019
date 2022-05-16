/*
SubmittedBy: Amrutha Balakrishnan
CreationDate: 16-05-2022
Description: Qube Cinema Real Image Challenge 2019, Run index file to run both problems together.
*/
const {problem1} = require("./problem1")
const {problem2} = require("./problem2")
const handler = async function(event){
    await problem1(event.fileName);
    await problem2(event.fileName);
}
handler({fileName: "input.csv"})