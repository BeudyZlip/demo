// Tableaux

Soit utiliser le tableau semantic ui react classique
<Table>
 ....
</Table>


Soit utiliser le tableau générer

// Paramètres du Header
const columns = [
  {
    label: 'Nom de la colonne',   // Nom de la colonne dans le Head
    dataKey: 'col1',              // Clé de correspondance pour la colonne des rows
    sortable: true,               // Autorise le tri sur cette colonne
    props: {                      // Props du th
      ...
    }
  },
  ...
]

// Rows
const rows = [
  {
    // Props du row exemple onClick
    onClick: () => {},
    ...
    // Les céllules
    children: {
      col1: 'Valeur 1',
      col2: 'Valeur 2',
      col3: 'Valeur 3',
    },
  },
  ...
]

Pour ordonner par default une colonne completer "sortBy" et "sortDirection"
Pour garder le header du tableau sticky ajouter la props sticky

<Table rows={list} columns={columns} sortBy="name" sortDirection="ASC" sticky />
