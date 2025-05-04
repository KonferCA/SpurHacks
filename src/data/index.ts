import sponsorsData from './sponsors.json';
import links from './links.json';

/*
 *
 * @object Sponsors Data, Links
 *
 */
export { sponsorsData, links };

/*
 *
 * @object / section Sponsor Categories
 *
 */
export const singularitySponsors = sponsorsData.singularitySponsors;
export const entanglementSponsors = sponsorsData.entanglementSponsors;
export const quarkSponsors = sponsorsData.quarkSponsors;
export const quantaSponsors = sponsorsData.quantaSponsors;
export const partners = sponsorsData.partners;

/*
 *
 * @object / section Resource Paths
 *
 */
export const sponsorsBaseUrl = '/src/assets/sponsors/';

export default sponsorsData;
