export type Author = {
  name: string;
  image: string;
};

export type Authors = {
  [key: string]: Author;
};

export const authors: Authors = {
  codehagen: {
    name: "Christer Hagen",
    image:
      "https://imagedelivery.net/r-6-yk-gGPtjfbIST9-8uA/addc4b60-4c8f-47d7-10ab-6f9048432500/public",
  },
};
