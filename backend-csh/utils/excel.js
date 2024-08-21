const XLSX = require('xlsx');
const {log} = require("./logging");

function createExcel(data) {
    log("Converting data to Excel: " + JSON.stringify(data));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Newsletter");

    return XLSX.write(workbook, {bookType: 'xlsx', type: 'buffer'});
}

module.exports = createExcel;