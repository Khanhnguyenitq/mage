var config = {
    paths: {
        'swiper': 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min'
    },
    shim: {
        'swiper': {
            deps: ['jquery'],
            exports: 'Swiper'
        }
    },
    config: {
        mixins: {
            'Magento_Swatches/js/swatch-renderer': {
                'Magento_Swatches/js/swatch-renderer-mixin': true
            }
        }
    }
};