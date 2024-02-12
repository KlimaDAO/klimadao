import { Trans } from "@lingui/macro";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { ButtonSecondary } from "components/Buttons/ButtonSecondary";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import * as styles from "./styles";

const slides = [
  {
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/261c/7171/c750e96c71ae526ccdf4e3b5ee0eff1a?Expires=1708300800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Z2Q4XasuG3e6wJ2Td~z3C~m8BjsQdkdx2sW2VjgdAn-I8n7qFG2wjOqGaiGqwh1QLgu4guA-WWd7LrES7zYCx~nNIcPxPr0DnctX~J4mEan7arXg4jBaNRTN2bkNVJaxR4lBcczQt~ta1uVPLt5zB4oZn0N2lUCxtSyZpQSvHDlnYR78qtLjvY~EIKuArRQzXbQ-xogwQwPq6bYOFvS7J5D11N4k3SU1Tc4RDJcZSiKvbze7EQzud2VzeL2jVHAnz7JaRNKIXOcw4~WpHsqqYygbGBS3xDFFfGYTXs-yMhg0RlfJgBuV1XToB0vIhsrXf2ESk0ZGcbj6tjxY85ciRA__",
    title: <Trans>AAC Block Project</Trans>,
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
    description: (
      <Trans>
        AAC Block Project 3. AAC Block Project 3 AAC Block Project 3 AAC Block
        Project 3 AAC Block Project 3 AAC Block Project 3 AAC Block Project 3
      </Trans>
    ),
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1707343843598-39755549ac9a?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: <Trans>AAC Block Project 4</Trans>,
    description: (
      <Trans>
        AAC Block Project 4. AAC Block Project 4 AAC Block Project 4 AAC Block
        Project 4 AAC Block Project 4 AAC Block Project 4 AAC Block Project 4
      </Trans>
    ),
  },
];

type Slide = {
  imageUrl: string;
  title: string;
  description: string;
};

type Props = {
  slides: Array<Slide>;
};

export const HeroCarousel: React.FC = () => {
  const [carouselRef, carouselApi] = useEmblaCarousel({});
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
          {slides?.map((slide: any, index: number) => (
            <div className={styles.slide} key={`slide-${index}`}>
              <img
                alt={slide.title ?? ""}
                src={slide.imageUrl ?? ""}
                className={styles.slideImg}
              />
              <div className="backdrop" />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.content}>
        <h4 className="title">{slides[selectedSlide].title}</h4>
        <p className="description">{slides[selectedSlide].description}</p>
        <div className="buttons">
          <ButtonPrimary label={<Trans>Retire Now</Trans>} />
          <ButtonSecondary
            variant="lightGray"
            label={<Trans>Shop All Projects</Trans>}
          />
        </div>
      </div>
      <div className={styles.dots}>
        {scrollSnaps.map((_, index: number) => (
          <button
            type="button"
            key={`dot-${index}`}
            onClick={() => scrollTo(index)}
            className={"dot".concat(index === selectedSlide ? " selected" : "")}
          />
        ))}
      </div>
    </div>
  );
};
