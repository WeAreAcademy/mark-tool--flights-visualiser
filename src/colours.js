export default function colourForIndex(ix) {
  const lineColours = [
    "#313a42",
    "#9aad2e",
    "#f0ae3c",
    "#df4822",
    "#8eac9b",
    "#cc3d3f",
    "#ec8b1c",
    "#1b9268"
  ];

  return lineColours[ix % lineColours.length];
}
