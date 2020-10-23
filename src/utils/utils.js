import fs from 'fs';

const loadRoutes = async (routesPath, prefix, app) => {
  try {
    fs.readdirSync(routesPath).filter(el => /\.js$/.test(el)).forEach((fileName) => {
      import(`${routesPath}${fileName}`)
        .then(fileObject => {
          console.log(`Load routes at: ${fileName}`);
          app.use(prefix, fileObject.default);
        })
        .catch(error => console.error('UNABLE TO IMPORT FILES', error));
    });
  } catch (error) {
    console.error('UNABLE TO READ DIRECTORY', error);
  }
}

// Filter an array
const filterByKey = (array, key, value) => {
  return array.filter(element => (element[key] == value));
}

// Sort an array
const sortByKey = (array, key, order) => {
  return array.sort((a, b) => {
      var x = a[key];
      var y = b[key];
      if (order == 'asc') {
          return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      } else if (order == 'desc') {
          return ((x < y) ? 1 : ((x > y) ? -1 : 0));
      } else {
          return 0;
      }
  });
}

export {
  loadRoutes,
  filterByKey,
  sortByKey
};