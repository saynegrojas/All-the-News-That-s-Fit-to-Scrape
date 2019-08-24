//convert date to format how we want it to be formatted
//=======================================================

//create a variable set to a function 
const createDate = () => {
    let d = new Date();
    let formattedDate = "";

    //index 0-11, add 1 
    formattedDate += (d.getMonth() + 1) + "_";
    formattedDate += d.getDate() + "_";
    formattedDate += d.getFullYear();

    //return final formatted date
    return formattedDate;
}

//export createDate
module.exports = createDate;