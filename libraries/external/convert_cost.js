export const convertCost = (cost) => {
    cost = cost.toString();
    let len = cost.length;
    if (len > 3){
        cost = cost.substr(0,len - 3) + ',' + cost.substr(len - 3,len)
    }
    return cost;
}