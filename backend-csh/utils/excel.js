const XLSX = require('xlsx');
const {log} = require("./logging");

function createExcel(data) {
    log("Converting data to Excel");

    const worksheet = XLSX.utils.json_to_sheet(data, {
        header: ['mail', 'name', 'phone', 'createdAt']
    });

    worksheet.A1.v = "Adresse mail";
    worksheet.B1.v = "Nom";
    worksheet.C1.v = "Numéro de téléphone";
    worksheet.D1.v = "Date de souscription";

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Newsletter");

    return XLSX.write(workbook, {bookType: 'xlsx', type: 'buffer'});
}

module.exports = createExcel;