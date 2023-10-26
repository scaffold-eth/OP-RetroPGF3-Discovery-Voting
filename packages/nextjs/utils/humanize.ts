export function humanize(str: string): string {
  var i: number,
    frags = str.split("_");
  for (i = 0; i < frags.length; i++) {
    frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1).toLowerCase();
  }
  return frags.join(" ");
}
