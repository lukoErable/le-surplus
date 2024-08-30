// Fonction pour catégoriser un produit en fonction de son titre
function categorizeProduct(title) {
  if (
    title.match(
      /Blouson|Parka|Veste|Jacket|Coupe-vent|Poncho|manteau|Coupe vent|Coat/i
    )
  ) {
    return {
      Category: 'Vêtements',
      Subcategory: 'Hauts',
      SubSubcategory: 'Blousons',
    };
  } else if (title.match(/Chemise/i)) {
    return {
      Category: 'Vêtements',
      Subcategory: 'Hauts',
      SubSubcategory: 'Chemises',
    };
  } else if (title.match(/Polo/i)) {
    return {
      Category: 'Vêtements',
      Subcategory: 'Hauts',
      SubSubcategory: 'Polos',
    };
  } else if (title.match(/Gilet/i)) {
    return {
      Category: 'Vêtements',
      Subcategory: 'Hauts',
      SubSubcategory: 'Gilets',
    };
  } else if (title.match(/Pull|Sweatshirt|Sweat/i)) {
    return {
      Category: 'Vêtements',
      Subcategory: 'Hauts',
      SubSubcategory: 'Pulls',
    };
  } else if (title.match(/T-Shirt|Tee-shirt|Tee/i)) {
    return {
      Category: 'Vêtements',
      Subcategory: 'Hauts',
      SubSubcategory: 'T-shirts',
    };
  } else if (title.match(/Débardeur/i)) {
    return {
      Category: 'Vêtements',
      Subcategory: 'Hauts',
      SubSubcategory: 'Débardeurs',
    };
  } else if (title.match(/Haut/i)) {
    return {
      Category: 'Vêtements',
      Subcategory: 'Hauts',
      SubSubcategory: '',
    };
  } else if (title.match(/Pantalon|Pant|Jean|Fuseau|Patrol-autumn lato/i)) {
    return {
      Category: 'Vêtements',
      Subcategory: 'Bas',
      SubSubcategory: 'Pantalons',
    };
  } else if (title.match(/Short|Spodenki/i)) {
    return {
      Category: 'Vêtements',
      Subcategory: 'Bas',
      SubSubcategory: 'Shorts',
    };
  } else if (title.match(/Caleçon/i)) {
    return {
      Category: 'Vêtements',
      Subcategory: 'Bas',
      SubSubcategory: 'Caleçons',
    };
  } else if (title.match(/Casquette|Bonnet|Chapeau/i)) {
    return {
      Category: 'Accessoires',
      Subcategory: 'Couvre-chef',
      SubSubcategory: '',
    };
  } else if (title.match(/Ceinturon|Belt|Ceinture/i)) {
    return {
      Category: 'Accessoires',
      Subcategory: 'Ceintures',
      SubSubcategory: '',
    };
  } else if (title.match(/Gant|Gloves|Mitaines/i)) {
    return {
      Category: 'Accessoires',
      Subcategory: 'Gants',
      SubSubcategory: '',
    };
  } else if (title.match(/Masque|Cagoule|Tour de cou|Tour du cou/i)) {
    return {
      Category: 'Accessoires',
      Subcategory: 'Masques',
      SubSubcategory: '',
    };
  } else if (
    title.match(/Sac|Pochette|Bag|Kitbag|Musette|Rush|Backpack|BFM/i)
  ) {
    return {
      Category: 'Accessoires',
      Subcategory: 'Sacs',
      SubSubcategory: '',
    };
  } else if (title.match(/Porte|Lampe|Poche/i)) {
    return {
      Category: 'Accessoires',
      Subcategory: '',
      SubSubcategory: '',
    };
  } else if (title.match(/Chaussure|MAGNUM|Zephyr|Sabot/i)) {
    return { Category: 'Chaussures', Subcategory: '', SubSubcategory: '' };
  } else if (title.match(/Fourreau/i)) {
    return {
      Category: 'Chasse',
      Subcategory: 'Fourreaux',
      SubSubcategory: '',
    };
  } else if (title.match(/Viseur|Monoculaire/i)) {
    return {
      Category: 'Airsoft',
      Subcategory: 'réticules',
      SubSubcategory: '',
    };
  } else if (title.match(/Airsoft/i)) {
    return {
      Category: 'Airsoft',
      Subcategory: '',
      SubSubcategory: '',
    };
  } else {
    return { Category: 'Autres', Subcategory: '', SubSubcategory: '' };
  }
}

// Fonction pour regrouper les produits par catégorie
function groupByCategory(products) {
  return products.reduce((acc, product) => {
    const { Category, Subcategory, SubSubcategory } = product;
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
    return acc;
  }, {});
}

// Export des fonctions
module.exports = {
  categorizeProduct,
  groupByCategory,
};
