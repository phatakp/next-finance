"use client";

import { APIBankAcctResponse } from "@/types/app";
import { CarouselProvider } from "pure-react-carousel";
import { useState } from "react";
import AcctSlider from "./acct-slider";

export default function AcctCarousel({
  grp,
}: {
  grp: {
    type: string;
    accts: APIBankAcctResponse[];
    totBal: number;
    totVal: number;
  };
}) {
  //no of slide to be visible
  const [slideCount, setSlideCount] = useState(2);
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <>
      <h2 className="capitalize text-xl md:text-2xl font-semibold -mb-4">
        {grp.type} accounts
      </h2>
      <CarouselProvider
        className="-mt-4 -ml-4"
        visibleSlides={slideCount}
        totalSlides={grp.accts.length}
        step={1}
        currentSlide={currentSlide}
        naturalSlideWidth={300}
        naturalSlideHeight={225}
        isIntrinsicHeight={true}
      >
        <AcctSlider
          accts={grp.accts}
          setSlideCount={setSlideCount}
          setCurrentSlide={setCurrentSlide}
        />
      </CarouselProvider>
    </>
  );
}
