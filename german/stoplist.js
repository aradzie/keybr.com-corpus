import { loadStoplist } from "../stoplist/stoplist.js";

export const stoplist = loadStoplist()
  .add(["com", "eng", "etc", "www", "org", "inc"])
  .add(["bspw", "bzw", "ca", "evtl", "inkl", "usw"])
  .addFile("german/stoplist.txt")
  .addFile("german/stoplist-cities.txt")
  .addFile("german/stoplist-countries.txt")
  .addFile("german/stoplist-english.txt");
