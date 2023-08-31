"use client";
import Modal from "@/components/shared/modal";
import useWindowSize from "@/hooks/useWindowSize";
import { cn } from "@/lib/utils";
import { APIBankAcctResponse, FormAction } from "@/types/app";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import {
  ButtonBack,
  ButtonNext,
  CarouselContext,
  DotGroup,
  Slide,
  Slider,
} from "pure-react-carousel";
import { Dispatch, FC, SetStateAction, useContext, useEffect } from "react";
import AccountCard from "./account-card";
import AccountForm from "./account-form";

type AcctSliderProps = {
  accts: APIBankAcctResponse[];
  setSlideCount: Dispatch<SetStateAction<number>>;
  setCurrentSlide: Dispatch<SetStateAction<number>>;
};

const AcctSlider: FC<AcctSliderProps> = ({
  accts,
  setSlideCount,
  setCurrentSlide,
}) => {
  const { width: screenWidth } = useWindowSize();

  //pure-react-carousel context
  const carouselContext = useContext(CarouselContext);

  useEffect(() => {
    const updateCarouselSlide = (slideToBeVisible: number) => {
      const { currentSlide, totalSlides, visibleSlides } =
        carouselContext.state;

      setSlideCount(slideToBeVisible);

      //this is a fix to reset currentSlide when screen resizes
      if (
        currentSlide >= totalSlides - visibleSlides ||
        currentSlide >= totalSlides - slideToBeVisible
      ) {
        setCurrentSlide(totalSlides - slideToBeVisible);
      }
    };

    if (screenWidth < 832) {
      updateCarouselSlide(1);
    } else if (screenWidth < 1088) {
      updateCarouselSlide(2);
    }
    //>= 1088
    else {
      updateCarouselSlide(3);
    }
  }, [screenWidth, setSlideCount, setCurrentSlide, carouselContext]);

  return (
    <>
      <Slider className="h-48 relative">
        {accts.map((acct, index) => (
          <Slide index={index} key={acct.id}>
            <Modal
              trigger={<AccountCard acct={acct} />}
              title={`Update Account`}
              desc={`Confirm details to update account`}
            >
              <AccountForm formAction={FormAction.Update} acct={acct} />
            </Modal>
          </Slide>
        ))}
      </Slider>
      <div className="flex items-center justify-center">
        <ButtonBack className="border-none bg-none px-3 py-4">
          <ArrowBigLeft className={cn()} />
        </ButtonBack>
        <DotGroup className="flex items-center justify-center dot-group" />
        <ButtonNext className="btn-arrow">
          <ArrowBigRight />
        </ButtonNext>
      </div>
    </>
  );
};

export default AcctSlider;
