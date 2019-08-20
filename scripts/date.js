//convert date to format how we want it to be formatted
const createDate = () => {
    let d = new Date();
    let formattedDate = "";

    formattedDate += (d.getMonth() + 1) + "_";
    formattedDate += d.getDate() + "_";
    formattedDate += d.getFullYear();

    return formattedDate;
}

module.exports = createDate;