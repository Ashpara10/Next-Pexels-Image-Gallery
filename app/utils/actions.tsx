"use server";

type PexelProps = {
  query?: string;
  page: number;
};

const apikey = process?.env?.PEXELS_APIKEY as string;
export async function GetImagesFromPexels({ query, page }: PexelProps) {
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

export async function GetImageFromId({ id }: { id: number }) {
  const res = await fetch(`https://api.pexels.com/v1/photos/${id}`, {
    headers: {
      Authorization: apikey,
    },
    next: { revalidate: 10 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
