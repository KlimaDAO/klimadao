import { cx } from "@emotion/css";
import { Trans } from "@lingui/macro";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { ButtonSecondary } from "components/Buttons/ButtonSecondary";
import Autoplay, { AutoplayOptionsType } from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { FC, useCallback, useEffect, useState } from "react";
import * as styles from "./styles";

type Slide = {
  imageUrl: string;
  title: string | React.ReactNode;
  retirementUrl: string;
  description: string | React.ReactNode;
};

type Props = {
  slides?: Array<{
    title: string;
    imageUrl: string;
    description: string;
  }>;
};

const options: AutoplayOptionsType = {
  delay: 10000,
  stopOnMouseEnter: true,
  stopOnInteraction: false,
};

// todo - eventually replace in CMS?
const slides: Array<Slide> = [
  {
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/261c/7171/c750e96c71ae526ccdf4e3b5ee0eff1a?Expires=1709510400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Q7~4-9Oi35Sb4FuTyFChsoYL7TW6nkhUf0he1g6driTjs3NG0k-O0JzwhdceeHtxpjwDvr1rZN4waF7ivnm90IcGKYPeqJXXNwkf3zYNlRX0bmYaF8nK3f9ZXsWqnaNRsVMFq5JIKr92kYZKjT6rLEpe2~VcP7X6YqgNhAcitaPNfPLfFCKMdJIx3EsEjaUJQCU6h6G6vKlVLL0-T4Dw-8MXHI8DPqzIU8eculWSO503NK8VLI~itWmvioZSDj3osK8VxLNLEmaAtCY7i08kct1FRbvhxyugoM4zfD2Djgb2qqMch~x5~c-cSnO7Xwlc~50AftUI-lFrzaH8nrmnYA__",
    title: <Trans>AAC Block Project</Trans>,
    retirementUrl: "/projects/VCS-985-2013/retire/pools/nct",
    description: (
      <Trans>
        We could charge someone billboard prices to feature their project here.
        Big opportunity for sales team, but the caveat would be that the project
        have stunning imagery
      </Trans>
    ),
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1707344088547-3cf7cea5ca49?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: <Trans>AAC Block Project 2</Trans>,
    retirementUrl: "/projects/VCS-985-2013/retire/pools/nct",
    description: (
      <Trans>
        AAC Block Project 2. AAC Block Project 2 AAC Block Project 2 AAC Block
        Project 2 AAC Block Project 2 AAC Block Project 2 AAC Block Project 2
      </Trans>
    ),
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1706463661223-4e7007549823?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: <Trans>AAC Block Project 3</Trans>,
    retirementUrl: "/projects/VCS-985-2013/retire/pools/nct",
    description: (
      <Trans>
        AAC Block Project 3. AAC Block Project 3 AAC Block Project 3 AAC Block
        Project 3 AAC Block Project 3 AAC Block Project 3 AAC Block Project 3
      </Trans>
    ),
  },
];

export const HeroCarousel: FC<Props> = () => {
  const [carouselRef, carouselApi] = useEmblaCarousel({}, [Autoplay(options)]);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [selectedSlide, setSelectedSlide] = useState(0);

  const onSelect = useCallback(() => {
    if (!carouselApi) return;
    setScrollSnaps(carouselApi.scrollSnapList());
    setSelectedSlide(carouselApi.selectedScrollSnap());
  }, [carouselApi, setSelectedSlide]);

  const scrollTo = useCallback(
    (index: number) => carouselApi && carouselApi.scrollTo(index),
    [carouselApi]
  );

  useEffect(() => {
    if (!carouselApi) return;
    onSelect();
    carouselApi.on("select", onSelect);
    carouselApi.on("reInit", onSelect);
  }, [carouselApi, onSelect]);

  return (
    <div className={styles.carousel}>
      <div ref={carouselRef} className={styles.viewport}>
        <div className={styles.container}>
          {slides?.map((slide: Slide, index: number) => (
            <div className={styles.slide} key={`slide-${index}`}>
              <img
                alt={slide.title?.toString()}
                src={slide.imageUrl}
                className={styles.slideImg}
              />
              <div className="backdrop" />
              <div className={styles.content}>
                <h4 className="title">{slide.title}</h4>
                <p className="description">{slide.description}</p>
                <div className="buttons">
                  <ButtonPrimary
                    href={slide.retirementUrl}
                    label={<Trans>Retire Now</Trans>}
                  />
                  <ButtonSecondary
                    href="/projects"
                    variant="lightGray"
                    label={<Trans>Shop All Projects</Trans>}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {slides.length > 1 && (
        <div className={styles.dots}>
          {scrollSnaps.map((_, index: number) => (
            <button
              type="button"
              key={`dot-${index}`}
              onClick={() => scrollTo(index)}
              className={cx("dot", {
                ["selected"]: index === selectedSlide,
              })}
            />
          ))}
        </div>
      )}
    </div>
  );
};
