enum PropertyType {
  CONDO = 'CONDO',
  LANDED = 'LANDED',
  HDB = 'HDB Flat',
}

const propertyType: Record<PropertyType, string> = {
  CONDO: 'Condo',
  LANDED: 'Landed',
  [PropertyType.HDB]: 'HDB',
};

interface PropertyDetails {
  id: string;
  price: number;
  no_of_bedrooms: number;
  no_of_bathrooms: number;
  floor_area: number;
  street_name: string;
  unit_number: string;
  property_images: { image_url: string }[];
  facilities: string[];
  full_name: string;
  phone_number: string;
  email: string;
  postal_code: string;
  type_of_property: PropertyType;
  floor_level: string;
}

export const load = async ({ params, locals }) => {
  // const result = await
  const result = await locals.supabase
    .from('property_for_sale')
    .select('id, property_images (image_url), *')
    .eq('id', params.slug)
    .single();

  console.log(result);
  return {
    propertyData: {
      ...result.data,
      type_of_property: propertyType[result.data.type_of_property as PropertyType],
    } as PropertyDetails,
  };
};
