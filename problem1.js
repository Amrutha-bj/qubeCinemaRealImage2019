/*
SubmittedBy: Amrutha Balakrishnan
CreationDate: 15-05-2022
Description: Qube Cinema Real Image Challenge 2019 problem 1, Uncomment line 48 when run individually
*/
const fs = require("fs");
const partners = require("./partnersAndCapacity.json").Partners;
const path = require("path");
const problem1 = async function(filename) {
    var fileContent = await fs.readFileSync(path.join(__dirname,filename));
    var output = "";
    fileContent=fileContent.toString().split("\n");
    for(let i = 0; i < fileContent.length; i++){
        let input = fileContent[i];
        if(validate(input)){
            input = input.split(",");
            contentSize = parseInt(input[1]);
            theatreId = input[2];
            let provider = "";
            let finalCost = 0;
            let isDeliveryPossible = false;
            for(let p = 0; p < partners.length; p++){
                if(partners[p].Theatre == theatreId){
                    const SizeSlab = partners[p].SizeSlab.split("-");
                    if(contentSize >= parseInt(SizeSlab[0]) && contentSize <= parseInt(SizeSlab[1])){
                        const CostPerGB = partners[p].CostPerGB;
                        const Minimumcost = partners[p].Minimumcost;
                        const cost = Minimumcost > (contentSize * CostPerGB) ? Minimumcost: (contentSize * CostPerGB);
                        if(finalCost > cost || !isDeliveryPossible){
                            finalCost=cost;
                            provider=partners[p].PartnerID;
                            isDeliveryPossible=true;
                        }                      
                    }
                }
            }
            finalCost=finalCost==0?"":finalCost;
            output = output+input[0]+","+isDeliveryPossible+","+provider+","+finalCost+"\n";
        }     
    }
    console.log(output)
    fs.writeFileSync("./output1.csv",output);
}
function validate(str){
    if(str=="" || str==null || str == undefined) return false
    else return true;
}
// problem1("input.csv")
module.exports.problem1 = problem1;