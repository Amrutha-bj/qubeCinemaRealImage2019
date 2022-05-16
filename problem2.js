/*
SubmittedBy: Amrutha Balakrishnan
CreationDate: 1-05-2022
Description: Qube Cinema Real Image Challenge 2019 problem 2, Uncomment line 91 when run individually
*/
const fs = require("fs");
const partners = require("./partnersAndCapacity.json").Partners;
const capacity = require("./partnersAndCapacity.json").capacity;
const path = require("path");
const problem2 = async function(filename) {
    var fileContent = await fs.readFileSync(path.join(__dirname,filename));
    var output = "";
    const capacityObj = new Object();
    fileContent=fileContent.toString().split("\n");
    const inputJson = await sort(fileContent);
    for(let i = 0; i < inputJson.length; i++){
        let input = inputJson[i];
        contentSize = input.contentSize
        theatreId = input.theatre;
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
                        let pId = partners[p].PartnerID
                        capacityObj.hasOwnProperty(pId) ?
                            capacityObj[pId] = capacityObj[pId] + contentSize :
                            capacityObj[pId] = contentSize;
                        if(capacityObj[pId] < capacity[pId]){
                            finalCost=cost;
                            provider=partners[p].PartnerID;
                            isDeliveryPossible=true;
                        }
                        else{
                            capacityObj[pId] = capacityObj[pId] - contentSize;
                        }
                    }                      
                }
            }
        }
        finalCost=finalCost==0?"":finalCost;
        output = output+input.dataId+","+isDeliveryPossible+","+provider+","+finalCost+"\n";
             
    }
    console.log(output)
    fs.writeFileSync("./output2.csv",output);
}
function validate(str){
    if(str=="" || str==null || str == undefined) return false
    else return true;
}
const sort = async function(fileContent){
    const sortedArr = new Array();
    let input = fileContent[0].split(",");
    let object = {
        "dataId": input[0],
        "contentSize": parseInt(input[1]),
        "theatre": input[2]
    }
    sortedArr.push(object);
    //performing insertion sort to create a sorted json from input file, sorting w.r.t content size
    for(let i = 1; i < fileContent.length; i++){
        let arrIndex = i-1;
        input = fileContent[i];
        if(validate(input)){
            input = input.split(",");
            let contentSize = parseInt(input[1]);
            while(arrIndex>-1 && contentSize>sortedArr[arrIndex].contentSize){
                sortedArr[arrIndex+1] = sortedArr[arrIndex];
                arrIndex--;
            }
            arrIndex++;
            sortedArr[arrIndex] = {
                "dataId": input[0],
                "contentSize": parseInt(input[1]),
                "theatre": input[2]
            }

        }
    }
    console.log(sortedArr)
    return sortedArr;
}
// problem2("input.csv")
module.exports.problem2 = problem2