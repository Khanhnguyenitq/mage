var config = {
    paths: {
        swiper: 'Magento_Theme/js/swiper/swiper-bundle.min'
    },
    shim: {
        swiper: {
            exports: 'Swiper'
        }
    },
    config: {
        mixins: {
            'Magento_Swatches/js/swatch-renderer': {
                'Magento_Swatches/js/swatch-slider': true
            }
        }
    }
};
