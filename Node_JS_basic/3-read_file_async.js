const fs = require('fs');

function countStudents(path) {
  // 1. Return a Promise that wraps all the async logic
  return new Promise((resolve, reject) => {
    // 2. Read the file ASYNCHRONOUSLY with fs.readFile (callback err, data)
    fs.readFile(path, 'utf8', (err, data) => {
      // 3. If read error → reject with new Error('Cannot load the database')
      if (err) {
        reject(new Error('Cannot load the database'));
        return; // important: stop here, don't execute the rest
      }
      // 4. Otherwise (file read successfully):
      // 4.1. Split + filter to remove empty lines
      const lines = data.split('\n').filter((line) => line.trim() !== '');
      // 4.2. Separate the header from the rest with slice(1)
      const students = lines.slice(1);
      // 4.3. console.log the total number of students
      console.log(`Number of students: ${students.length}`);
      // 4.4. Group firstnames by field in an object { CS: [...], SWE: [...] }
      const byField = {};
      students.forEach((line) => {
        const [firstname, , , field] = line.split(',');
        if (!byField[field]) {
          byField[field] = [];
        }
        byField[field].push(firstname);
      });
      // 4.5. Sort field names alphabetically
      const fields = Object.keys(byField).sort();
      // 4.6. For each sorted field, console.log the required format
      fields.forEach((field) => {
        const names = byField[field];
        console.log(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
      });
      // 4.7. resolve() to signal that the Promise completed successfully
      resolve();
    });
  });
}

module.exports = countStudents;
