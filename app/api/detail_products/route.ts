import csvParser from 'csv-parser';
import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

type Product = {
  ID: string;
  Title: string;
  Image: string;
  Description: string;
  FOURNISSEUR_NOM: string;
  FOURNISSEUR_REFERENCE: string;
  DATE_CREATION: string;
  'TAILLES/COULEURS': string;
};

export const dynamic = 'force-dynamic';

export const GET = async (request: NextRequest) => {
  try {
    const results: Product[] = [];
    const csvFilePath = path.join(process.cwd(), 'scripts/marche/output.csv');

    const readCSV = new Promise<Product[]>((resolve, reject) => {
      fs.createReadStream(csvFilePath)
        .pipe(csvParser())
        .on('data', (data) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', (error) => reject(error));
    });

    const rows = await readCSV;

    const productId = request.nextUrl.searchParams.get('id');

    if (productId) {
      const product = rows.find((row) => row.ID === productId);

      if (product) {
        return NextResponse.json(product);
      } else {
        return NextResponse.json(
          { message: 'Product not found' },
          { status: 404 }
        );
      }
    } else {
      return NextResponse.json(rows);
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'An error occurred', error: error },
      { status: 500 }
    );
  }
};
