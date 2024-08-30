import csvParser from 'csv-parser';
import fs from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

type Product = {
  Title: string;
  Image: string;
  Description: string;
};

export const GET = async () => {
  try {
    const results: Product[] = [];
    const csvFilePath = path.join(process.cwd(), 'scripts/marche/output.csv');

    // Lire et analyser le fichier CSV
    const readCSV = new Promise<Product[]>((resolve, reject) => {
      fs.createReadStream(csvFilePath)
        .pipe(csvParser())
        .on('data', (data) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', (error) => reject(error));
    });

    const rows = await readCSV;

    // Retourner les données en JSON
    return new NextResponse(JSON.stringify(rows), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ message: 'An error occurred', error: error }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
