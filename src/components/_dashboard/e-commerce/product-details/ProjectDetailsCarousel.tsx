import Slider from 'react-slick';
import { findIndex } from 'lodash';
import { useState, useRef, useEffect } from 'react';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box } from '@mui/material';
// @types
import { Product } from '../../../../@types/products';
//
import LightboxModal from '../../../LightboxModal';
import { CarouselControlsArrowsIndex } from '../../../carousel';
import { Project } from '../../../../@types/krowd/project';

// ----------------------------------------------------------------------

const THUMB_SIZE = 64;

const RootStyle = styled('div')(({ theme }) => ({
  '& .slick-slide': {
    float: theme.direction === 'rtl' ? 'right' : 'left',
    '&:focus': { outline: 'none' }
  }
}));

const ThumbWrapperStyle = styled('div')(({ theme }) => ({
  cursor: 'pointer',
  width: THUMB_SIZE,
  overflow: 'hidden',
  height: THUMB_SIZE,
  position: 'relative',
  margin: theme.spacing(0, 1),
  borderRadius: theme.shape.borderRadiusSm,
  '&:hover': {
    opacity: 0.72,
    transition: theme.transitions.create('opacity')
  },
  '& .isActive': {
    top: 0,
    zIndex: 9,
    opacity: 0,
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: theme.shape.borderRadiusSm,
    border: `solid 3px ${theme.palette.primary.main}`,
    backgroundColor: alpha(theme.palette.grey[900], 0.48)
  }
}));

const LargeImgStyle = styled('img')(({ theme }) => ({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
}));

const ThumbImgStyle = styled('img')(({ theme }) => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover'
}));

// ----------------------------------------------------------------------

type LargeItemProps = {
  item: string;
  onOpenLightbox: (value: string) => void;
};

function LargeItem({ item, onOpenLightbox }: LargeItemProps) {
  return (
    <Box sx={{ cursor: 'zoom-in', paddingTop: '100%', position: 'relative' }}>
      <LargeImgStyle alt="large image" src={item} onClick={() => onOpenLightbox(item)} />
    </Box>
  );
}

function ThumbnailItem({ item }: { item: string }) {
  return (
    <ThumbWrapperStyle>
      <Box className="isActive" />
      <ThumbImgStyle alt="thumb image" src={item} />
    </ThumbWrapperStyle>
  );
}

type ProductDetailsCarouselProps = {
  product: Project;
};

export default function ProjectDetailsCarousel({ product }: ProductDetailsCarouselProps) {
  const [openLightbox, setOpenLightbox] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number>(0);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [nav1, setNav1] = useState<Slider>();
  const [nav2, setNav2] = useState<Slider>();
  const slider1 = useRef<Slider | null>(null);
  const slider2 = useRef<Slider | null>(null);
  // const imageLightbox = product.image.map((_image) => _image);

  // const handleOpenLightbox = (url: string) => {
  //   const selectedImage = findIndex(imageLightbox, (index) => index === url);
  //   setOpenLightbox(true);
  //   setSelectedImage(selectedImage);
  // };

  const settings1 = {
    dots: false,
    arrows: false,
    slidesToShow: 1,
    draggable: false,
    slidesToScroll: 1,
    adaptiveHeight: true,
    beforeChange: (current: number, next: number) => setCurrentIndex(next)
  };

  const settings2 = {
    dots: false,
    arrows: false,
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    variableWidth: true,
    centerPadding: '0px',
    slidesToShow: product.image.length > 3 ? 3 : product.image.length
  };

  useEffect(() => {
    setNav1(slider1.current || undefined);
    setNav2(slider2.current || undefined);
  }, [currentIndex]);

  const handlePrevious = () => {
    slider2.current?.slickPrev();
  };

  const handleNext = () => {
    slider2?.current?.slickNext();
  };

  return (
    <RootStyle>
      <Box sx={{ p: 1 }}>
        <Box
          sx={{
            zIndex: 0,
            borderRadius: 2,
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          {/* <Slider {...settings1} asNavFor={nav2} ref={slider1}>
            {product.image.map((item) => (
              <LargeItem key={item} item={item} onOpenLightbox={handleOpenLightbox} />
            ))}
          </Slider> */}
          {/* <CarouselControlsArrowsIndex
            index={currentIndex}
            total={product.image.length}
            onNext={handleNext}
            onPrevious={handlePrevious}
          /> */}
        </Box>
      </Box>

      {/*chuyển ảnh theo slider*/}

      {/* <Box
        sx={{
          my: 3,
          mx: 'auto',
          '& .slick-current .isActive': { opacity: 1 },
          ...(product.image.length === 1 && { maxWidth: THUMB_SIZE * 1 + 16 }),
          ...(product.image.length === 2 && { maxWidth: THUMB_SIZE * 2 + 32 }),
          ...(product.image.length === 3 && { maxWidth: THUMB_SIZE * 3 + 48 }),
          ...(product.image.length === 4 && { maxWidth: THUMB_SIZE * 3 + 48 }),
          ...(product.image.length >= 5 && { maxWidth: THUMB_SIZE * 6 }),
          ...(product.image.length > 2 && {
            position: 'relative',
            '&:before, &:after': {
              top: 0,
              zIndex: 9,
              content: "''",
              height: '100%',
              position: 'absolute',
              width: (THUMB_SIZE * 2) / 3,
              backgroundImage: (theme) =>
                `linear-gradient(to left, ${alpha(theme.palette.background.paper, 0)} 0%, ${
                  theme.palette.background.paper
                } 100%)`
            },
            '&:after': { right: 0, transform: 'scaleX(-1)' }
          })
        }}
      >
        <Slider {...settings2} asNavFor={nav1} ref={slider2}>
          {product.image.map((item) => (
            <ThumbnailItem key={item} item={item} />
          ))}
        </Slider>
      </Box> */}

      {/*Phóng to ảnh*/}
      {/* <LightboxModal
        image={imageLightbox}
        photoIndex={selectedImage}
        setPhotoIndex={setSelectedImage}
        isOpen={openLightbox}
        onClose={() => setOpenLightbox(false)}
      /> */}
    </RootStyle>
  );
}
