/**
 * Swatch Slider Mixin
 */
define(['jquery', 'swiper'], function ($, Swiper) {
    'use strict';

    return function (widget) {
        $.widget('mage.SwatchRenderer', widget, {

            _RenderSwatchOptions: function (config, controlId) {
                var html = this._super(config, controlId),
                    optionConfig = this.options.jsonSwatchConfig[config.id],
                    hasImageSwatches = false,
                    sliderId = 'swatch-slider-' + controlId;

                if (optionConfig) {
                    $.each(optionConfig, function (key, value) {
                        if (parseInt(value.type, 10) === 2) { // type 2 = image
                            hasImageSwatches = true;
                            return false; // break loop
                        }
                    });
                }
                  if (!hasImageSwatches) {
                    return html;
                }

                var wrappedHtml = '<div class="swatch-slider-container">';
                wrappedHtml += '<div class="swiper ' + sliderId + '">';
                wrappedHtml += '<div class="swiper-wrapper">';

                var $temp = $('<div>').html(html);
                $temp.find('.swatch-option').wrap('<div class="swiper-slide"></div>');
                wrappedHtml += $temp.html();

                wrappedHtml += '</div>';
                wrappedHtml += '</div></div>';

                // Init swiper
                setTimeout(function () {
                    new Swiper('.' + sliderId, {
                        slidesPerView: 'auto',
                        spaceBetween: 12,
                        freeMode: true,
                        watchOverflow: true,
                        centerInsufficientSlides: true,
                    });
                }, 100);

                return wrappedHtml;
            }
        });

        return $.mage.SwatchRenderer;
    };
});