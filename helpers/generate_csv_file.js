import fs from 'fs';

async function generateCsvFile(jsonData, filePath) {
  // Define the CSV header and column names
  const csvHeader = Object.keys(jsonData[0]).join(',') + '\n';

  // Convert each JSON object to a CSV row
  const csvRows = jsonData.map(obj => Object.values(obj).join(','));

  // Combine the header and rows into a single CSV string
  const csvData = csvHeader + csvRows.join('\n');

  // Write the CSV data to the file
  await fs.promises.writeFile(filePath, csvData);
}

export default generateCsvFile;
