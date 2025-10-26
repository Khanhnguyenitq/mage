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
                            '<div class="swatch-image-label">' + label + '</div>' +
                            '<div class="swatch-image-wrapper">' +
                            '<img src="' + value + '" ' +
                            'alt="' + label + '" ' +
                            'width="' + swatchImageWidth + '" ' +
                            'height="' + swatchImageHeight + '">' +
                            '</div>' +
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

                        // ĐẾM số options
                        var totalSlides = $swiper.find('.swiper-slide').length;

                        var swiperInstance = new Swiper($swiper[0], {
                            slidesPerView: 'auto',
                            spaceBetween: 15,

                            // QUAN TRỌNG: Enable các tính năng scroll/swipe
                            freeMode: {
                                enabled: true,
                                sticky: false,
                                momentumBounce: false
                            },

                            // Enable mouse wheel scroll
                            mousewheel: {
                                enabled: true,
                                forceToAxis: true
                            },

                            // Cho phép kéo bằng chuột
                            simulateTouch: true,
                            grabCursor: true,
                            touchRatio: 1,
                            touchAngle: 45,

                            // Không tự động center
                            centeredSlides: false,

                            // Loopable nếu nhiều slides
                            loop: false,

                            // Responsive
                            breakpoints: {
                                320: {
                                    slidesPerView: 'auto',
                                    spaceBetween: 10,
                                    slidesPerGroup: 1
                                },
                                640: {
                                    slidesPerView: 'auto',
                                    spaceBetween: 12,
                                    slidesPerGroup: 2
                                },
                                768: {
                                    slidesPerView: 'auto',
                                    spaceBetween: 15,
                                    slidesPerGroup: 3
                                },
                                1024: {
                                    slidesPerView: 'auto',
                                    spaceBetween: 15,
                                    slidesPerGroup: 4
                                }
                            },

                            watchOverflow: true,
                            observer: true,
                            observeParents: true,
                            observeSlideChildren: true,

                            // Callback sau khi init
                            on: {
                                init: function () {
                                    console.log('Swiper initialized with ' + totalSlides + ' slides');
                                    this.update();
                                }
                            }
                        });

                        $attribute.data('swiper-instance', swiperInstance);

                        // Debug: Log ra để check
                        console.log('Swiper instance created:', swiperInstance);
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
                setTimeout(function () {
                    $widget._initSwiper();
                }, 100);
            }

        });

        return $.mage.SwatchRenderer;
    };
});