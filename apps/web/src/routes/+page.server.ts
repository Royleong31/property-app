import type { HomePageProps } from "$lib/types/routes/root";

export const load = async () => {
  const response = await fetch("http://localhost:3200/getHello");

  return {
    id: "sadf",
  } as HomePageProps;
};
