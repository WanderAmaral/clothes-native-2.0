export const truncateName = (name: string) => {
  return name.split(" ").slice(0, 2).join(" ");
};
