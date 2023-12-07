import data from "./data.js";

function getProvinces(data) {
  return Object.keys(data);
}

function getDistrictsByProvince(province) {
  const tempDistricts = data[province];
  if (tempDistricts) {
    return tempDistricts;
  }
  return [];
}

function getSectorsByDistrict({ district, province }) {
  if (!province || !district) return [];
  const districts = getDistrictsByProvince(province);
  const sectors = districts[district];
  return sectors ?? [];
}

function getCellsBySector({ district, province, sector }) {
  if (!district || !province || !sector) return [];
  const sectors = getSectorsByDistrict({ province, district });
  return sectors[sector] ?? [];
}

function getVillagesByCell({ district, province, sector, cell }) {
  if (!province || !district || !sector || !cell) return [];
  const cells = getCellsBySector({ district, province, sector });
  const villages = cells[cell];
  return villages ?? [];
}

export const AdministrativeArea = {
  getProvinces,
  getDistrictsByProvince,
  getSectorsByDistrict,
  getCellsBySector,
  getVillagesByCell,
};
