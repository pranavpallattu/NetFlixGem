export const NetFlix_Logo =
  "https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png";

export const User_Avatar =
  "https://avatars.githubusercontent.com/u/180654151?v=4";

export const API_Options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
  },
};

export const Img_CDN = "https://image.tmdb.org/t/p/w500/";

export const Background_IMG =
  "https://assets.nflxext.com/ffe/siteui/vlv3/8200f588-2e93-4c95-8eab-ebba17821657/web/IN-en-20250616-TRIFECTA-perspective_9cbc87b2-d9bb-4fa8-9f8f-a4fe8fc72545_large.jpg";

export const Supported_Languages = [
  { identifier: "En", name: "English" },
  { identifier: "Hi", name: "Hindi" },
  { identifier: "Ml", name: "Malayalam" },
  { identifier: "Ta", name: "Tamil" },
];

