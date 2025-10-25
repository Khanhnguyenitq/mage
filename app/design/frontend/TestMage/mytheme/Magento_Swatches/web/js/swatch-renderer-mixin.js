define([
    'jquery',
    'mage/translate'
], function ($, $t) {
    'use strict';

    return function (widget) {
        $.widget('mage.SwatchRenderer', widget, {
            
            /**
             * Override _RenderSwatchOptions - chỉ custom image type
             */
            _RenderSwatchOptions: function (config, controlId) {
                var optionConfig = this.options.jsonSwatchConfig[config.id],
                    optionClass = this.options.classes.optionClass,
                    moreLimit = parseInt(this.options.numberToShow, 10),
                    moreClass = this.options.classes.moreButton,
                    moreText = this.options.moreButtonText,
                    countAttributes = 0,
                    html = '';

                if (!this.options.jsonSwatchConfig.hasOwnProperty(config.id)) {
                    return '';
                }

                // Swiper container
                html += '<div class="swiper swatch-swiper-' + controlId + '">';
                html += '<div class="swiper-wrapper">';

                $.each(config.options, function (index) {
                    var id,
                        type,
                        value,
                        thumb,
                        label,
                        attr,
                        swatchImageWidth,
                        swatchImageHeight;

                    if (!optionConfig.hasOwnProperty(this.id)) {
                        return '';
                    }

                    id = this.id;
                    type = parseInt(optionConfig[id].type, 10);
                    value = optionConfig[id].hasOwnProperty('value') ? 
                            optionConfig[id].value : '';
                    thumb = optionConfig[id].hasOwnProperty('thumb') ? 
                            optionConfig[id].thumb : '';
                    label = this.label ? this.label : '';
                    attr = ' id="' + controlId + '-item-' + id + '"' +
                           ' aria-label="' + label + '"' +
                           ' index="' + index + '"' +
                           ' option-type="' + type + '"' +
                           ' option-id="' + id + '"' +
                           ' option-label="' + label + '"' +
                           ' aria-checked="false"' +
                           ' role="option"' +
                           ' tabindex="0"' +
                           ' option-tooltip-value=""';

                    if (!this.hasOwnProperty('products') || this.products.length <= 0) {
                        attr += ' option-empty="true"';
                    }

                    html += '<div class="swiper-slide">';

                    // CHỈ CUSTOM IMAGE SWATCH
                    if (type === 2) {
                        // Image swatch - style dạng card
                        swatchImageWidth = 150;
                        swatchImageHeight = 150;
                        
                        html += '<div class="' + optionClass + ' image" ' + attr + '>' +
                                '<div class="swatch-image-card">' +
                                '<div class="swatch-image-wrapper">' +
                                '<img src="' + value + '" ' +
                                'alt="' + label + '" ' +
                                'width="' + swatchImageWidth + '" ' +
                                'height="' + swatchImageHeight + '">' +
                                '</div>' +
                                '<div class="swatch-image-label">' + label + '</div>' +
                                '</div>' +
                                '</div>';
                    } 
                    // TEXT & COLOR GIỮ NGUYÊN STYLE GỐC
                    else if (type === 0) {
                        // Text swatch - default style
                        html += '<div class="' + optionClass + ' text" ' + attr + '>' +
                                (value ? value : label) +
                                '</div>';
                    } else if (type === 1) {
                        // Color swatch - default style
                        html += '<div class="' + optionClass + ' color" ' + attr +
                                ' style="background: ' + value + ' no-repeat center;"></div>';
                    } else if (type === 3) {
                        // Empty swatch
                        html += '<div class="' + optionClass + '" ' + attr + '></div>';
                    }

                    html += '</div>'; // Close swiper-slide
                    countAttributes++;
                });

                html += '</div>'; // Close swiper-wrapper
                html += '<div class="swiper-button-prev"></div>';
                html += '<div class="swiper-button-next"></div>';
                html += '</div>'; // Close swiper

                return html;
            },

            /**
             * Init Swiper sau khi render
             */
            _RenderControls: function () {
                this._super();
                this._initSwiper();
            },

            /**
             * Initialize Swiper
             */
            _initSwiper: function () {
                var self = this;

                if (typeof Swiper === 'undefined') {
                    setTimeout(function () {
                        self._initSwiper();
                    }, 100);
                    return;
                }

                this.element.find('.swatch-attribute').each(function () {
                    var $attribute = $(this);
                    var $swiper = $attribute.find('.swiper');

                    if ($swiper.length && !$swiper.hasClass('swiper-initialized')) {
                        var swiperInstance = new Swiper($swiper[0], {
                            slidesPerView: 'auto',
                            spaceBetween: 15,
                            navigation: {
                                nextEl: $swiper.find('.swiper-button-next')[0],
                                prevEl: $swiper.find('.swiper-button-prev')[0],
                            },
                            breakpoints: {
                                320: {
                                    slidesPerView: 2,
                                    spaceBetween: 10
                                },
                                640: {
                                    slidesPerView: 3,
                                    spaceBetween: 12
                                },
                                768: {
                                    slidesPerView: 4,
                                    spaceBetween: 15
                                },
                                1024: {
                                    slidesPerView: 5,
                                    spaceBetween: 15
                                }
                            },
                            watchOverflow: true,
                            observer: true,
                            observeParents: true
                        });

                        $attribute.data('swiper-instance', swiperInstance);
                    }
                });
            },

            /**
             * Rebuild khi user chọn option khác
             */
            _Rebuild: function () {
                var $widget = this;
                
                // Destroy swiper cũ
                this.element.find('.swatch-attribute').each(function () {
                    var instance = $(this).data('swiper-instance');
                    if (instance && instance.destroy) {
                        instance.destroy(true, true);
                        $(this).removeData('swiper-instance');
                    }
                });

                // Gọi parent rebuild
                this._super();

                // Init lại swiper
                setTimeout(function() {
                    $widget._initSwiper();
                }, 100);
            }

        });

        return $.mage.SwatchRenderer;
    };
});