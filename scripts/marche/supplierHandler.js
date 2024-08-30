const fs = require('fs');
const path = require('path');
const csvParser = require('csv-parser');
const { createObjectCsvWriter } = require('csv-writer');
const { v4: uuidv4 } = require('uuid');

// Import the categorizeProduct function
const { categorizeProduct } = require('./CategorizeProduct');

// Log file setup
const logFile = fs.createWriteStream('script.log', { flags: 'a' });
const originalConsoleLog = console.log;
const originalConsoleError = console.error;

console.log = (...args) => {
  originalConsoleLog(...args);
  logFile.write(`[LOG] ${args.join(' ')}\n`);
};

console.error = (...args) => {
  originalConsoleError(...args);
  logFile.write(`[ERROR] ${args.join(' ')}\n`);
};

async function loadProcessedReferences() {
  const references = new Set();
  if (fs.existsSync('output.csv')) {
    const readStream = fs.createReadStream('output.csv').pipe(csvParser());
    for await (const row of readStream) {
      references.add(row.FOURNISSEUR_REFERENCE);
    }
    console.log('Processed references:', Array.from(references));
  } else {
    console.log(
      'No output.csv file found, starting with an empty set of processed references.'
    );
  }
  return references;
}

async function executeSupplierScript(supplierName, supplierReference) {
  const supplierScriptPath = path.join(__dirname, `${supplierName}.js`);
  if (fs.existsSync(supplierScriptPath)) {
    try {
      const fetchProductDetails = require(supplierScriptPath);
      if (typeof fetchProductDetails === 'function') {
        console.log(
          `Fetching details for ${supplierName} with reference ${supplierReference}`
        );
        return await fetchProductDetails(supplierReference);
      } else {
        console.error(`The script for ${supplierName} is not a function.`);
      }
    } catch (error) {
      console.error(`Failed to execute script for ${supplierName}:`, error);
    }
  } else {
    console.warn(`No script found for supplier: ${supplierName}`);
  }
  return null;
}

async function processArticles() {
  const outputPath = 'output.csv';
  const fileExists = fs.existsSync(outputPath);

  // If the file doesn't exist, write the header manually
  if (!fileExists) {
    const header =
      '"ID","FOURNISSEUR_NOM","FOURNISSEUR_REFERENCE","SizesColors","DATE_CREATION","Title","Image","Description","Category","Subcategory","SubSubcategory"\n';
    fs.writeFileSync(outputPath, header);
  }

  const csvWriter = createObjectCsvWriter({
    path: outputPath,
    header: [
      { id: 'id', title: 'ID' },
      { id: 'supplierName', title: 'FOURNISSEUR_NOM' },
      { id: 'supplierReference', title: 'FOURNISSEUR_REFERENCE' },
      { id: 'sizesColors', title: 'SizesColors' },
      { id: 'dateCreation', title: 'DATE_CREATION' },
      { id: 'title', title: 'Title' },
      { id: 'image', title: 'Image' },
      { id: 'description', title: 'Description' },
      { id: 'category', title: 'Category' },
      { id: 'subcategory', title: 'Subcategory' },
      { id: 'subSubcategory', title: 'SubSubcategory' },
    ],
    append: true,
  });

  const processedReferences = await loadProcessedReferences();
  const processedReferenceSet = new Set(processedReferences);
  const loggedReferences = new Set(); // To track logged references
  const readStream = fs.createReadStream('ARTICLES.csv').pipe(csvParser());

  const groupedData = {};

  for await (const row of readStream) {
    const { FOURNISSEUR_NOM, FOURNISSEUR_REFERENCE, DATE_CREATION, Libellé } =
      row;

    if (!groupedData[FOURNISSEUR_REFERENCE]) {
      groupedData[FOURNISSEUR_REFERENCE] = {
        supplierName: FOURNISSEUR_NOM,
        supplierReference: FOURNISSEUR_REFERENCE,
        dateCreation: DATE_CREATION,
        sizesColors: new Set(),
      };
    }

    // Extract size and color from Libellé
    const sizeColorMatch = Libellé.match(
      /(?:([XSMLXL2XL3XL4XL]+|\d{2})\/([A-Z]+))/
    );
    if (sizeColorMatch) {
      const size = sizeColorMatch[1];
      const color = sizeColorMatch[2];
      groupedData[FOURNISSEUR_REFERENCE].sizesColors.add(`${size}/${color}`);
    }
  }

  for (const ref in groupedData) {
    const data = groupedData[ref];
    const sizesColors = Array.from(data.sizesColors).join(', ');

    if (
      data.supplierName === 'MP-SEC' ||
      data.supplierName === 'GILBERT' ||
      data.supplierName === 'TREESCO' ||
      data.supplierName === 'GK' ||
      data.supplierName === 'PROMODIS' ||
      data.supplierName === 'WOOLPOWER' ||
      data.supplierName === 'Brandit' ||
      data.supplierName === 'BILLY EIGHT' ||
      data.supplierName === 'HIGHLANDER' ||
      data.supplierName === 'HELIKON-TEX' ||
      data.supplierName === 'VANOS' ||
      data.supplierName === 'A10' ||
      data.supplierName === 'SUMMIT'
    ) {
      console.log(
        `Processing supplier: ${data.supplierName} with reference ${data.supplierReference}`
      );
      const productDetails = await executeSupplierScript(
        data.supplierName,
        data.supplierReference
      );

      if (productDetails && productDetails.title) {
        // Categorize the product
        const { Category, Subcategory, SubSubcategory } = categorizeProduct(
          productDetails.title
        );

        const record = {
          id: uuidv4(),
          supplierName: data.supplierName,
          supplierReference: data.supplierReference,
          sizesColors: sizesColors,
          dateCreation: data.dateCreation,
          title: productDetails.title,
          image: productDetails.image,
          description: productDetails.description,
          category: Category,
          subcategory: Subcategory,
          subSubcategory: SubSubcategory,
        };

        await csvWriter.writeRecords([record]);
        console.log(
          `Record written successfully for reference: ${data.supplierReference}`
        );

        processedReferenceSet.add(data.supplierReference);
        console.log(
          `Successfully fetched details for ${data.supplierName} with reference ${data.supplierReference}`
        );
      } else {
        if (!loggedReferences.has(data.supplierReference)) {
          console.log(
            `Unregistered reference: ${data.supplierName} - ${data.supplierReference}`
          );
          loggedReferences.add(data.supplierReference);
        }
      }
    } else {
      console.log(`Supplier ${data.supplierName} not recognized.`);
    }
  }

  console.log('All records processed');
}

processArticles().catch((error) =>
  console.error('Error processing articles:', error)
);
