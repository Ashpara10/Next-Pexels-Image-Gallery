"use server";

type PexelProps = {
  query?: string;
  page: number;
};

export async function GetImagesFromPexels({ query, page }: PexelProps) {
  const apikey = process?.env?.PEXELS_APIKEY as string;
  const res = await fetch(
    `https://api.pexels.com/v1/search?query=${query}&page=${page}&per_page=12`,
    {
      headers: {
        Authorization: apikey,
      },
      next: { revalidate: 10 },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
