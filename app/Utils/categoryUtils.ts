export type Product = {
  ID: string;
  Title: string;
  Image: string;
  Description: string;
  SupplierName: string;
  Categories: {
    Category: string;
    Subcategory: string;
    SubSubcategory: string;
  }[];
  SizesColors: string;
};

export const categorizeProduct = (
  title: string
): {
  Category: string;
  Subcategory: string;
  SubSubcategory: string;
}[] => {
  const categories = [];

  // Vêtements
  if (title.match(/Casquette|Chapeau|Bonnet|Chèche|Tour de cou/i)) {
    categories.push({
      Category: 'Vêtements',
      Subcategory: 'Tête',
      SubSubcategory: title.match(/Casquette/i)
        ? 'Casquettes'
        : title.match(/Chapeau/i)
        ? 'Chapeaux'
        : title.match(/Bonnet/i)
        ? 'Bonnets'
        : title.match(/Cagoule|tour|/i)
        ? 'Cagoules'
        : 'Tour de cou',
    });
  }
  if (
    title.match(
      /Haut|T-Shirt|Tee-shirt|Tee|Polo|Chemise|Débardeur|Pull|Sweatshirt|Sweat|Polaire|Veste|Blouson|Parka|Coupe|jacket|Gilet|Poncho|Manteau|Shirt|Coat|Pluie|Combinaison|Summer/i
    )
  ) {
    categories.push({
      Category: 'Vêtements',
      Subcategory: 'Haut',
      SubSubcategory: title.match(/T-Shirt|Tee-shirt|Tee|coupe|Jacket/i)
        ? 'T-shirts'
        : title.match(/Polo/i)
        ? 'Polos'
        : title.match(/Chemise|Shirt/i)
        ? 'Chemises'
        : title.match(/Débardeur/i)
        ? 'Débardeurs'
        : title.match(/Pull|Sweatshirt|Sweat/i)
        ? 'Sweats & Pulls'
        : title.match(/Polaire/i)
        ? 'Polaire'
        : title.match(/Veste/i)
        ? 'Vestes'
        : 'Blousons & Parkas',
    });
  }
  if (
    title.match(
      /Short|Pantalon|Pant|Jean|Sous-vêtement|Caleçon|Ceinture|Fuseau|C111|spodenki/i
    )
  ) {
    categories.push({
      Category: 'Vêtements',
      Subcategory: 'Bas',
      SubSubcategory: title.match(/Short|spodenki/i)
        ? 'Shorts'
        : title.match(/Pantalon|Pant|Jean/i)
        ? 'Pantalons'
        : title.match(/Sous-vêtement|Caleçon/i)
        ? 'Sous-vêtements'
        : 'Ceintures',
    });
  }

  // Equipements
  if (
    title.match(
      /Camp|Dormir|Survie|Couteau|Outil|softie|hamac|couchage|bivvy|hammock/i
    )
  ) {
    categories.push({
      Category: 'Equipements',
      Subcategory: 'Bivouac & Campements',
      SubSubcategory: title.match(/Camp/i)
        ? 'Sur le camp'
        : title.match(/softie|hamac|couchage|bivvy|hammock/i)
        ? 'Dormir'
        : title.match(/Survie/i)
        ? 'Matériel de Survie'
        : 'Coutellerie & Outillage',
    });
  }
  if (
    title.match(
      /Sac à dos|Sac de transport|Sac marin|Musette|Sacoche|Rush|Sac|backpack|Coyote|bag/i
    )
  ) {
    categories.push({
      Category: 'Equipements',
      Subcategory: 'Bagagerie & Sac à dos',
      SubSubcategory: title.match(/Sac à dos|Rush|Backpack|Coyote/i)
        ? 'Sacs à dos'
        : title.match(/Sac de transport/i)
        ? 'Sacs de transport'
        : title.match(/Sac marin/i)
        ? 'Sacs marin'
        : title.match(/Musette|Sacoche|Sac en toile/i)
        ? 'Musettes & Sacoche'
        : 'Accessoires',
    });
  }
  if (title.match(/Lampe|Ceinture|Montre|Trousse médic|belt/i)) {
    categories.push({
      Category: 'Equipements',
      Subcategory: 'Equipements divers',
      SubSubcategory: title.match(/Lampe/i)
        ? 'Lampes'
        : title.match(/Ceinture|belt/i)
        ? 'Ceintures'
        : title.match(/z/i)
        ? 'Camouflage'
        : title.match(/Montre/i)
        ? 'Montres'
        : 'Trousse médic',
    });
  }
  if (
    title.match(
      /Pochette|Gilet tactique|Gant|Protection|Ceinturon|mitaines|gloves/i
    )
  ) {
    categories.push({
      Category: 'Equipements',
      Subcategory: 'Equipements militaire',
      SubSubcategory: title.match(/Pochette/i)
        ? 'Pochettes'
        : title.match(/Gilet tactique/i)
        ? 'Gilets tactique'
        : title.match(/Gant|mitaines|gloves/i)
        ? 'Gants'
        : title.match(/Protection/i)
        ? 'Protections'
        : 'Ceinturons',
    });
  }

  // Chaussures
  if (title.match(/Chaussure|MAGNUM|Zephyr|Sabot|Chaussette|Cirage|Lacet/i)) {
    if (title.match(/intervention/i)) {
      categories.push({
        Category: 'Chaussures',
        Subcategory: "Chaussures d'intervention",
        SubSubcategory: '',
      });
    } else if (title.match(/Chaussette|Cirage|Lacet/i)) {
      categories.push({
        Category: 'Chaussures',
        Subcategory: 'Accessoires',
        SubSubcategory: title.match(/Chaussette/i)
          ? 'Chaussettes'
          : title.match(/Cirage/i)
          ? 'Cirages'
          : 'Lacets',
      });
    } else {
      categories.push({
        Category: 'Chaussures',
        Subcategory: 'Chaussures outdoor & militaire',
        SubSubcategory: '',
      });
    }
  }

  // Airsofts
  if (
    title.match(
      /Airsoft|Réplique|Sniper|Bille|Gaz|Co2|Fumigène|Grenade|Silicone|Batterie|chargeur|Viseur|porte/i
    )
  ) {
    if (title.match(/Réplique longue/i)) {
      categories.push({
        Category: 'Airsofts',
        Subcategory: 'Répliques longues',
        SubSubcategory: '',
      });
    } else if (title.match(/Réplique courte/i)) {
      categories.push({
        Category: 'Airsofts',
        Subcategory: 'Répliques courtes',
        SubSubcategory: '',
      });
    } else if (title.match(/Sniper/i)) {
      categories.push({
        Category: 'Airsofts',
        Subcategory: 'Snipers',
        SubSubcategory: '',
      });
    } else if (title.match(/Bille|Gaz|Co2|Fumigène|Grenade|Silicone/i)) {
      categories.push({
        Category: 'Airsofts',
        Subcategory: 'Consommables',
        SubSubcategory: title.match(/Bille/i)
          ? 'Billes'
          : title.match(/Gaz|Co2/i)
          ? 'Gaz & Co2'
          : title.match(/Fumigène/i)
          ? 'Fumigènes'
          : title.match(/Grenade/i)
          ? 'Grenades'
          : 'Silicone',
      });
    } else if (title.match(/chargeur|Viseur|porte/i)) {
      categories.push({
        Category: 'Airsofts',
        Subcategory: 'Equipements',
        SubSubcategory: title.match(/chargeur|porte/i)
          ? 'Equipement du joueur'
          : title.match(/réplique|Viseur/i)
          ? 'Accessoires réplique'
          : 'Equipement tactique',
      });
    } else if (title.match(/Batterie|Chargeur/i)) {
      categories.push({
        Category: 'Airsofts',
        Subcategory: 'Batteries',
        SubSubcategory: title.match(/Nimh/i)
          ? 'Nimh'
          : title.match(/Lipo/i)
          ? 'Lipo'
          : 'Chargeurs',
      });
    }
  }

  // Sécurité et forces de l'ordre
  if (title.match(/Sécurité|Gendarmerie|Police|Sécu/i)) {
    if (title.match(/Sécurité|Sécu|secu/i)) {
      categories.push({
        Category: "Sécurité & Forces de l'ordre",
        Subcategory: 'Sécurité',
        SubSubcategory: title.match(
          /Coupe-vent|polo|Blouson|Parka|Sweat|Tee|Veste|T-shirt/i
        )
          ? 'Hauts sécurité'
          : title.match(/Pantalon/i)
          ? 'Bas sécurité'
          : title.match(/Brassard/i)
          ? 'Equipements sécurité'
          : 'Equipements sécurité',
      });
    } else {
      categories.push({
        Category: "Sécurité & Forces de l'ordre",
        Subcategory: 'Gendarmerie & Police',
        SubSubcategory: title.match(/Haut.*Gendarmerie/i)
          ? 'Hauts Gendarmerie'
          : title.match(/Bas.*Gendarmerie/i)
          ? 'Bas Gendarmerie'
          : title.match(/Equipement.*Gendarme/i)
          ? 'Equipement Gendarme'
          : 'Equipement Police',
      });
    }
  }

  // Chasse
  if (
    title.match(
      /Chasse|ibex|chamois|Fox Chaussure|Traque|Ghost|coupe-vent renfort/i
    )
  ) {
    categories.push({
      Category: 'Chasse',
      Subcategory: title.match(
        /Gilet|Veste|Blouson|Tee|Traque|poncho|coupe-vent renfort/i
      )
        ? 'Haut de chasse'
        : title.match(/Fuseau|Pantalon/i)
        ? 'Bas de chasse'
        : title.match(/Chaussure|ibex|chamois|Fox/i)
        ? 'Chaussures de chasse'
        : 'Accessoires de chasse',
      SubSubcategory: '',
    });
  }

  if (title.match(/Fourreau/i)) {
    categories.push({
      Category: 'Chasse',
      Subcategory: 'Accessoires de chasse',
      SubSubcategory: 'Fourreaux',
    });
  }

  // Si aucune catégorie n'a été trouvée, on ajoute une catégorie par défaut
  if (categories.length === 0) {
    categories.push({
      Category: 'Autres',
      Subcategory: '',
      SubSubcategory: '',
    });
  }

  return categories;
};

export const groupByCategory = (products: Product[]) => {
  return products.reduce((acc, product) => {
    product.Categories.forEach(({ Category, Subcategory, SubSubcategory }) => {
      if (!acc[Category]) {
        acc[Category] = {};
      }
      if (!acc[Category][Subcategory]) {
        acc[Category][Subcategory] = {};
      }
      if (!acc[Category][Subcategory][SubSubcategory]) {
        acc[Category][Subcategory][SubSubcategory] = [];
      }
      acc[Category][Subcategory][SubSubcategory].push(product);
    });
    return acc;
  }, {} as Record<string, Record<string, Record<string, Product[]>>>);
};
