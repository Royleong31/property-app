interface PropertyForSale {
  id: string;
  price: number;
  no_of_bedrooms: number;
  no_of_bathrooms: number;
  floor_area: number;
  street_name: string;
  unit_number: string;
  property_images: { image_url: string }[];
}

export const load = async ({ url, locals }) => {
  const searchParams = url.searchParams;
  const location = searchParams.get('location');
  const priceFrom = +(searchParams.get('priceFrom') ?? 0);
  const priceToString = searchParams.get('priceTo');
  let priceTo: null | number = null;

  console.log('running load');
  if (priceToString && !isNaN(+priceToString)) {
    priceTo = +priceToString;
  }

  const bedroomsString = searchParams.get('bedrooms');
  let bedrooms: null | number = null;
  if (bedroomsString && !isNaN(+bedroomsString)) {
    bedrooms = +bedroomsString;
  }

  let queryBuilder = locals.supabase
    .from('property_for_sale')
    .select(
      'id, property_images (image_url), price, no_of_bedrooms, no_of_bathrooms, floor_area, street_name, unit_number',
    )
    .order('created_at', { ascending: false });

  if (location) {
    queryBuilder = queryBuilder.ilike('street_name', `%${location}%`);
  }

  if (bedrooms) {
    queryBuilder = queryBuilder.eq('no_of_bedrooms', bedrooms);
  }

  if (priceFrom) {
    queryBuilder = queryBuilder.gte('price', priceFrom);
  }

  if (priceTo) {
    queryBuilder = queryBuilder.lte('price', priceTo);
  }

  const result = await queryBuilder;
  const data: PropertyForSale[] = result.data ?? [];
  return { propertyData: data };
};
