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

export const load = async ({ locals }) => {
  const result = await locals.supabase
    .from('property_for_sale')
    .select(
      'id, property_images (image_url), price, no_of_bedrooms, no_of_bathrooms, floor_area, street_name, unit_number',
    )
    .order('created_at', { ascending: false })
    .limit(4);

  const data: PropertyForSale[] = result.data ?? [];

  return { propertyData: data };
};
