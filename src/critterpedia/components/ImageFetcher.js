import React from "react";

const getImage = (folderName, filename) => {
  try {
    return require(`../assets/${folderName}/${filename}`);
  } catch (error) {
    console.error(`Image not found: ${folderName}/${filename}`, error);
    return null;
  }
};

export function ImageFetcher({ folderName, filename, iconEdge }) {
  const imageSrc = getImage(folderName, filename);

  if (!imageSrc) {
    return (
      <div>
        Image not found: {folderName}/{filename}
      </div>
    );
  }

  return (
    <div>
      <img
        key={filename}
        src={imageSrc.default}
        alt={filename}
        height={iconEdge}
        width={iconEdge}
      />
    </div>
  );
}
