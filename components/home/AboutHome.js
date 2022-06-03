import React from "react";

export default function AboutHome() {
  return (
    <div className="py-32 flex bg-white">
      <p className="text-justify w-3/6 text-xl leading-8 p-16">
        <span className="pb-6 block">
          SpotPhoto est un site communautaire qui vous permet de programmer le
          lieu de votre prochaine photo.
        </span>
        <span className="pb-6 block">
          Partagez vos lieux préférés avec les membres de la communauté en
          ajoutant votre propre spot.
        </span>
        <span className="pb-6 block">
          Parce qu'une bonne photo passe par un bon repérage, il vous suffira
          d'ajouter les spots sélectionnés dans vos favoris pour être près le
          jour J!
        </span>
      </p>
      <h2 className="text-8xl font-bold w-3/6 text-right pr-16">
        Trouvez le spot parfait pour votre photo.
      </h2>
    </div>
  );
}
