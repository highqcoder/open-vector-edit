const orfFrameToColorMap = {
  0: "#FC5656",
  1: "#37E97C",
  2: "#56a9fc"
};
export default orfFrameToColorMap;

export const getOrfColor = orf => {
  return orfFrameToColorMap[orf.frame];
};
