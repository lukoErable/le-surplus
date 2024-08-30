const fs = require('fs');

// Read the file
fs.readFile('ref.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  // Split the file contents into an array, removing any empty lines
  const items = data.split('\n').filter((item) => item.trim() !== '');

  // Remove duplicates using Set
  const uniqueItems = Array.from(new Set(items));

  // Join the unique items back into a string
  const uniqueData = uniqueItems.join('\n');

  // Output the unique items to a new file
  fs.writeFile('unique_items.txt', uniqueData, 'utf8', (err) => {
    if (err) {
      console.error('Error writing the file:', err);
      return;
    }
    console.log('Unique items have been written to unique_items.txt');
  });
});
