export const cn = (...classes) => classes.filter(Boolean).join(" ");

export const removeDuplicates = (arr) => { return [...new Set(arr)] };

export const formatPrice = (price) => { return `$${price.toFixed(2)}` };

export const generateUsername = () => {
  const adjectives = [
    "Cool",
    "Super",
    "Amazing",
    "Fast",
    "Crazy",
    "Smart",
    "Sneaky",
  ];
  const nouns = [
    "Tiger",
    "Elephant",
    "Hawk",
    "Lion",
    "Panther",
    "Giraffe",
    "Fox",
  ];

  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  const randomNumber = Math.floor(Math.random() * 1000);

  return `${randomAdjective}${randomNoun}${randomNumber}`;
};
