document.addEventListener("DOMContentLoaded", () => {
  const gearItems = document.querySelectorAll(".gear-item");
  const productItems = document.querySelectorAll(".product-item");

  const FILTER_DATA = {
    walk: {
      label: "Walk Gear",
      icon: "IconWalkblack.svg",
      products: [
        { name: "Walker Active", image: "WalkerActive.png" },
        { name: "Walker Aura", image: "WalkerAura.png" },
        { name: "Walker Balance", image: "WalkerBalance.png" },
        { name: "Walker Base", image: "WalkerBase.png" },
        { name: "Walker Blush", image: "WalkerBlush.png" },
        { name: "Walker Core", image: "WalkerCore.png" },
        { name: "Walker Ease", image: "WalkerEase.png" },
        { name: "Walker Elite", image: "WalkerElite.png" },
        { name: "Walker Hiker", image: "WalkerHiker.png" },
        { name: "Walker Plus", image: "WalkerPlus.png" },
        { name: "Walker Stealth", image: "WalkerStealth.png" },
        { name: "Walker Strider", image: "WalkerStrider.png" },
        { name: "Walker Stroll", image: "WalkerStroll.png" },
        { name: "Walker Tempo", image: "WalkerTempo.png" },
        { name: "Walker Trek", image: "WalkerTrek.png" }
      ]
    },

    run: {
      label: "Run Gear",
      icon: "IconJogblack.svg",
      products: [
        { name: "Jogger Air", image: "JoggerAir.png" },
        { name: "Jogger Flow", image: "JoggerFlow.png" },
        { name: "Jogger Ice", image: "JoggerIce.png" },
        { name: "Jogger Lux", image: "JoggerLux.png" },
        { name: "Jogger Motion", image: "JoggerMotion.png" },
        { name: "Jogger Pro", image: "JoggerPro.png" },
        { name: "Jogger SE", image: "JoggerSE.png" },
        { name: "Jogger Speed", image: "JoggerSpeed.png" },
        { name: "Jogger Stealth", image: "JoggerStealth.png" },
        { name: "Jogger Ultra", image: "JoggerUltra.png" }
     
      ]
    },

    cycle: {
      label: "Cycle Gear",
      icon: "IconCycleblack.svg",
      products: [
        { name: "Bike Air", image: "BikeAir.png" },
        { name: "Bike Bloom", image: "BikeBloom.png" },
        { name: "Bike Pro", image: "BikePro.png" },
        { name: "Bike Racer", image: "BikeRacer.png" },
        { name: "Bike Stealth", image: "BikeStealth.png" },
        { name: "Bike X", image: "BikeX.png" },
        { name: "Bike Dasher", image: "BikeDasher.png" },
        { name: "Bike Cruiser", image: "BikeCruiser.png" },
        { name: "Bike Pacer", image: "BikePacer.png" }
       
      ]
    },

    swim: {
      label: "Swim Gear",
      icon: "IconSwimblack.svg",
      products: [
        { name: "Swim Air", image: "SwimmerAir.png" },
        { name: "Swim Glide", image: "SwimmerGlide.png" },
        { name: "Swim Ultra", image: "SwimmerUltra.png" },
        { name: "Swim Vision", image: "SwimmerVision.png" }
      ]
    },

    golf: {
      label: "Golf Gear",
      icon: "IconGolfblack.svg",
      products: [
        { name: "Golf Spec", image: "GolfSpec.png" },
        { name: "Golf Stealth", image: "GolfStealth.png" },
        { name: "Golf Control", image: "GolfControl.png" },
        { name: "Golf Flow", image: "GolfFlow.png" },
        { name: "Golf Nitro", image: "GolfNitro.png" },
        { name: "Golf StealthV2", image: "GolfStealthV2.png" }
      ]
    },

    padel: {
      label: "Padel Gear",
      icon: "IconPadelblack.svg",
      products: [
        { name: "Padel Power", image: "PadelPrime.png" },
        { name: "Padel Strike", image: "PadelStealth.png" },
        { name: "Padel Pro", image: "PadelX.png" },
         { name: "Padel Pro", image: "PadelSwift.png" },
        { name: "Padel Elite", image: "PadelControl.png" }
      ]
    },

    tennis: {
      label: "Tennis Gear",
      icon: "IconTennisblack.svg",
      products: [
        { name: "Tennis Flow", image: "TennisFlow.png" },
        { name: "Tennis Core", image: "TennisCore.png" },
        { name: "Tennis Motion", image: "TennisMotion.png" },
        { name: "Tennis Tempo", image: "TennisTempo.png" },
        { name: "Tennis Prime", image: "TennisPrime.png" },
        { name: "Tennis Touch", image: "TennisTouch.png" }
        
      ]
    },

    squash: {
      label: "Squash Gear",
      icon: "IconSquashblack.svg",
      products: [
        { name: "Squash Control", image: "SquashControl.png" },
        { name: "Squash Flow", image: "SquashFlow.png" },
        { name: "Squash Motion", image: "SquashMotion.png" },
        { name: "Squash Speed", image: "SquashSpeed.png" }
      ]
    },

    pickleball: {
      label: "PickleBall Gear",
      icon: "IconPickleballblack.svg",
      products: [
        { name: "PickleBall Base", image: "PickleBallBase.png" },
        { name: "PickleBall Core", image: "PickleBallCore.png" },
        { name: "PickleBall Elite", image: "PickleBallElite.png" },
        { name: "PickleBall Flow", image: "PickleBallFlow.png" },
        { name: "PickleBall Stride", image: "PickleBallStride.png" },
        { name: "PickleBall Tempo", image: "PickleBallTempo.png" }
        
      ]
    },

    soccer: {
      label: "Soccer Gear",
      icon: "IconSoccerblack.svg",
      products: [
        { name: "Soccer Pro", image: "SoccerPro.png" },
        { name: "Soccer Speed", image: "SoccerSpeed.png" },
        { name: "Soccer Max", image: "SoccerMax.png" }
        
      ]
    },

    rowing: {
      label: "Rowing Gear",
      icon: "IconRowblack.svg",
      products: [
        { name: "Row Pace", image: "RowPace.png" },
        { name: "Row Pro", image: "RowPro.png" }
        
      ]
    }
  };

  function applyFilter(filterKey) {
    const filter = FILTER_DATA[filterKey];
    if (!filter) return;

    productItems.forEach((item, index) => {
  const product = filter.products[index];

  if (product) {
    item.style.display = "flex";
    const imageEl = item.querySelector(".product-image");
    const titleEl = item.querySelector(".image-name");
    const labelText = item.querySelector(".product-label span");
    const labelIcon = item.querySelector(".product-icon");

    imageEl.src = product.image;
    imageEl.alt = product.name;
    titleEl.textContent = product.name;
    labelText.textContent = filter.label;
    labelIcon.src = filter.icon;
  } else {
    item.style.display = "none";
  }
});

  }

  gearItems.forEach(item => {
    const filterType = item.dataset.filter;
    if (!filterType) return;

    item.addEventListener("click", () => {
      applyFilter(filterType);
    });
  });

  applyFilter("walk"); // default
});
