import React, { useState, useEffect } from "react";
import Jimp from "jimp";
import { Image } from "react-native";

interface Props {
  uri: string;
}

const GrayscaleImage: React.FC<Props> = ({ uri }) => {
  const [base64, setBase64] = useState<string>("");

  useEffect(() => {
    (async () => {
      const image = await Jimp.read(uri);
      image.grayscale();
      setBase64(await image.getBase64Async(Jimp.MIME_JPEG));
    })();
  }, [uri]);

  return base64 ? <Image source={{ uri: base64 }} /> : null;
};

export default GrayscaleImage;